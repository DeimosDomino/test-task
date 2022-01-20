import { CreateCatDto } from "./dto/create-cat.dto";
import { UpdateCatDto } from "./dto/update-cat.dto";
import { CatsService } from "./cats.service";
export declare class CatsController {
    private readonly catsService;
    constructor(catsService: CatsService);
    getAllCats(): Promise<import("./entities/Cat").Cat[]>;
    getBookedCats(): Promise<import("./entities/Cat").Cat[]>;
    getAvailableCats(): Promise<import("./entities/Cat").Cat[]>;
    getCat(id: any): Promise<import("./entities/Cat").Cat>;
    create(createCatDto: CreateCatDto): Promise<void>;
    update(id: number, updateCatDto: UpdateCatDto): Promise<void>;
    bookCat(id: number): Promise<void>;
    unBookCat(id: number): Promise<void>;
    remove(id: number): Promise<void>;
}
