import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get()
  getMinMaxTemperatureForParis(@Query('date') date: string): string {
    //test parse date
    return this.appService.getMinMaxTemperatureForParis(date);
  }
}
