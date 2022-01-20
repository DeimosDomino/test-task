import {Body, Controller, Get, Param, Post, Put, Delete, HttpCode, HttpStatus} from '@nestjs/common';
import {CreateCatDto} from "./dto/create-cat.dto";
import {UpdateCatDto} from "./dto/update-cat.dto";
import {CatsService} from "./cats.service";

@Controller('cats')
export class CatsController {

    constructor(private readonly catsService: CatsService) {

    }

    @Get()
    getAllCats(){
        return this.catsService.getAll()
    }
    @Get("booked")
    getBookedCats() {
        return this.catsService.getByOptions({isBooked: true})
    }
    @Get("available")
    getAvailableCats(){
        return this.catsService.getByOptions({isBooked: false})
    }
    @Get(":id")
    getCat(@Param("id") id){
        return this.catsService.getById(id)
    }
    @Post("create")
    async create(@Body() createCatDto: CreateCatDto) {
        await this.catsService.create({
            ...createCatDto,
            isBooked: false
        })
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
    remove(@Param("id") id: string){
        return `Remove ${id}`
    }


}
