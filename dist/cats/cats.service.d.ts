import { CreateCatDto } from "./dto/create-cat.dto";
import { Repository } from "typeorm";
import { Cat } from "./entities/Cat";
import { UpdateCatDto } from "./dto/update-cat.dto";
export declare class CatsService {
    private catsRepository;
    constructor(catsRepository: Repository<Cat>);
    getAll(): Promise<Cat[]>;
    getById(id: string): Promise<Cat>;
    create(createCatDto: CreateCatDto): Promise<void>;
    getByOptions(options: object): Promise<Cat[]>;
    update(id: number, updateCatDto: UpdateCatDto): Promise<void>;
    deleteCat(id: number): Promise<void>;
}
