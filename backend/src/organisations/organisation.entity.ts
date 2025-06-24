import { Entity, PrimaryGeneratedColumn, Column, OneToOne, OneToMany, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { User } from '../users/user.entity';
import { Prestation } from '../prestations/prestation.entity';

@Entity('organisations')
export class Organisation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  siret: string;

  @Column()
  sector: string;

  @Column()
  country: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ nullable: true })
  address: string;

  @Column({ nullable: true })
  city: string;

  @Column({ nullable: true })
  postalCode: string;

  @Column({ nullable: true })
  website: string;

  @Column({ nullable: true })
  logo: string;

  @Column({ default: true })
  isActive: boolean;

  // Relation One-to-One avec User (propriétaire)
  @OneToOne(() => User, user => user.organisation)
  @JoinColumn()
  owner: User;

  // Relation One-to-Many avec Prestations
  @OneToMany(() => Prestation, prestation => prestation.organisation, { cascade: true })
  prestations: Prestation[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}