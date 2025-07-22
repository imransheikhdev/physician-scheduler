import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Physician } from '../../physician/entities/physician.entity';
import { Appointment } from '../../appointment/entities/appointment.entity';
import { Availability } from '../../availability/entities/availability.entity';

@Entity()
export class Clinic {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  location: string;

  @OneToMany(() => Physician, (physician) => physician.clinic)
  physicians: Physician[];

  @OneToMany(() => Appointment, (appointment) => appointment.clinic)
  appointments: Appointment[];

  @OneToMany(() => Availability, (availability) => availability.clinic)
  availabilities: Availability[];
}
