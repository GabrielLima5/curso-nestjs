import { ExecutionContext, NotFoundException, createParamDecorator } from "@nestjs/common";

export const User = createParamDecorator((data: string, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest()
    if (request.user){
        return request.user
    } else {
        throw new NotFoundException('Usuário não encontrado.')
    }
})