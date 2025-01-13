import { MigrationInterface, QueryRunner } from "typeorm";

export class MigrationName1736788744194 implements MigrationInterface {
    name = 'MigrationName1736788744194'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "Resource" ("resourceId" SERIAL NOT NULL, "type" character varying NOT NULL, "name" character varying NOT NULL, "quantity" integer NOT NULL, "location" character varying NOT NULL, "status" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "lastUpdated" TIMESTAMP NOT NULL DEFAULT now(), "organizationOrganizationId" integer, CONSTRAINT "PK_fde0b754e1ac2416d69eb43ff0e" PRIMARY KEY ("resourceId"))`);
        await queryRunner.query(`CREATE TABLE "Organization" ("organizationId" SERIAL NOT NULL, "name" character varying NOT NULL, "type" character varying NOT NULL, "contactInfo" character varying NOT NULL, "address" character varying NOT NULL, "serviceArea" character varying NOT NULL, "operationalStatus" character varying NOT NULL, "verificationStatus" character varying NOT NULL, "licenseInfo" character varying, CONSTRAINT "PK_6703e08a0ceba5c350942a416d2" PRIMARY KEY ("organizationId"))`);
        await queryRunner.query(`ALTER TABLE "Resource" ADD CONSTRAINT "FK_7c2550109952288859b9f7ce869" FOREIGN KEY ("organizationOrganizationId") REFERENCES "Organization"("organizationId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Resource" DROP CONSTRAINT "FK_7c2550109952288859b9f7ce869"`);
        await queryRunner.query(`DROP TABLE "Organization"`);
        await queryRunner.query(`DROP TABLE "Resource"`);
    }

}
