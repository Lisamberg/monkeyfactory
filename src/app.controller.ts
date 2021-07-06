/* eslint-disable prettier/prettier */
import { Controller, Get, Query } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  /**
   * Conversion arab date (@Query'date') to roman date  
   * Then calls API to get min/max temp ° for this date on Paris
   * Finally return a string including roman date and temp ° wheather data
   * @param date
   * @returns string 'roman date : Paris : Min: temp° -  Max: temp°'
   */
  @Get()
    getRomanDateFromStringAndParisTempWeatherData(@Query('date') date: string): Observable<string> {
    return this.appService.getRomanDateFromStringAndParisTempWeatherData(date);
  }

}
