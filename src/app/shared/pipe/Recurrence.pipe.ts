import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'recurrence' })
export class Recurrence implements PipeTransform {
  transform(value: any): any {
  	console.log(value);
    if(value == true)
    {
    return "continuous" ;
    }else
    {
      return "one-off" ;
    }
  }
}

