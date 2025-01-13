import { ResourceEntity } from '../resource/resource.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Organization')
export class OrganizationEntity {
  @PrimaryGeneratedColumn()
  organizationId: number;

  @Column()
  name: string;

  @Column()
  type: string;

  @Column()
  contactInfo: string;

  @Column()
  address: string;

  @Column()
  serviceArea: string;

  @Column()
  operationalStatus: string;

  @Column()
  verificationStatus: string;

  @Column({ nullable: true })
  licenseInfo: string;

  @OneToMany(() => ResourceEntity, (resource) => resource.organization)
  resources: ResourceEntity[];
}
