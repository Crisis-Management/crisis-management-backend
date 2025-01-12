import { Role } from '../auth/permissions.enums';
import { RequestEntity } from '../request/request.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('User')
export class UserEntity {
  @PrimaryGeneratedColumn()
  userId?: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ type: 'enum', enum: Role, default: Role.CUSTOMER })
  userType: Role;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  phoneNumber: string;

  @Column()
  location: string;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    nullable: true,
  })
  registrationDate: Date;

  @Column({ default: 'active' })
  status: 'active' | 'inactive';

  @Column({ nullable: true })
  profilePicture?: string;

  @OneToMany(() => RequestEntity, (request) => request.user)
  requests: RequestEntity[];
}

