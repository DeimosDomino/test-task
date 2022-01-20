import {BaseEntity, Entity, Column, PrimaryColumn, PrimaryGeneratedColumn} from "typeorm";


@Entity("cats")
export class Cat extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: string

    @Column()
    name: string;

    @Column()
    color: string;

    @Column()
    breed: string;

    @Column()
    age: number;

    @Column()
    photo: string;

    @Column()
    price: number;

    @Column()
    isBooked: boolean;
}