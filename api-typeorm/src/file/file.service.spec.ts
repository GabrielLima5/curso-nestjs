import { Test, TestingModule } from "@nestjs/testing"
import { FileService } from "./file.service"
import { getPhoto } from "../testing/get-photo.mock"
import { join } from "path"

describe('File Service', () => {
    let fileService: FileService

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [FileService]
        }).compile()

        fileService = module.get(FileService)
    })

    test('Validar a definição', () => {
        expect(fileService).toBeDefined()
    })

    describe('Teste do File Service', () => {
        test('upload method', async () => {
            const photo = await getPhoto()
            const path = join(__dirname, '..', '..', 'storage', 'photos', `photo-${Date.now()}.jpg`)
            fileService.upload(photo, path)
        })
    })
})