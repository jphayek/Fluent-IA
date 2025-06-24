import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('test_connection')
export class TestEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  message: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}