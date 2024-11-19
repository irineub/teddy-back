import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateClientsTable1731976378361 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS "clients" (
                "id" SERIAL NOT NULL,
                "name" character varying(100) NOT NULL,
                "salary" decimal(10, 2) NOT NULL,
                "companyValue" decimal(15, 2) NOT NULL,
                CONSTRAINT "PK_clients_id" PRIMARY KEY ("id")
            );
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE IF EXISTS "clients";
        `);
    }
}
