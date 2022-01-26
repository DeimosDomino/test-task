import {BaseEntity, Entity, Column, PrimaryColumn, PrimaryGeneratedColumn} from "typeorm";
import {Field, Int, ObjectType, InputType} from "@nestjs/graphql";


@ObjectType()
@Entity("cats")
export class CatEntity extends BaseEntity{

    @Field(type => Int)
    @PrimaryGeneratedColumn()
    id: string

    @Field()
    @Column()
    name: string;

    @Field()
    @Column()
    color: string;

    @Field()
    @Column()
    breed: string;

    @Field()
    @Column()
    age: number;

    @Field()
    @Column()
    imgLink: string;

    @Field()
    @Column()
    price: number;

    @Field()
    @Column()
    isBooked: boolean;

}