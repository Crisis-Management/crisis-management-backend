import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { OrganizationModule } from './organization/organization.module';
import { RequestModule } from './request/request.module';
import { ResourceModule } from './resource/resource.module';
import { IncidentModule } from './incident/incident.module';
import { FacilityModule } from './facility/facility.module';
import { TaskModule } from './task/task.module';
import { NotificationModule } from './notification/notification.module';
import { DatabaseModule } from './database/database.module';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import * as Joi from '@hapi/joi';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        POSTGRES_HOST: Joi.string().required(),
        PORT: Joi.number().required(),
        POSTGRES_USER: Joi.string().required(),
        POSTGRES_PASSWORD: Joi.string().required(),
        POSTGRES_DB: Joi.string().required(),
      }),
    }),
    UserModule,
    OrganizationModule,
    RequestModule,
    ResourceModule,
    IncidentModule,
    FacilityModule,
    TaskModule,
    NotificationModule,
    DatabaseModule,
    AuthModule,
    JwtModule,
  ],
  controllers: [AppController, AuthController],
  providers: [AppService],
  exports: [AppService],
})
export class AppModule {}
