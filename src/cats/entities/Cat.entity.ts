import {BaseEntity, Entity, Column, PrimaryColumn, PrimaryGeneratedColumn} from "typeorm";


@Entity("cats")
export class CatEntity extends BaseEntity{
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
    imgLink: string;

    @Column()
    price: number;

    @Column()
    isBooked: boolean;

    @Column({default: " ", nullable: true})
    testcolumn: string
}