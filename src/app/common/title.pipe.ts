import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'title',
})
export class TitlePipe implements PipeTransform {
  transform(value: String, ...args: unknown[]): unknown {
    if (value.length >= 30) {
      return value.substring(0, 30).concat('...');
    }
    return value;
  }
}
