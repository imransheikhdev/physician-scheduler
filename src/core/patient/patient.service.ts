import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Patient } from './entities/patient.entity';

@Injectable()
export class PatientService {
  constructor(
    @InjectRepository(Patient)
    private readonly patientRepo: Repository<Patient>,
  ) {}

  create(body: any) {
    const patient = this.patientRepo.create(body);
    return this.patientRepo.save(patient);
  }

  findAll() {
    return this.patientRepo.find();
  }

  findOne(id: string) {
    return this.patientRepo.findOneBy({ id });
  }

  update(id: string, body: any) {
    return this.patientRepo.update({ id }, body);
  }

  remove(id: string) {
    return this.patientRepo.delete({ id });
  }
}
