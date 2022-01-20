import { BaseEntity } from "typeorm";
export declare class Cat extends BaseEntity {
    id: string;
    name: string;
    color: string;
    breed: string;
    age: number;
    imgLink: string;
    price: number;
    isBooked: boolean;
}
