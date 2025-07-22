import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Clinic } from '../../clinic/entities/clinic.entity';
import { Appointment } from '../../appointment/entities/appointment.entity';
import { Availability } from '../../availability/entities/availability.entity';
import { BillingRule } from '../../billing-rule/entities/billing-rule.entity';

@Entity()
export class Physician {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  specialization: string;

  @ManyToOne(() => Clinic, (clinic) => clinic.physicians)
  clinic: Clinic;

  @OneToMany(() => Appointment, (appointment) => appointment.physician)
  appointments: Appointment[];

  @OneToMany(() => Availability, (availability) => availability.physician)
  availabilities: Availability[];

  @OneToMany(() => BillingRule, (billingRule) => billingRule.physician)
  billingRules: BillingRule[];
}
