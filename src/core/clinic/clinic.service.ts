import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Clinic } from './entities/clinic.entity';

@Injectable()
export class ClinicService {
  constructor(
    @InjectRepository(Clinic)
    private readonly clinicRepo: Repository<Clinic>,
  ) {}

  create(body: any) {
    const clinic = this.clinicRepo.create(body);
    return this.clinicRepo.save(clinic);
  }

  findAll() {
    return this.clinicRepo.find();
  }

  findOne(id: string) {
    return this.clinicRepo.findOneBy({ id });
  }

  update(id: string, body: any) {
    return this.clinicRepo.update({ id }, body);
  }

  remove(id: string) {
    return this.clinicRepo.delete({ id });
  }
}
