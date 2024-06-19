import { getRepositoryToken } from "@nestjs/typeorm";
import { UserEntity } from "../user/entity/user.entity";
import { userEntityList } from "./userEntityList.mock";

export const userRepositoryMock = {
    provide: getRepositoryToken(UserEntity),
    useValue: {
        existsBy: jest.fn(),
        create: jest.fn().mockResolvedValue(userEntityList[0]),
        save: jest.fn(),
        find: jest.fn().mockResolvedValue(userEntityList),
        findOneBy: jest.fn().mockResolvedValue(userEntityList[0]),
        update: jest.fn(),
        delete: jest.fn(),
    }
}