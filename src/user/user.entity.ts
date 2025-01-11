import { Role } from 'src/auth/permissions.enums';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
}
