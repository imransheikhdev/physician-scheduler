import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Clinic } from '../../clinic/entities/clinic.entity';
import { Physician } from '../../physician/entities/physician.entity';
import { Patient } from '../../patient/entities/patient.entity';

@Entity()
export class Appointment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Clinic, (clinic) => clinic.appointments)
  clinic: Clinic;

  @ManyToOne(() => Physician, (physician) => physician.appointments)
  physician: Physician;

  @ManyToOne(() => Patient, (patient) => patient.appointments)
  patient: Patient;

  @Column()
  start_time: Date;

  @Column()
  end_time: Date;

  @Column({ default: 'scheduled' })
  status: string;
}
