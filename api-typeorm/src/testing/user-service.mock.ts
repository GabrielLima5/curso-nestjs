import { UserService } from "../user/user.service";
import { userEntityList } from "./userEntityList.mock";

export const userServiceMock = {
    provide: UserService,
    useValue: {
        create: jest.fn().mockResolvedValue(userEntityList[0]),
        readOne: jest.fn().mockResolvedValue(userEntityList[0]),
        read: jest.fn().mockResolvedValue(userEntityList),
        update: jest.fn().mockResolvedValue(userEntityList[0]),
        delete: jest.fn().mockResolvedValue(true)
    }
}