import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tab3',
  standalone: true
})
export class Tab3Pipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
