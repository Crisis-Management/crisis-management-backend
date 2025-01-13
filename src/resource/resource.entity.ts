import { OrganizationEntity } from '../organization/organization.entity';
import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('Resource')
export class ResourceEntity {
  @PrimaryGeneratedColumn()
  resourceId: number;

  @Column()
  type: string;

  @Column()
  name: string;

  @Column('int')
  quantity: number;

  @Column()
  location: string;

  @Column()
  status: string;

  @ManyToOne(
    () => OrganizationEntity,
    (organization) => organization.resources,
    {
      eager: true,
    },
  )
  organization: OrganizationEntity;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  lastUpdated: Date;
}
