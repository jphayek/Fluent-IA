import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany, JoinTable, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Organisation } from '../organisations/organisation.entity';
import { Tag } from '../tags/tag.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Column()
  role: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ type: 'text', nullable: true })
  bio: string;

  @Column({ nullable: true })
  profilePicture: string;

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // Relations
  @OneToMany(() => Organisation, organisation => organisation.owner)
  organisations: Organisation[];

  @ManyToMany(() => Tag, tag => tag.users)
  @JoinTable({
    name: 'user_tags',
    joinColumn: { name: 'userId', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'tagId', referencedColumnName: 'id' }
  })
  tags: Tag[];
}