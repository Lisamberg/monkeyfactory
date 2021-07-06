/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable prettier/prettier */
import { HttpService, Injectable } from '@nestjs/common';
import { WrongDateException } from './exceptions/wrongDate.exception';
import { RomanEnum } from './models/romanEnum.model';
import { Substractibles } from './models/Substractibles.model';
import * as moment from 'moment';
import { Observable, } from 'rxjs';
import { map } from 'rxjs/operators';
import { MinMaxTempForParis } from './models/MixMaxTempForParis';

@Injectable()
export class AppService {

  constructor(private readonly httpService: HttpService) {}
  private readonly BASE_API_WEATHER_PARIS: string = "https://www.metaweather.com/api/location/615702/";
  private readonly FORMAT_DATE_MOMENT: string = "DD/MM/YYYY";
  
  /**
   * Convert Arab date to Roman Date
   * Call Weather API to get MIN/MAX Paris celcius temp for this date
   * Return Paris Temp ° Weather data + roman date
   * Wrong string for date : throws Expt
   * @param dateStr
   * @returns Observable<string> 'roman date : Paris : Min: temp° -  Max: temp°'
   */
  public getRomanDateFromStringAndParisTempWeatherData(dateStr: string): Observable<string> {
    const date: moment.Moment = moment(dateStr, this.FORMAT_DATE_MOMENT);

    if (!date.isValid()) {
      throw new WrongDateException();
    }
    const romanDate: string = this.convertArabDateToRomanDate(date);

    return this.getParisWeatherMinMaxTemp(date).pipe(
      map(minMaxTempForParis => `${romanDate} : Paris : Min: ${minMaxTempForParis.getMinTemp()}° -  Max: ${minMaxTempForParis.getMaxTemp()}°`)
    )

  }

  /**
   * Call the weather API to get informations such as min/maxtemp 
   * Then create result Object
   * @param date 
   * @returns MinMaxTempForParis
   */
  public getParisWeatherMinMaxTemp(date: moment.Moment): Observable<MinMaxTempForParis> {
    return this.httpService.get(`${this.BASE_API_WEATHER_PARIS}${date.year()}/${date.month() + 1}/${date.date()}`)
    .pipe(
      map(resp => new MinMaxTempForParis(resp.data[0]['max_temp'], resp.data[0]['min_temp']) )
    )
  }

  /**
   * Check if the date is valid 
   * Call conversion function from Date passing d/m/y
   * @param date 
   * @returns 
   */
  public convertArabDateToRomanDate(date: moment.Moment): string {

    if ( !(date.year() <= 3000 && date.year() >= 1) ) {
      throw new WrongDateException();
    }
    return this.converterArabDigitsToRoman([date.date(), date.month() + 1, date.year()]);
  }

  /**
   * break digit according to roman mapping
   * ex: 555 : 500, 50, 5
   * @param digit 
   * @returns 
   */
   public decomposeArabDigit(digit: number): number[] {
    let digitCopy: number = digit;

    const decomposedArabDigit: number[] = [];

    for (const subscractible of Substractibles.allSubstractibles) {
      if (digitCopy - subscractible.getArabValue() >= 0) {
        decomposedArabDigit.push(subscractible.getArabValue());
        digitCopy -= subscractible.getArabValue();
      }
    }
    return decomposedArabDigit;
  }

    /**
   * Return roman list from arab list 
   * Ex: [10, 2] : [X, II]
   * @param arabDigits 
   * @returns RomanEnum[]
   */
     public fromDecomposedArabDigitToListOfRoman(
      arabDigits: number[],
    ): RomanEnum[] {
      return arabDigits.map((digit) => {
        return Substractibles.allSubstractibles
          .find((substractible) => substractible.getArabValue() === digit)
          .getRomanValue();
      });
    }

  /**
   * Convert date array number to roman string date 
   * [d,m,y] : 'x/xl/m'
   * @param digitsDayMonthYear 
   * @returns string 
   */
  public converterArabDigitsToRoman(digitsDayMonthYear: number[]): string {
    return digitsDayMonthYear
      .map((digit) =>
        this.fromDecomposedArabDigitToListOfRoman(
          this.decomposeArabDigit(digit),
        ).join(''),
      )
      .join('/');
  }
}
