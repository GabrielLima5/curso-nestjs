import { Test, TestingModule } from "@nestjs/testing"
import { UserService } from "./user.service"
import { userRepositoryMock } from "../testing/userRepository.mock";
import { userEntityList } from "../testing/userEntityList.mock";
import { createUserDTO } from "../testing/create-user-dto.mock";
import { UserEntity } from "./entity/user.entity";
import { Repository } from "typeorm";
import { getRepositoryToken } from "@nestjs/typeorm";

describe('UserService', () => {
    let userService: UserService;
    let userRepository: Repository<UserEntity>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [UserService, userRepositoryMock]
        }).compile()

        userService = module.get(UserService)
        userRepository = module.get(getRepositoryToken(UserEntity))
    })

    test('Validar a definição', () => {
        expect(userService).toBeDefined()
        expect(userRepository).toBeDefined()
    })

    describe('Create', () => {
        test('create method', async () => {
            jest.spyOn(userRepository, 'exist').mockResolvedValueOnce(false)
            const result = await userService.create(createUserDTO)
            expect(result).toEqual(userEntityList[0])
        })
    })

    describe('Read', () => {
        test('read method', async () => {
            const result = await userService.read()
            expect(result).toBe(userEntityList)
        })

        test('readOne method', async () => {
            const result = await userService.readOne({ id: 1 })
            expect(result).toBe(userEntityList[0])
        })
    })
    describe('Update', () => {
        test('update method', async () => {
            const result = await userService.update({ name: 'Lima', email: 'lima@hcode.com.br', password: '123456'}, { id: 1 });
            expect(result).toEqual(userEntityList[0]);
        })
    })
    describe('Delete', () => {
        test('delete method', async () => {
            const result = await userService.delete({ id: 1 })
            expect(result).toEqual(true)
        })
    })
})