import {MigrationInterface, QueryRunner} from "typeorm";

export class Initial1600876367823 implements MigrationInterface {
    name = 'Initial1600876367823'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "project" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "url" character varying, "description" text, "category" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_4d68b1358bb5b766d3e78f32f57" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "issue" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "type" character varying NOT NULL, "status" character varying NOT NULL, "priority" character varying NOT NULL, "listPosition" double precision NOT NULL, "description" text, "descriptionText" text, "estimate" integer, "timeSpent" integer, "timeRemaining" integer, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "reporterId" integer NOT NULL, "projectId" integer NOT NULL, CONSTRAINT "PK_f80e086c249b9f3f3ff2fd321b7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "email" character varying NOT NULL, "avatarUrl" character varying(2000) NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "projectId" integer, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "comment" ("id" SERIAL NOT NULL, "body" text NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" integer NOT NULL, "issueId" integer NOT NULL, CONSTRAINT "PK_0b0e4bbc8415ec426f87f3a88e2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "issue_users_user" ("issueId" integer NOT NULL, "userId" integer NOT NULL, CONSTRAINT "PK_17b2641553df9505571865c1cda" PRIMARY KEY ("issueId", "userId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_04cd614a988873b784ac9f6141" ON "issue_users_user" ("issueId") `);
        await queryRunner.query(`CREATE INDEX "IDX_3201cf6b942e94ad933470b17f" ON "issue_users_user" ("userId") `);
        await queryRunner.query(`ALTER TABLE "issue" ADD CONSTRAINT "FK_be30b91466b730c5e25f1181f79" FOREIGN KEY ("projectId") REFERENCES "project"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_1a8725d89cd65783f6cc0046fe7" FOREIGN KEY ("projectId") REFERENCES "project"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comment" ADD CONSTRAINT "FK_c0354a9a009d3bb45a08655ce3b" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comment" ADD CONSTRAINT "FK_c91b5a63310845bdeca63d9ee13" FOREIGN KEY ("issueId") REFERENCES "issue"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "issue_users_user" ADD CONSTRAINT "FK_04cd614a988873b784ac9f61412" FOREIGN KEY ("issueId") REFERENCES "issue"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "issue_users_user" ADD CONSTRAINT "FK_3201cf6b942e94ad933470b17fa" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "issue_users_user" DROP CONSTRAINT "FK_3201cf6b942e94ad933470b17fa"`);
        await queryRunner.query(`ALTER TABLE "issue_users_user" DROP CONSTRAINT "FK_04cd614a988873b784ac9f61412"`);
        await queryRunner.query(`ALTER TABLE "comment" DROP CONSTRAINT "FK_c91b5a63310845bdeca63d9ee13"`);
        await queryRunner.query(`ALTER TABLE "comment" DROP CONSTRAINT "FK_c0354a9a009d3bb45a08655ce3b"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_1a8725d89cd65783f6cc0046fe7"`);
        await queryRunner.query(`ALTER TABLE "issue" DROP CONSTRAINT "FK_be30b91466b730c5e25f1181f79"`);
        await queryRunner.query(`DROP INDEX "IDX_3201cf6b942e94ad933470b17f"`);
        await queryRunner.query(`DROP INDEX "IDX_04cd614a988873b784ac9f6141"`);
        await queryRunner.query(`DROP TABLE "issue_users_user"`);
        await queryRunner.query(`DROP TABLE "comment"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "issue"`);
        await queryRunner.query(`DROP TABLE "project"`);
    }

}
