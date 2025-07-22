import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BillingRule } from './entities/billing-rule.entity';

@Injectable()
export class BillingRuleService {
  constructor(
    @InjectRepository(BillingRule)
    private readonly billingRuleRepo: Repository<BillingRule>,
  ) {}

  create(body: any) {
    const billingRule = this.billingRuleRepo.create(body);
    return this.billingRuleRepo.save(billingRule);
  }

  findAll() {
    return this.billingRuleRepo.find({ relations: ['physician'] });
  }

  findOne(id: string) {
    return this.billingRuleRepo.findOne({
      where: { id },
      relations: ['physician'],
    });
  }

  update(id: string, body: any) {
    return this.billingRuleRepo.update({ id }, body);
  }

  remove(id: string) {
    return this.billingRuleRepo.delete({ id });
  }
}
