import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Physician } from '../../physician/entities/physician.entity';

@Entity()
export class BillingRule {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Physician, (physician) => physician.billingRules)
  physician: Physician;

  @Column()
  gap_before_minutes: number;

  @Column()
  gap_after_minutes: number;

  @Column()
  min_gap_between_appointments: number;
}
