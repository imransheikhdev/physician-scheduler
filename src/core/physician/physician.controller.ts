import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PhysicianService } from './physician.service';

@Controller('physicians')
export class PhysicianController {
  constructor(private readonly physicianService: PhysicianService) {}

  @Post()
  create(@Body() body: any) {
    return this.physicianService.create(body);
  }

  @Get()
  findAll() {
    return this.physicianService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.physicianService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body: any) {
    return this.physicianService.update(id, body);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.physicianService.remove(id);
  }
}
