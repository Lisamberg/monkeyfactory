import { HttpException,HttpStatus }  from '@nestjs/common';

export class WrongDateException extends HttpException {
    constructor() {
      super('Date invalide', HttpStatus.INTERNAL_SERVER_ERROR);
    }
}