import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { UserEntity } from '../user/user.entity';

@Entity('Notification')
export class NotificationEntity {
  @PrimaryGeneratedColumn()
  notificationId: number;

  @Column()
  type: string;

  @Column()
  content: string;

  @Column({ default: 'unread' })
  status: string;

  @Column({ nullable: true })
  priority: string;

  @CreateDateColumn()
  timestamp: Date;

  @ManyToOne(() => UserEntity, (user) => user.notifications)
  user: UserEntity;
}
