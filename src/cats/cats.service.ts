import { Injectable } from '@nestjs/common';
import {CreateCatDto} from "./dto/create-cat.dto";
import {Repository} from "typeorm";
import {CatEntity} from "./entities/cat.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {UpdateCatDto} from "./dto/update-cat.dto";

@Injectable()
export class CatsService {

    constructor(
        @InjectRepository(CatEntity)
        private catsRepository: Repository<CatEntity>
    ) {}

    getAll(){
        return this.catsRepository.find()
    }
    getById(id: number){
        return this.catsRepository.findOne(id)
    }

    async create(createCatDto: CreateCatDto){
        const cat = this.catsRepository.create(createCatDto);
        await this.catsRepository.save(cat);
    }

    getByOptions(options: object){
        return this.catsRepository.find(options)
    }

    async update(id: number, updateCatDto: UpdateCatDto){
        await this.catsRepository.update(id,updateCatDto)
    }

    async deleteCat(id: number){
        await this.catsRepository.delete(id)
    }

}