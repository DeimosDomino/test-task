import {Args, Int, Query, Resolver, Mutation} from "@nestjs/graphql";
import {CatEntity} from "./entities/cat.entity";
import {CatsService} from "./cats.service";
import {CreateCatDto} from "./dto/create-cat.dto"

@Resolver(of => CatEntity)
export class CatsResolver{
    constructor(
       private catsService: CatsService
    ) {}

    @Query(returns => CatEntity)
    async Cat(@Args('id',{type:()=>Int}) id:number){
        return this.catsService.getById(id)
    }

    @Query(returns => [CatEntity])
    async AllCats() {
        return this.catsService.getAll();
    }

    @Query(returns => [CatEntity])
    BookedCats() {
        return this.catsService.getByOptions({isBooked: true})
    }

    @Query(returns => [CatEntity])
    AvailableCats(){
        return this.catsService.getByOptions({isBooked: false})
    }

    @Mutation(returns => CatEntity)
    async createCat(@Args('cat',{type: ()=>CreateCatDto}) cat: CreateCatDto) {
        await this.catsService.create(cat)
        return "Cat created"
    }


    @Put(":id")
    async update(@Param("id") id: number, @Body() updateCatDto: UpdateCatDto){
        await this.catsService.update(id, updateCatDto);
    }

    @Put("book/:id")
    async bookCat(@Param("id") id: number){
        await this.catsService.update(id, {isBooked: true});
    }

    @Put("unbook/:id")
    async unBookCat(@Param("id") id: number){
        await this.catsService.update(id, {isBooked: false});
    }

    @Delete(":id")
    async remove(@Param("id") id: number) {
        await this.catsService.deleteCat(id)
    }
*/


//    @Query(re)
}