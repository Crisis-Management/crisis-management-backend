import { MigrationInterface, QueryRunner } from "typeorm";

export class MigrationName1736569315672 implements MigrationInterface {
    name = 'MigrationName1736569315672'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "User" ("userId" SERIAL NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "userType" character varying NOT NULL DEFAULT 'customer', "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "phoneNumber" character varying NOT NULL, "location" character varying NOT NULL, "registrationDate" TIMESTAMP DEFAULT now(), "status" character varying NOT NULL DEFAULT 'active', "profilePicture" character varying, CONSTRAINT "PK_45f0625bd8172eb9c821c948a0f" PRIMARY KEY ("userId"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "User"`);
    }

}
