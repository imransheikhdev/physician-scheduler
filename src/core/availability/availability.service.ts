import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Availability } from './entities/availability.entity';

@Injectable()
export class AvailabilityService {
  constructor(
    @InjectRepository(Availability)
    private readonly availabilityRepo: Repository<Availability>,
  ) {}

  create(body: any) {
    const availability = this.availabilityRepo.create(body);
    return this.availabilityRepo.save(availability);
  }

  findAll() {
    return this.availabilityRepo.find({ relations: ['clinic', 'physician'] });
  }

  findOne(id: string) {
    return this.availabilityRepo.findOne({
      where: { id },
      relations: ['clinic', 'physician'],
    });
  }

  update(id: string, body: any) {
    return this.availabilityRepo.update({ id }, body);
  }

  remove(id: string) {
    return this.availabilityRepo.delete({ id });
  }
}
