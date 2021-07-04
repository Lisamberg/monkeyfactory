/* eslint-disable prettier/prettier */
import { RomanArab } from "./RomanArab.model";
import { RomanEnum } from "./romanEnum.model";

export class Substractibles {
	public static allSubstractibles : RomanArab[] = [
		new RomanArab(RomanEnum.MMM, 3000),
		new RomanArab(RomanEnum.MM, 2000),
		new RomanArab(RomanEnum.M, 1000),
		new RomanArab(RomanEnum.CM, 900),
		new RomanArab(RomanEnum.DCCC, 800),
		new RomanArab(RomanEnum.DCC, 700),
		new RomanArab(RomanEnum.DC, 600),
		new RomanArab(RomanEnum.D, 500),
		new RomanArab(RomanEnum.CD, 400),
		new RomanArab(RomanEnum.CCC, 300),
		new RomanArab(RomanEnum.CC, 200),
		new RomanArab(RomanEnum.C, 100),
		new RomanArab(RomanEnum.XC, 90),
		new RomanArab(RomanEnum.LXXX, 80),
		new RomanArab(RomanEnum.LXX, 70),
		new RomanArab(RomanEnum.LX, 60),
		new RomanArab(RomanEnum.L, 50),
		new RomanArab(RomanEnum.XL, 40),
		new RomanArab(RomanEnum.XXX, 30),
		new RomanArab(RomanEnum.XX, 20),
		new RomanArab(RomanEnum.X, 10),
		new RomanArab(RomanEnum.IX, 9),
		new RomanArab(RomanEnum.VIII, 8),
		new RomanArab(RomanEnum.VII, 7),
		new RomanArab(RomanEnum.VI, 6),
		new RomanArab(RomanEnum.V, 5),
		new RomanArab(RomanEnum.IV, 4),
		new RomanArab(RomanEnum.III, 3),
		new RomanArab(RomanEnum.II, 2),
		new RomanArab(RomanEnum.I, 1)
	];
}