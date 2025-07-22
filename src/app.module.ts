import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SchedulerModule } from './scheduler/scheduler.module';
import { ClinicModule } from './core/clinic/clinic.module';
import { PhysicianModule } from './core/physician/physician.module';
import { PatientModule } from './core/patient/patient.module';
import { AvailabilityModule } from './core/availability/availability.module';
import { AppointmentModule } from './core/appointment/appointment.module';
import { BillingRuleModule } from './core/billing-rule/billing-rule.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(<string>process.env.DB_PORT, 10),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      autoLoadEntities: true,
      synchronize: true,
    }),
    SchedulerModule,
    ClinicModule,
    PhysicianModule,
    PatientModule,
    AvailabilityModule,
    AppointmentModule,
    BillingRuleModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
