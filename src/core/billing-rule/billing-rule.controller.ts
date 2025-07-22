import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { BillingRuleService } from './billing-rule.service';

@Controller('billing-rules')
export class BillingRuleController {
  constructor(private readonly billingRuleService: BillingRuleService) {}

  @Post()
  create(@Body() body: any) {
    return this.billingRuleService.create(body);
  }

  @Get()
  findAll() {
    return this.billingRuleService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.billingRuleService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body: any) {
    return this.billingRuleService.update(id, body);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.billingRuleService.remove(id);
  }
}
