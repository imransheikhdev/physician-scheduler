import { PartialType } from '@nestjs/mapped-types';
import { CreateBillingRuleDto } from './create-billing-rule.dto';

export class UpdateBillingRuleDto extends PartialType(CreateBillingRuleDto) {}
