import { formatCurrency, getCurrencySymbol } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'copFormat'
})
export class CopFormatPipe implements PipeTransform {

  transform(
    value: number,
    currencyCode: string = 'COP'
  ): string | null {
      return formatCurrency(
        value,
        'es-CO',
        getCurrencySymbol('COP', 'narrow'),
        currencyCode,
        '3.2-2'
      );
  }

}
