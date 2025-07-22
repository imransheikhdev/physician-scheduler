import { Controller, Post, Body } from '@nestjs/common';
import { SchedulerService } from './scheduler.service';

@Controller('scheduler')
export class SchedulerController {
  constructor(private readonly schedulerService: SchedulerService) {}

  @Post('recommend')
  recommend(@Body() body: any) {
    return this.schedulerService.recommend(body);
  }
}
