import { MigrationInterface, QueryRunner } from "typeorm";

export class InitDatabase1740644871521 implements MigrationInterface {
    name = 'InitDatabase1740644871521'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`salt\``);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`salt\` int NULL DEFAULT '10'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`salt\``);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`salt\` varchar(100) NULL DEFAULT '10'`);
    }

}
