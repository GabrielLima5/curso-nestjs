import { Role } from "../enums/role.enum";
import { UpdateUserDTO} from "../user/dto/update-put-user-dto";

export const updateUserDTO: UpdateUserDTO = {
    email: 'gabriel@email.com',
    name: 'Gabriel Lima',
    password: '123456',
    role: Role.USER
}