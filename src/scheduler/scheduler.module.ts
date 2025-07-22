import { Module } from '@nestjs/common';
import { SchedulerService } from './scheduler.service';
import { SchedulerController } from './scheduler.controller';

import { ClinicModule } from '../core/clinic/clinic.module';
import { PhysicianModule } from '../core/physician/physician.module';
import { PatientModule } from '../core/patient/patient.module';
import { AppointmentModule } from '../core/appointment/appointment.module';
import { AvailabilityModule } from '../core/availability/availability.module';
import { BillingRuleModule } from '../core/billing-rule/billing-rule.module';

@Module({
  imports: [
    ClinicModule,
    PhysicianModule,
    PatientModule,
    AppointmentModule,
    AvailabilityModule,
    BillingRuleModule,
  ],
  controllers: [SchedulerController],
  providers: [SchedulerService],
})
export class SchedulerModule {}
