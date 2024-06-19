import { BadRequestException, NestMiddleware } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";

export class UserIdCheckMiddleware implements NestMiddleware{
    use(req: Request, res: Response, next: NextFunction){
        if (isNaN(Number(req.params.id))){
            throw new BadRequestException('ID inválido!')
        }

        next()
    }
}