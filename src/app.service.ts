/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { WrongDateException } from './exceptions/wrongDate.exception';
import { RomanEnum } from './models/romanEnum.model';
import { Substractibles } from './models/Substractibles.model';
import * as moment from 'moment';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  /**
   * Convert Arab date to Roman Date
   * Call Weather API to get MIN/MAX Paris celcius temp for this date
   * Weather data + roman date
   * Wrong string for date : throws Expt
   */
  getMinMaxTemperatureForParis(dateStr: string): string {
    const date: moment.Moment = moment(dateStr, "DD/MM/YYYY");

    if (!date.isValid()) {
      throw new WrongDateException();
    }
    const romanDate: string = this.convertArabDateToRomanDate(date);
    return 'conversion en cours ...';
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
   * break digit 
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
   * @returns 
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
