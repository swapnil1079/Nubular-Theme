import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'time' })
export class Time implements PipeTransform {
  transform(value: any): any {
  	
  	var date = new Date(value).toDateString();
  	// var time  = new Date(value).toLocaleTimeString("en-US")
  	// console.log(value);
  	 value  = date;
    // var hours = Math.floor(value / 3600);
    // var minutes = Math.floor((value - (hours * 3600)) / 60);
    // var seconds = value - (hours * 3600) - (minutes * 60);
    // value = (hours.toString().length == 1 ? '0' + hours.toString() : hours.toString())
    //   + ':' + (minutes.toString().length == 1 ? '0' + minutes.toString() : minutes.toString()) +
    //   ':' + (seconds.toString().length == 1 ? '0' + seconds.toString() : seconds.toString());
     return value;
  }
}