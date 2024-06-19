import { Role } from "../enums/role.enum";
import { UserEntity } from "../user/entity/user.entity";

export const userEntityList: UserEntity[] = [{
    name: 'Gabriel Lima',
    email: 'gabriel@email.com',
    password: '123456',
    role: Role.USER,
    createdAt: new Date(),
    updatedAt: new Date()
}, {
    name: 'João Rangel',
    email: 'joao@hcode.com.br',
    password: '123456',
    role: Role.USER,
    createdAt: new Date(),
    updatedAt: new Date()
}]
