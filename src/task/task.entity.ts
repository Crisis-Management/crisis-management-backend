import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IncidentEntity } from '../incident/incident.entity';
import { UserEntity } from '../user/user.entity';

@Entity('Task')
export class TaskEntity {
  @PrimaryGeneratedColumn()
  taskId: number;

  @ManyToOne(() => IncidentEntity, (incident) => incident.tasks, {
    eager: true,
  })
  incident: IncidentEntity;

  @ManyToOne(() => UserEntity, { eager: true })
  assignedTo: number;

  @Column()
  priority: string;

  @Column()
  status: string;

  @Column()
  description: string;

  @CreateDateColumn()
  dueDate: Date;

  @UpdateDateColumn({ nullable: true })
  completionDate: Date;
}
