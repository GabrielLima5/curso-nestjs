import { CanActivate, ExecutionContext } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
import { ROLES_KEY } from 'src/decorators/role.decorator'
import { Role } from "src/enums/role.enum";

export class RoleGuard implements CanActivate{
    constructor(private readonly reflector: Reflector) {}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [context.getHandler(), context.getClass()])
        
        if (!requiredRoles){
            return true
        }

        const { user } = context.switchToHttp().getRequest()
        const rolesFiltered = requiredRoles.filter((role) => role === user.role)
        return rolesFiltered.length > 0
    }
}