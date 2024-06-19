import { BadRequestException, Body, Controller, FileTypeValidator, MaxFileSizeValidator, ParseFilePipe, Post, Req, UploadedFile, UploadedFiles, UseGuards, UseInterceptors } from "@nestjs/common";
import { AuthRegisterDTO } from "./dto/auth-register.dto";
import { AuthForgetDTO } from "./dto/auth-forget.dto";
import { AuthLoginDTO } from "./dto/auth-login.dto";
import { AuthResetDTO } from "./dto/auth-reset.dto";
import { AuthService } from "./auth.service";
import { AuthGuard } from "../guards/auth.guard";
import { FileFieldsInterceptor, FileInterceptor, FilesInterceptor } from "@nestjs/platform-express";
import { FileService } from "../file/file.service";
import { join } from "path";

@Controller('auth')
export class AuthController{
    constructor(private readonly authService: AuthService, private readonly fileService: FileService) {}

    @Post('login')
    async login(@Body() {email, password}: AuthLoginDTO){
        return this.authService.login(email, password)
    }

    @Post('register')
    async register(@Body() { name, email, password }: AuthRegisterDTO){
        return this.authService.register({ name, email, password, role: 1 })
    }

    @Post('forget')
    async forget(@Body() { email }: AuthForgetDTO){
        return this.authService.forget(email)
    }

    @Post('reset')
    async reset(@Body() { password, token }: AuthResetDTO){
        return this.authService.reset(password, token)
    }

    @UseGuards(AuthGuard)
    @Post('me')
    async me(@Req() req){
        return {
            me: 'ok',
            token: req.tokenPayload
        }
    }

    @UseInterceptors(FileInterceptor('file'))
    @UseGuards(AuthGuard)
    @Post('photo')
    async uploadPhoto(@UploadedFile(new ParseFilePipe({
        validators: [
            new FileTypeValidator({ fileType: 'image/jpeg' })
        ]
    })) photo: Express.Multer.File){
        try{
            const path = join(__dirname, '..', '..', 'storage', 'photos', `photo-${Date.now()}.jpg`)
            await this.fileService.upload(photo, path)

            return {
                success: true,
                error: null
            }
        } catch(e){
            throw new BadRequestException(e)
        }

    }

    @UseInterceptors(FilesInterceptor('files'))
    @UseGuards(AuthGuard)
    @Post('files')
    async uploadPhotos(@UploadedFiles() files: Express.Multer.File[]){
        return files
    }

    @UseInterceptors(FileFieldsInterceptor([{
        name: 'photo',
        maxCount: 1
    }, {
        name: 'documents',
        maxCount: 10
    }]))
    @UseGuards(AuthGuard)
    @Post('file-fields')
    async uploadFileFields(@UploadedFiles() photo: Express.Multer.File, documents: Express.Multer.File[]){
        return {
            photo,
            documents
        }
    }
}
