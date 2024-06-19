import { Test, TestingModule } from "@nestjs/testing"
import { UserController } from "./user.controller"
import { userServiceMock } from "../testing/user-service.mock"
import { AuthGuard } from "../guards/auth.guard"
import { guardMock } from "../testing/guard.mock"
import { RoleGuard } from "../guards/role.guard"
import { UserService } from "./user.service"
import { createUserDTO } from "../testing/create-user-dto.mock"
import { userEntityList } from "../testing/userEntityList.mock"
import { updateUserDTO } from "../testing/update-user-dto.mock"

describe('Teste do UserController', () => {

    let userController: UserController;
    let userService: UserService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [UserController],
            providers: [userServiceMock]
        })
        .overrideGuard(AuthGuard)
        .useValue(guardMock)
        .overrideGuard(RoleGuard)
        .useValue(guardMock)
        .compile()

        userController = module.get<UserController>(UserController)
        userService = module.get<UserService>(UserService)
    })

    test('Validar a definição', () => {
        expect(userController).toBeDefined()
        expect(userService).toBeDefined()
    })

    describe('Teste da aplicação dos guards', () => {
        test('Se os guards estão aplicados', () => {
            const guards = Reflect.getMetadata('__guards', UserController)
            expect(guards.length).toEqual(2)
            expect(new guards[0]()).toBeInstanceOf(AuthGuard)
            expect(new guards[1]()).toBeInstanceOf(RoleGuard)
        })
    })

    describe('Create', () => {
        test('create method', async () => {
            const result = await userController.create(createUserDTO)
            expect(result).toEqual(userEntityList[0])
        })
    })

    describe('Read', () => {
        test('read method', async () => {
            const result = await userController.read()
            expect(result).toEqual(userEntityList)
        })

        test('readOne method', async () => {
            const result = await userController.readOne(1)
            expect(result).toEqual(userEntityList[0])
        })
    })

    describe('Update', () => {
        test('update method', async () => {
            const result = await userController.update(updateUserDTO, 1)
            expect(result).toEqual(userEntityList[0])
        })
    })

    describe('Delete', () => {
        test('delete method', async () => {
            const result = await userController.delete(1)
            expect(result).toEqual(true)
        })
    })
})