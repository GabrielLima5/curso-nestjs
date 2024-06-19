import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Put, UseGuards, UseInterceptors } from "@nestjs/common";
import { CreateUserDTO } from "./dto/create-user-dto";
import { UpdateUserDTO } from "./dto/update-put-user-dto";
import { UpdateUserPatchDTO } from "./dto/update-patch-user-dto";
import { UserService } from "./user.service";
import { LogInterceptors } from "../interceptors/logInterceptors";
import { ParamId } from "../decorators/param-id-decorator";
import { Roles } from "../decorators/role.decorator";
import { Role } from "../enums/role.enum";
// import { RoleGuard } from "../guards/role.guard";
import { AuthGuard } from "../guards/auth.guard";

@Roles(Role.ADMIN)
@UseGuards(AuthGuard, /* RoleGuard */)
@Controller('users')
export class UserController {
    constructor (private readonly userService: UserService){}

    @Post()
    async create(@Body() { name, email, password }: CreateUserDTO){
        return this.userService.create({ name, email, password, role: 1 })
    }

    @UseInterceptors(LogInterceptors)
    @Get()
    async read(){
        return this.userService.read()
    }

    @Get(':id')
    async readOne(@ParamId() id: number){
        return this.userService.readOne({id})
    }

    @Put(':id')
    async update(@Body() { name, email, password }: UpdateUserDTO, @Param('id', ParseIntPipe) id: number){
        return this.userService.update({ name, email, password}, { id })
    }

    @Patch(':id')
    async updatePartial(@Body() { name, email, password }: UpdateUserPatchDTO, @Param('id', ParseIntPipe) id: number){
        return this.userService.update({ name, email, password}, { id })
    }

    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id: number){
        return this.userService.delete({ id })
    }
}