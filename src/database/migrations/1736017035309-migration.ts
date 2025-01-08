import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1736017035309 implements MigrationInterface {
    name = 'Migration1736017035309'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "User" ("userId" SERIAL NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "userType" character varying NOT NULL, "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "phoneNumber" character varying NOT NULL, "location" character varying NOT NULL, "registrationDate" TIMESTAMP NOT NULL, "status" character varying NOT NULL, "profilePicture" character varying NOT NULL, CONSTRAINT "PK_45f0625bd8172eb9c821c948a0f" PRIMARY KEY ("userId"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "User"`);
    }

}
