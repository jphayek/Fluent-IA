import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, CreateDateColumn } from 'typeorm';
import { User } from '../users/user.entity';

@Entity('tags')
export class Tag {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  color: string; // Couleur hex pour l'affichage

  @Column({ default: 0 })
  usageCount: number; // Nombre d'utilisateurs qui utilisent ce tag

  // Relation Many-to-Many avec Users
  @ManyToMany(() => User, user => user.tags)
  users: User[];

  @CreateDateColumn()
  createdAt: Date;
}