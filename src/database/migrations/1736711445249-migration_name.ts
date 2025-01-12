import { MigrationInterface, QueryRunner } from "typeorm";

export class MigrationName1736711445249 implements MigrationInterface {
    name = 'MigrationName1736711445249'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "Request" ("requestId" SERIAL NOT NULL, "userId" integer NOT NULL, "type" character varying NOT NULL, "priority" character varying NOT NULL, "status" character varying NOT NULL DEFAULT 'pending', "location" character varying NOT NULL, "description" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "assignedTo" character varying, "completionStatus" character varying NOT NULL DEFAULT 'incomplete', "userUserId" integer, CONSTRAINT "PK_1d4d0cf086882ddf6f4a344fb97" PRIMARY KEY ("requestId"))`);
        await queryRunner.query(`ALTER TABLE "User" DROP COLUMN "userType"`);
        await queryRunner.query(`CREATE TYPE "public"."User_usertype_enum" AS ENUM('admin', 'customer', 'provider')`);
        await queryRunner.query(`ALTER TABLE "User" ADD "userType" "public"."User_usertype_enum" NOT NULL DEFAULT 'customer'`);
        await queryRunner.query(`ALTER TABLE "Request" ADD CONSTRAINT "FK_cd11e14ef3894e11a8e5b67911c" FOREIGN KEY ("userUserId") REFERENCES "User"("userId") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Request" DROP CONSTRAINT "FK_cd11e14ef3894e11a8e5b67911c"`);
        await queryRunner.query(`ALTER TABLE "User" DROP COLUMN "userType"`);
        await queryRunner.query(`DROP TYPE "public"."User_usertype_enum"`);
        await queryRunner.query(`ALTER TABLE "User" ADD "userType" character varying NOT NULL DEFAULT 'customer'`);
        await queryRunner.query(`DROP TABLE "Request"`);
    }

}
