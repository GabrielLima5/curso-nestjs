import { Test, TestingModule } from "@nestjs/testing"
import { AuthService } from "./auth.service"
import { userRepositoryMock } from "../testing/userRepository.mock"
import { jwtServiceMock } from "../testing/jwt-service.mock"
import { userServiceMock } from "../testing/user-service.mock"
import { mailerServiceMock } from "../testing/mailer-service.mock"
import { userEntityList } from "../testing/userEntityList.mock"
import { accessToken } from "../testing/access-token.mock"
import { jwtPayload } from "../testing/jwt-payload.mock"
import { resetToken } from "../testing/reset-token.mock"
import { authRegisterDTO } from "../testing/auth-register-dto.mock"

describe('Auth Service', () => {

    let authService: AuthService

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [AuthService, userRepositoryMock, jwtServiceMock, userServiceMock, mailerServiceMock],
        }).compile()

        authService = module.get<AuthService>(AuthService)
    })

    test('Validar a definição', () => {
        expect(authService).toBeDefined()
    })

    describe('Token', () => {
        test('Create token method', () => {
            const result = authService.createToken(userEntityList[0])
            expect(result).toEqual({ accessToken })
        })

        test('Check token method', () => {
            const result = authService.checkToken(accessToken)
            expect(result).toEqual(jwtPayload)
        })

        test('Is Valid method', () => {
            const result = authService.isValidToken(accessToken)
            expect(result).toEqual(true)
        })
    })

    describe('Autenticação', () => {

        test('login method', async () => {
            const result = await authService.login('joao@hcode.com.br', '123456')
            expect(result).toEqual({ accessToken })
        })

        test('forget method', async () => {
            const result = await authService.forget('joao@hcode.com.br')
            expect(result).toEqual(true)
        })

        test('reset method', async () => {
            const result = await authService.reset('654321', resetToken)
            expect(result).toEqual(resetToken)
        })

        test('register method', async () => {
            const result = await authService.register(authRegisterDTO)
            expect(result).toEqual({ accessToken })
        })
    })
})