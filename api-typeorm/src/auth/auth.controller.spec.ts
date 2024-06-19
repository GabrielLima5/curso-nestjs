import { Test, TestingModule } from "@nestjs/testing"
import { AuthController } from "./auth.controller"
import { AuthGuard } from "../guards/auth.guard"
import { guardMock } from "../testing/guard.mock"
import { authLoginDTO } from "../testing/auth-login-dto.mock"
import { accessToken } from "../testing/access-token.mock"
import { authRegisterDTO } from "../testing/auth-register-dto.mock"
import { authResetDTO } from "../testing/auth-reset-dto.mock"
import { authForgetDTO } from "../testing/auth-forget-dto.mock"
import { getPhoto } from "../testing/get-photo.mock"

describe('Teste de Autenticação - Controller', () => {
    let authController: AuthController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [AuthController]
        })
        .overrideGuard(AuthGuard)
        .useValue(guardMock)
        .compile()

        authController = module.get<AuthController>(AuthController)
    })

    describe('Testar a validação', () => {
        expect(authController).toBeDefined()
    })

    describe('Fluxo de autenticação', () => {
        test('login method', async () => {
            const result = await authController.login(authLoginDTO)
            expect(result).toEqual({ accessToken })
        })

        test('register method', async () => {
            const result = await authController.register(authRegisterDTO)
            expect(result).toEqual({
                success: true
            })
        })

        test('reset method', async () => {
            const result = await authController.reset(authResetDTO)
            expect(result).toEqual({ accessToken })
        })

        test('forget method', async () => {
            const result = await authController.forget(authForgetDTO)
            expect(result).toEqual(true)
        })
    })

    describe('photo upload', () => {
        test('photo upload method', async () => {
            const photo = await getPhoto()
            const result = await authController.uploadPhoto(photo)
            expect(result).toEqual({ photo })
        })
    })
})