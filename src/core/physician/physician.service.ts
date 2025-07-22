import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Physician } from './entities/physician.entity';

@Injectable()
export class PhysicianService {
  constructor(
    @InjectRepository(Physician)
    private readonly physicianRepo: Repository<Physician>,
  ) {}

  create(body: any) {
    const physician = this.physicianRepo.create(body);
    return this.physicianRepo.save(physician);
  }

  findAll() {
    return this.physicianRepo.find({ relations: ['clinic'] });
  }

  findOne(id: string) {
    return this.physicianRepo.findOne({ where: { id }, relations: ['clinic'] });
  }

  update(id: string, body: any) {
    return this.physicianRepo.update({ id }, body);
  }

  remove(id: string) {
    return this.physicianRepo.delete({ id });
  }
}
