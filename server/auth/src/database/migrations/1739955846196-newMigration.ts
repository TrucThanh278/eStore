import { MigrationInterface, QueryRunner } from 'typeorm';

export class NewMigration1739955846196 implements MigrationInterface {
  name = 'NewMigration1739955846196';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`permission\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`resource\` varchar(100) NOT NULL DEFAULT '', \`description\` varchar(100) NOT NULL DEFAULT '', \`path\` varchar(100) NOT NULL DEFAULT '', \`method\` varchar(20) NOT NULL DEFAULT 'get', \`isDefault\` tinyint NOT NULL DEFAULT 0, UNIQUE INDEX \`IDX_b690135d86d59cc689d465ac95\` (\`description\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`role\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`name\` varchar(100) NOT NULL DEFAULT '', \`description\` text NULL, UNIQUE INDEX \`IDX_ae4578dcaed5adff96595e6166\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`user\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`username\` varchar(100) NOT NULL DEFAULT '', \`email\` varchar(100) NOT NULL DEFAULT '', \`password\` varchar(100) NOT NULL DEFAULT '', \`name\` varchar(100) NOT NULL DEFAULT '', \`address\` varchar(100) NOT NULL DEFAULT '', \`contact\` varchar(100) NULL DEFAULT '', \`avatar\` varchar(100) NULL DEFAULT '', \`status\` varchar(100) NULL DEFAULT '', \`token\` varchar(100) NULL DEFAULT '', \`tokenValidityDate\` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6), \`salt\` varchar(100) NULL DEFAULT '10', \`twoFASecret\` varchar(100) NULL DEFAULT '', \`twoFAThrottleTime\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`isTwoFAEnabled\` tinyint NULL DEFAULT 0, \`roleId\` int NULL DEFAULT '0', UNIQUE INDEX \`IDX_78a916df40e02a9deb1c4b75ed\` (\`username\`), UNIQUE INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` (\`email\`), INDEX \`IDX_065d4d8f3b5adb4a08841eae3c\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`refresh_token\` (\`id\` int NOT NULL AUTO_INCREMENT, \`userId\` int NOT NULL DEFAULT '0', \`ip\` varchar(100) NOT NULL DEFAULT '', \`userAgent\` varchar(100) NOT NULL DEFAULT '', \`browser\` varchar(100) NULL DEFAULT '', \`os\` varchar(100) NULL DEFAULT '', \`isRevoked\` tinyint NOT NULL DEFAULT 0, \`expires\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, INDEX \`IDX_192c36a5937bf5eeb9de99290b\` (\`browser\`), INDEX \`IDX_cbf62122e9f9d90ecad419d49f\` (\`os\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`role_permission\` (\`roleId\` int NOT NULL, \`permissionId\` int NOT NULL, INDEX \`IDX_e3130a39c1e4a740d044e68573\` (\`roleId\`), INDEX \`IDX_72e80be86cab0e93e67ed1a7a9\` (\`permissionId\`), PRIMARY KEY (\`roleId\`, \`permissionId\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user\` ADD CONSTRAINT \`FK_c28e52f758e7bbc53828db92194\` FOREIGN KEY (\`roleId\`) REFERENCES \`role\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`role_permission\` ADD CONSTRAINT \`FK_e3130a39c1e4a740d044e685730\` FOREIGN KEY (\`roleId\`) REFERENCES \`role\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE \`role_permission\` ADD CONSTRAINT \`FK_72e80be86cab0e93e67ed1a7a9a\` FOREIGN KEY (\`permissionId\`) REFERENCES \`permission\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`role_permission\` DROP FOREIGN KEY \`FK_72e80be86cab0e93e67ed1a7a9a\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`role_permission\` DROP FOREIGN KEY \`FK_e3130a39c1e4a740d044e685730\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`user\` DROP FOREIGN KEY \`FK_c28e52f758e7bbc53828db92194\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_72e80be86cab0e93e67ed1a7a9\` ON \`role_permission\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_e3130a39c1e4a740d044e68573\` ON \`role_permission\``,
    );
    await queryRunner.query(`DROP TABLE \`role_permission\``);
    await queryRunner.query(
      `DROP INDEX \`IDX_cbf62122e9f9d90ecad419d49f\` ON \`refresh_token\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_192c36a5937bf5eeb9de99290b\` ON \`refresh_token\``,
    );
    await queryRunner.query(`DROP TABLE \`refresh_token\``);
    await queryRunner.query(
      `DROP INDEX \`IDX_065d4d8f3b5adb4a08841eae3c\` ON \`user\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` ON \`user\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_78a916df40e02a9deb1c4b75ed\` ON \`user\``,
    );
    await queryRunner.query(`DROP TABLE \`user\``);
    await queryRunner.query(
      `DROP INDEX \`IDX_ae4578dcaed5adff96595e6166\` ON \`role\``,
    );
    await queryRunner.query(`DROP TABLE \`role\``);
    await queryRunner.query(
      `DROP INDEX \`IDX_b690135d86d59cc689d465ac95\` ON \`permission\``,
    );
    await queryRunner.query(`DROP TABLE \`permission\``);
  }
}
