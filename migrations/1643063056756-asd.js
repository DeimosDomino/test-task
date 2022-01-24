"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.asd1643063056756 = void 0;
class asd1643063056756 {
    constructor() {
        this.name = 'asd1643063056756';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "cats" ADD "testcolumn" character varying DEFAULT ' '`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "cats" DROP COLUMN "testcolumn"`);
    }
}
exports.asd1643063056756 = asd1643063056756;
//# sourceMappingURL=1643063056756-asd.js.map