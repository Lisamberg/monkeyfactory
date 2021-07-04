/* eslint-disable prettier/prettier */
import { RomanEnum } from './romanEnum.model';

export class RomanArab {
    private romanValue: RomanEnum;
    private arabValue: number;

    public constructor(romanValue: RomanEnum, arabValue: number) {
        this.romanValue = romanValue;
        this.arabValue = arabValue;
    }

    public getRomanValue = () => this.romanValue;
    public getArabValue = () => this.arabValue;
}