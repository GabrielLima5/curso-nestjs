import { Role } from '../enums/role.enum';
import { CreateUserDTO } from '../user/dto/create-user-dto';

export const createUserDTO: CreateUserDTO = {
  email: 'joao@hcode.com.br',
  name: 'Joao Rangel',
  password: '123456',
  role: Role.USER,
};