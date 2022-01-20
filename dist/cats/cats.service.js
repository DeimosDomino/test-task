"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CatsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const Cat_1 = require("./entities/Cat");
const typeorm_2 = require("@nestjs/typeorm");
let CatsService = class CatsService {
    constructor(catsRepository) {
        this.catsRepository = catsRepository;
    }
    getAll() {
        return this.catsRepository.find();
    }
    getById(id) {
        return this.catsRepository.findOne(id);
    }
    async create(createCatDto) {
        const cat = this.catsRepository.create(createCatDto);
        await this.catsRepository.save(cat);
    }
    getByOptions(options) {
        return this.catsRepository.find(options);
    }
    async update(id, updateCatDto) {
        await this.catsRepository.update(id, updateCatDto);
    }
    async deleteCat(id) {
        await this.catsRepository.delete(id);
    }
};
CatsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(Cat_1.Cat)),
    __metadata("design:paramtypes", [typeorm_1.Repository])
], CatsService);
exports.CatsService = CatsService;
//# sourceMappingURL=cats.service.js.map