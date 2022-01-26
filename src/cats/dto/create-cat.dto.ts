import {InputType, Field} from "@nestjs/graphql"


@InputType()
export class CreateCatDto {
    @Field()
    readonly name: string;
    @Field()
    readonly color: string;
    @Field()
    readonly breed: string;
    @Field()
    readonly age: number;
    @Field()
    readonly imgLink: string;
    @Field()
    readonly price: number;
    @Field()
    readonly isBooked: boolean;
}