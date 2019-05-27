import { Injectable } from '@angular/core';

@Injectable()
export class UtilService {
  calculatePercentage(partialValue, totalValue) {
    return (100 * partialValue) / totalValue;
  }

}