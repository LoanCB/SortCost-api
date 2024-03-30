import { MigrationInterface, QueryRunner } from 'typeorm';

export class CoreEntities1711789717972 implements MigrationInterface {
  name = 'CoreEntities1711789717972';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE \`category\` (
                \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
                \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
                \`id\` int NOT NULL AUTO_INCREMENT,
                \`name\` varchar(255) NOT NULL,
                \`maxAmount\` decimal(10, 2) NULL,
                \`description\` varchar(255) NULL,
                \`icon\` varchar(255) NOT NULL,
                \`accountId\` int NULL,
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
    await queryRunner.query(`
            CREATE TABLE \`account\` (
                \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
                \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
                \`id\` int NOT NULL AUTO_INCREMENT,
                \`deletedAt\` timestamp(6) NULL,
                \`name\` varchar(255) NOT NULL,
                \`description\` varchar(255) NULL,
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
    await queryRunner.query(`
            CREATE TABLE \`budget\` (
                \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
                \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
                \`id\` int NOT NULL AUTO_INCREMENT,
                \`name\` varchar(255) NOT NULL,
                \`amount\` decimal(10, 2) NOT NULL,
                \`description\` varchar(255) NULL,
                \`author\` varchar(255) NULL,
                \`accountId\` int NULL,
                \`expenseId\` int NULL,
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
    await queryRunner.query(`
            CREATE TABLE \`recurrent_rehearsal\` (
                \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
                \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
                \`id\` int NOT NULL AUTO_INCREMENT,
                \`numberOfRepeat\` int NOT NULL,
                \`deposit\` decimal(10, 2) NOT NULL,
                \`repeatUnity\` varchar(255) NOT NULL,
                \`recurrentAt\` datetime NOT NULL,
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
    await queryRunner.query(`
            CREATE TABLE \`expense\` (
                \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
                \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
                \`id\` int NOT NULL AUTO_INCREMENT,
                \`name\` varchar(255) NOT NULL,
                \`description\` varchar(255) NULL,
                \`amount\` decimal(10, 2) NOT NULL,
                \`purchasedAt\` datetime NOT NULL,
                \`amountRefundable\` decimal(10, 2) NOT NULL,
                \`categoryId\` int NULL,
                \`reccurentRehearsalId\` int NULL,
                \`userId\` int NULL,
                \`accountId\` int NULL,
                UNIQUE INDEX \`REL_2143b44b5f9262d61b120caf8c\` (\`reccurentRehearsalId\`),
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
    await queryRunner.query(`
            CREATE TABLE \`user_accounts_account\` (
                \`userId\` int NOT NULL,
                \`accountId\` int NOT NULL,
                INDEX \`IDX_9ce5d7033eb172b552b3ea8cdb\` (\`userId\`),
                INDEX \`IDX_09f08a0193b7d06230bcadd1db\` (\`accountId\`),
                PRIMARY KEY (\`userId\`, \`accountId\`)
            ) ENGINE = InnoDB
        `);
    await queryRunner.query(`
            ALTER TABLE \`category\`
            ADD CONSTRAINT \`FK_9a3f904e7ac2ebf737fbabcc75a\` FOREIGN KEY (\`accountId\`) REFERENCES \`account\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE \`budget\`
            ADD CONSTRAINT \`FK_3997fda45a609b4cdb6a774538a\` FOREIGN KEY (\`accountId\`) REFERENCES \`account\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE \`budget\`
            ADD CONSTRAINT \`FK_cedc5166fd4e747578fdfce8a87\` FOREIGN KEY (\`expenseId\`) REFERENCES \`expense\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE \`expense\`
            ADD CONSTRAINT \`FK_42eea5debc63f4d1bf89881c10a\` FOREIGN KEY (\`categoryId\`) REFERENCES \`category\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE \`expense\`
            ADD CONSTRAINT \`FK_2143b44b5f9262d61b120caf8c3\` FOREIGN KEY (\`reccurentRehearsalId\`) REFERENCES \`recurrent_rehearsal\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE \`expense\`
            ADD CONSTRAINT \`FK_06e076479515578ab1933ab4375\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE \`expense\`
            ADD CONSTRAINT \`FK_015435528d9ddf9dd6ee01f172d\` FOREIGN KEY (\`accountId\`) REFERENCES \`account\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE \`user_accounts_account\`
            ADD CONSTRAINT \`FK_9ce5d7033eb172b552b3ea8cdb5\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE
        `);
    await queryRunner.query(`
            ALTER TABLE \`user_accounts_account\`
            ADD CONSTRAINT \`FK_09f08a0193b7d06230bcadd1db0\` FOREIGN KEY (\`accountId\`) REFERENCES \`account\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE \`user_accounts_account\` DROP FOREIGN KEY \`FK_09f08a0193b7d06230bcadd1db0\`
        `);
    await queryRunner.query(`
            ALTER TABLE \`user_accounts_account\` DROP FOREIGN KEY \`FK_9ce5d7033eb172b552b3ea8cdb5\`
        `);
    await queryRunner.query(`
            ALTER TABLE \`expense\` DROP FOREIGN KEY \`FK_015435528d9ddf9dd6ee01f172d\`
        `);
    await queryRunner.query(`
            ALTER TABLE \`expense\` DROP FOREIGN KEY \`FK_06e076479515578ab1933ab4375\`
        `);
    await queryRunner.query(`
            ALTER TABLE \`expense\` DROP FOREIGN KEY \`FK_2143b44b5f9262d61b120caf8c3\`
        `);
    await queryRunner.query(`
            ALTER TABLE \`expense\` DROP FOREIGN KEY \`FK_42eea5debc63f4d1bf89881c10a\`
        `);
    await queryRunner.query(`
            ALTER TABLE \`budget\` DROP FOREIGN KEY \`FK_cedc5166fd4e747578fdfce8a87\`
        `);
    await queryRunner.query(`
            ALTER TABLE \`budget\` DROP FOREIGN KEY \`FK_3997fda45a609b4cdb6a774538a\`
        `);
    await queryRunner.query(`
            ALTER TABLE \`category\` DROP FOREIGN KEY \`FK_9a3f904e7ac2ebf737fbabcc75a\`
        `);
    await queryRunner.query(`
            DROP INDEX \`IDX_09f08a0193b7d06230bcadd1db\` ON \`user_accounts_account\`
        `);
    await queryRunner.query(`
            DROP INDEX \`IDX_9ce5d7033eb172b552b3ea8cdb\` ON \`user_accounts_account\`
        `);
    await queryRunner.query(`
            DROP TABLE \`user_accounts_account\`
        `);
    await queryRunner.query(`
            DROP INDEX \`REL_2143b44b5f9262d61b120caf8c\` ON \`expense\`
        `);
    await queryRunner.query(`
            DROP TABLE \`expense\`
        `);
    await queryRunner.query(`
            DROP TABLE \`recurrent_rehearsal\`
        `);
    await queryRunner.query(`
            DROP TABLE \`budget\`
        `);
    await queryRunner.query(`
            DROP TABLE \`account\`
        `);
    await queryRunner.query(`
            DROP TABLE \`category\`
        `);
  }
}
