import { TaskEntity } from 'src/task/task.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
@Entity()
export class IncidentEntity {
  @PrimaryGeneratedColumn()
  incidentId: number;

  @Column()
  type: string;

  @Column()
  severity: string;

  @Column()
  location: string;

  @Column()
  status: string;

  @Column({ nullable: true })
  description: string;

  @CreateDateColumn()
  startTime: Date;

  @UpdateDateColumn()
  endTime: Date;

  @Column({ nullable: true })
  affectedArea: string;

  @OneToMany(() => TaskEntity, (task) => task.incident)
  tasks: TaskEntity[];
}
