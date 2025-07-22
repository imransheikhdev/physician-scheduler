import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Clinic } from '../../clinic/entities/clinic.entity';
import { Physician } from '../../physician/entities/physician.entity';

@Entity()
export class Availability {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Clinic, (clinic) => clinic.availabilities)
  clinic: Clinic;

  @ManyToOne(() => Physician, (physician) => physician.availabilities)
  physician: Physician;

  @Column()
  date: string;

  @Column()
  start_time: string;

  @Column()
  end_time: string;
}
