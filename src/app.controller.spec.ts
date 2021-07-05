/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WrongDateException } from './exceptions/wrongDate.exception';
import { RomanEnum } from './models/romanEnum.model';
import * as moment from 'moment';

describe('AppController', () => {
  let appController: AppController;
  let appService: AppService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
    appService = app.get<AppService>(AppService);
  });

  describe('root', () => {
    it('should return "conversion en cours ..."', () => {
      expect(appService.getMinMaxTemperatureForParis('02/07/2021')).toBe(
        'conversion en cours ...',
      );
    });

    it('should return our WrongDateException', () => {
      expect(() =>
        appService.getMinMaxTemperatureForParis('fsftgx'),
      ).toThrowError(WrongDateException);
    });

    it('should return decomposed arab digit', () => {
      expect(appService.decomposeArabDigit(2216)).toEqual(
        expect.arrayContaining([2000, 200, 10, 6]),
      );
    });

    it('should return decomposed arab digit', () => {
      expect(appService.decomposeArabDigit(1952)).toEqual(
        expect.arrayContaining([1000, 900, 50, 2]),
      );
    });

    it('should return romans from decomposed arab digits', () => {
      expect(appService.fromDecomposedArabDigitToListOfRoman([1000, 900, 50, 2]))
      .toEqual(expect.arrayContaining([RomanEnum.M, RomanEnum.CM, RomanEnum.L, RomanEnum.II]));
    });

    it('should return roman date from arab date dd/MM/YYYY', () => {
      expect(appService.converterArabDigitsToRoman([3, 6, 1952])).toBe('III/VI/MCMLII');
    });

    it('should return roman date from arab date dd/MM/YYYY', () => {
      expect(appService.converterArabDigitsToRoman([4, 7, 2021])).toBe('IV/VII/MMXXI');
    });

    it('should return invalid date exception', () => {
      expect( () => appService.convertArabDateToRomanDate(moment('07/2021', "DD/MM/YYYY"))).toThrowError(WrongDateException);
    });

    it('should return roman date', () => {
      expect( () => appService.convertArabDateToRomanDate(moment('00/00/2021', "DD/MM/YYYY"))).toThrowError(WrongDateException);
    });

    it('should return roman date', () => {
      expect(appService.convertArabDateToRomanDate(moment('04/07/2021', "DD/MM/YYYY"))).toBe('IV/VII/MMXXI');
    });

    it('should return roman date', () => {
      expect(appService.convertArabDateToRomanDate(moment('12/12/2021', "DD/MM/YYYY"))).toBe('XII/XII/MMXXI');
    });

  });
});
