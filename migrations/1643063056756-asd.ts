import {MigrationInterface, QueryRunner} from "typeorm";

export class asd1643063056756 implements MigrationInterface {
    name = 'asd1643063056756'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cats" ADD "testcolumn" character varying DEFAULT ' '`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cats" DROP COLUMN "testcolumn"`);
    }

}
