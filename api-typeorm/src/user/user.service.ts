import { BadRequestException, Body, Injectable, Param } from "@nestjs/common";
import { CreateUserDTO } from "./dto/create-user-dto";
import * as bcrypt from 'bcrypt'
import { Repository } from "typeorm";
import { UserEntity } from "./entity/user.entity";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class UserService{

    constructor(
        @InjectRepository(UserEntity)
        private usersRepository: Repository<UserEntity>
    ) {}

    async create(@Body() {name, email, password}: CreateUserDTO){
        if (await this.usersRepository.existsBy({
            email
        })) {
            throw new BadRequestException('Este usuário já existe.')
        }

        const salt = await bcrypt.genSalt()
        const hash = await bcrypt.hash(password, salt)

        const user = await this.usersRepository.create({
            name,
            email,
            password: hash
        })

        await this.usersRepository.save([user])
    }

    async read(){
        return this.usersRepository.find()
    }

    async readOne(@Param() { id }){
        return this.usersRepository.findOneBy({
            id
        })
    }

    async update(@Body() { name, email, password }, @Param() { id }){
        const salt = await bcrypt.genSalt()
        const hash = await bcrypt.hash(password, salt)

        await this.usersRepository.update(Number(id), {
            name, email, password: hash
        })

        return this.readOne({ id })
    }

    async delete(@Param() { id }){
        const user = this.usersRepository.findOneBy({
            id
        })

        if (!user){
            throw new BadRequestException('Usuário não encontrado.')
        }
        await this.usersRepository.delete(id)
        return true;
    }
}