import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserEntity } from '../user/user.entity';

@Entity('Request')
export class RequestEntity {
  @PrimaryGeneratedColumn()
  requestId: number;

  @Column()
  userId: number;

  @Column()
  type: string;

  @Column()
  priority: string;

  @Column({ default: 'pending' })
  status: string;

  @Column()
  location: string;

  @Column()
  description: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ nullable: true })
  assignedTo?: string;

  @Column({ default: 'incomplete' })
  completionStatus: string;

  @ManyToOne(() => UserEntity, (user) => user.requests, { onDelete: 'CASCADE' })
  user: UserEntity;
}
