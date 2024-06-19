import { BadGatewayException, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UserService } from "../user/user.service";
import { AuthRegisterDTO } from "./dto/auth-register.dto";
import * as bcrypt from 'bcrypt'
import { MailerService } from "@nestjs-modules/mailer";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "../user/entity/user.entity";
import { Repository } from "typeorm";

@Injectable()
export class AuthService{
    constructor(
        private readonly jwtService: JwtService, 
        private readonly userService: UserService,
        private readonly mailer: MailerService,
        @InjectRepository(UserEntity)
        private usersRepository: Repository<UserEntity>
    ) {}

    async createToken(user: UserEntity){
        return {
            accessToken: this.jwtService.sign({
                sub: user.id,
                name: user.name,
                email: user.email
            }, {
                expiresIn: "7 days",
                issuer: "login",
                audience: "users"
            })
        }
    }

    async checkToken(token: string){
        try{ 
            const data = this.jwtService.verify(token, {
                audience: 'users',
                issuer: 'login',
            })

            return data
        } catch(e){
            throw new BadGatewayException(e)
        }
    }

    async isValidToken(token: string){
        try{
            this.checkToken(token)
            return true
        } catch(e){
            return false
        }
    }

    async login(email: string, password: string){
        const user = await this.usersRepository.findOneBy({
            email
        })

        if (!user){
            throw new UnauthorizedException('Acesso negado.')
        }

        const passwordFromHash = await bcrypt.compare(password, user.password)
        
        if (!passwordFromHash){
            throw new UnauthorizedException('Acesso negado.')
        }
        return this.createToken(user)
    }

    async forget(email: string){
        const user = await this.usersRepository.findOneBy({
            email
        })

        if (!user){
            throw new UnauthorizedException('Email inválido.')
        }

        const token = await this.jwtService.sign({
            user: user.id
        },  {
            expiresIn: "30 minutes",
            issuer: "forget",
            audience: "users"
        })

        await this.mailer.sendMail({
            subject: 'Recuperação de senha',
            to: email,
            template: 'forget',
            context: {
                name: user.name,
                token
            }
        })

        return true;
    }

    async reset(password: string, token: string){
        // validar o token

        try{ 
            const { id } = this.jwtService.verify(token, {
                issuer: 'forget',
                audience: 'users',
            })

            const salt = await bcrypt.genSalt()
            const passwordHash = await bcrypt.hash(password, salt)

            await this.usersRepository.update(Number(id), {
                password: passwordHash,
            })

            // const user = this.userService.readOne({ id })
            // return this.createToken(user);
        } catch(e){
            throw new BadGatewayException(e)
        }
    }

    async register({ name, email, password }: AuthRegisterDTO){
        await this.userService.create({ name, email, password, role: 1 })
        return {
            success: true
        }
        // return this.createToken(user)
    }
}