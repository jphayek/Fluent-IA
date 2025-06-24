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
  duration: string; // Ex: "1 heure", "1 jour", "1 semaine"

  @Column({ nullable: true })
  category: string; // Ex: "Développement", "Design", "Consultation"

  @Column({ default: true })
  isActive: boolean;

  @Column({ type: 'simple-array', nullable: true })
  tags: string[]; // Tags spécifiques à cette prestation

  // Relation Many-to-One avec Organisation
  @ManyToOne(() => Organisation, organisation => organisation.prestations, { onDelete: 'CASCADE' })
  organisation: Organisation;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}