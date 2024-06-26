import { Role } from "../../enums/role.enum";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({
    name: 'users'
})
export class UserEntity {
    @PrimaryGeneratedColumn({
        unsigned: true
    })
    id?: number;

    @Column({
        length: 63
    })
    name: string;

    @Column()
    email: string;

    @Column({
        length: 127,
        unique: true
    })
    password: string;

    @Column({
        type: 'date',
        nullable: true
    })
    birthAt?: string;

    @CreateDateColumn()
    createdAt?: Date;

    @UpdateDateColumn()
    updatedAt?: Date;

    @Column({
        default: Role.USER
    })
    role: number;
}