import { Patient } from './../core/patient/entities/patient.entity';
import { Injectable, Patch } from '@nestjs/common';
import { AppointmentService } from '../core/appointment/appointment.service';
import { AvailabilityService } from '../core/availability/availability.service';
import { BillingRuleService } from '../core/billing-rule/billing-rule.service';

@Injectable()
export class SchedulerService {
  constructor(
    private readonly appointmentService: AppointmentService,
    private readonly availabilityService: AvailabilityService,
    private readonly billingRuleService: BillingRuleService,
  ) {}

  async recommend(body: any) {
    const { clinic, physician, Patient, date, duration } = body;

    const availabilities = await this.availabilityService.findAll();

    const dayAvailability = availabilities.find((a) => {
      const dbDate = this.getDate(a.date);
      const reqDate = this.getDate(date);
      return (
        a.physician.id === physician &&
        dbDate === reqDate &&
        a.clinic.id === clinic
      );
    });

    if (!dayAvailability) {
      console.log('No availability found for physician on date:', date);
      return { recommended_slots: [] };
    }

    const billingRules = await this.billingRuleService.findAll();
    const physicianBillingRule = billingRules.find(
      (b) => b.physician.id === physician,
    );

    const gapBefore = physicianBillingRule?.gap_before_minutes || 0;
    const gapAfter = physicianBillingRule?.gap_after_minutes || 0;
    const minGap = physicianBillingRule?.min_gap_between_appointments || 0;

    const appointments = await this.appointmentService.findAll();
    const dayAppointments = appointments.filter(
      (a) =>
        a.physician.id === physician &&
        this.getDate(a.start_time.toISOString()) === this.getDate(date),
    );

    const recommendedSlots = this.generateSlots(
      date,
      dayAvailability.start_time,
      dayAvailability.end_time,
      duration,
      gapBefore,
      gapAfter,
      minGap,
      dayAppointments.map((a) => ({
        start_time: a.start_time.toISOString(),
        end_time: a.end_time.toISOString(),
      })),
    );

    return { recommended_slots: recommendedSlots };
  }

  private getDate(date: string | undefined): string {
    if (!date) return '';
    const parsed = new Date(date);
    return isNaN(parsed.getTime()) ? '' : parsed.toISOString().split('T')[0];
  }

  private generateSlots(
    date: string,
    startTime: string,
    endTime: string,
    duration: number,
    gapBefore: number,
    gapAfter: number,
    minGap: number,
    appointments: { start_time: string; end_time: string }[],
  ): string[] {
    const slots: { time: string; disruptionScore: number }[] = [];

    const availabilityStart = new Date(`${date}T${startTime}`);
    const availabilityEnd = new Date(`${date}T${endTime}`);
    let slotStart = new Date(availabilityStart);

    while (
      slotStart.getTime() + duration * 60000 <=
      availabilityEnd.getTime()
    ) {
      const slotFinish = new Date(slotStart.getTime() + duration * 60000);

      const overlaps = appointments.some((a) => {
        const apptStart = new Date(a.start_time);
        const apptEnd = new Date(a.end_time);
        const bufferStart = new Date(apptStart.getTime() - gapBefore * 60000);
        const bufferEnd = new Date(apptEnd.getTime() + gapAfter * 60000);

        return (
          (slotStart >= bufferStart && slotStart < bufferEnd) ||
          (slotFinish > bufferStart && slotFinish <= bufferEnd) ||
          (slotStart <= bufferStart && slotFinish >= bufferEnd)
        );
      });

      if (!overlaps) {
        let disruptionScore = 0;
        for (const a of appointments) {
          const apptMid = new Date(
            (new Date(a.start_time).getTime() +
              new Date(a.end_time).getTime()) /
              2,
          );
          const slotMid = new Date(
            (slotStart.getTime() + slotFinish.getTime()) / 2,
          );
          disruptionScore += Math.abs(slotMid.getTime() - apptMid.getTime());
        }

        slots.push({ time: slotStart.toISOString(), disruptionScore });

        slotStart = new Date(slotFinish.getTime() + minGap * 60000);
      } else {
        let nextSafe = new Date(slotStart.getTime() + 60000);

        for (const a of appointments) {
          const apptEnd = new Date(a.end_time);
          const bufferEnd = new Date(apptEnd.getTime() + gapAfter * 60000);
          if (slotStart < bufferEnd && bufferEnd > nextSafe) {
            nextSafe = bufferEnd;
          }
        }

        slotStart = new Date(nextSafe.getTime() + gapBefore * 60000);
      }
    }

    const recommended = slots
      .sort((a, b) => a.disruptionScore - b.disruptionScore)
      .slice(0, 10)
      .map((s) => s.time);

    return recommended;
  }
}
