import { Module } from '@nestjs/common';
import { RequestController } from './request.controller';
import { RequestService } from './request.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RequestEntity } from './request.entity';
import { UserService } from 'src/user/user.service';
import { UserEntity } from 'src/user/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RequestEntity, UserEntity])],
  controllers: [RequestController],
  providers: [RequestService, UserService],
})
export class RequestModule {}
