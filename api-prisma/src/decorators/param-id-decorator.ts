import { ExecutionContext, createParamDecorator } from "@nestjs/common";

export const ParamId = createParamDecorator((data: string, context: ExecutionContext) => {
    return Number(context.switchToHttp().getRequest().params.id)
})