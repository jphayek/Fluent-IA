import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Organisation } from '../organisations/organisation.entity';

@Entity('prestations')
export class Prestation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  price: number;

  @Column({ nullable: true })
  duration: string;

  @Column({ nullable: true })
  category: string;

  @Column({ default: true })
  isActive: boolean;

  @Column({ type: 'simple-array', nullable: true })
  tags: string[];

  @Column({ default: false})
  serviceParIa: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // Relation Many-to-One avec Organisation (optionnelle)
  @ManyToOne(() => Organisation, organisation => organisation.prestations, { 
    onDelete: 'CASCADE',
    nullable: true 
  })
  organisation: Organisation;
}