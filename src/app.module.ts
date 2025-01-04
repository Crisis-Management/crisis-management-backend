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
import { AuthService } from './auth/auth.service';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
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
  providers: [AppService, AuthService],
})
export class AppModule {}
