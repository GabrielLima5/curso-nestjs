import { Body, Injectable, Param } from "@nestjs/common";
import { CreateUserDTO } from "./dto/create-user-dto";
import { PrismaService } from "src/prisma/prisma.service";
import * as bcrypt from 'bcrypt'

@Injectable()
export class UserService{

    constructor(private readonly prisma: PrismaService) {}

    async create(@Body() {name, email, password}: CreateUserDTO){
        const salt = await bcrypt.genSalt()
        const hash = await bcrypt.hash(password, salt)

        return this.prisma.user.create({
            data: {
                name,
                email,
                password: hash
            }
        })
    }

    async read(){
        return this.prisma.user.findMany()
    }

    async readOne(@Param() { id }){
        return this.prisma.user.findUniqueOrThrow({
            where: {
                id
            }
        })
    }

    async update(@Body() { name, email, password }, @Param() { id }){
        const salt = await bcrypt.genSalt()
        const hash = await bcrypt.hash(password, salt)

        return this.prisma.user.update({
            where: {
                id
            },
            data: {
                name, email, password: hash
            }
        })
    }

    async delete(@Param() { id }){
        return this.prisma.user.delete({
            where: {
                id
            }
        })
    }
}