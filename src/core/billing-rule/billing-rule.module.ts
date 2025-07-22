import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BillingRule } from './entities/billing-rule.entity';
import { BillingRuleService } from './billing-rule.service';
import { BillingRuleController } from './billing-rule.controller';

@Module({
  imports: [TypeOrmModule.forFeature([BillingRule])],
  controllers: [BillingRuleController],
  providers: [BillingRuleService],
  exports: [BillingRuleService],
})
export class BillingRuleModule {}
