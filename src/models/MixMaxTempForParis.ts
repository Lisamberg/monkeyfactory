/* eslint-disable prettier/prettier */
export class MinMaxTempForParis {
    private minTemp: number;
    private maxTemp: number;

    constructor(maxTemp: number, minTemp: number) {
        this.minTemp = minTemp;
        this.maxTemp = maxTemp;
    }

    public getMinTemp = () => this.minTemp;
    public getMaxTemp = () => this.maxTemp;
}