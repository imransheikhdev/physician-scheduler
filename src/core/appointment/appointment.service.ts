import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Appointment } from './entities/appointment.entity';

@Injectable()
export class AppointmentService {
  constructor(
    @InjectRepository(Appointment)
    private readonly appointmentRepo: Repository<Appointment>,
  ) {}

  async create(body: any) {
    const appointment = this.appointmentRepo.create({
      ...body,
      start_time: new Date(body.start_time),
      end_time: new Date(body.end_time),
    });
    return this.appointmentRepo.save(appointment);
  }

  async findAll() {
    return this.appointmentRepo.find({
      relations: ['clinic', 'physician', 'patient'],
    });
  }

  async findOne(id: string) {
    return this.appointmentRepo.findOne({
      where: { id },
      relations: ['clinic', 'physician', 'patient'],
    });
  }

  async update(id: string, body: any) {
    await this.appointmentRepo.update({ id }, body);
    return this.findOne(id);
  }

  async remove(id: string) {
    return this.appointmentRepo.delete({ id });
  }
}
