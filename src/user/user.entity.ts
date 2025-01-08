import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user_entity')
export class UserEntity {
  @PrimaryGeneratedColumn()
  userId?: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  userType: 'customer' | 'provider' | 'admin';

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  phoneNumber: string;

  @Column()
  location: string;

  @Column()
  registrationDate?: Date;

  @Column()
  status: 'active' | 'inactive';

  @Column()
  profilePicture?: string;
}
