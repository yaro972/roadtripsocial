import {Pipe, PipeTransform} from '@angular/core';
// We use the Moment.js library to convert dates to relative times
// import Moment from 'moment';
// import moment from 'moment';
// import moment from 'moment/src/moment';

@Pipe({
  name: 'fromNow'
})

// Our pipe will transform dates and timestamps to relative times
// using Moment.js
export class FromNowPipe implements PipeTransform {
  // The transform method will be called when the pipe is used
  // within a template
  transform(value) {
    if (value && (value instanceof Date ||
      typeof value === 'number')) {
      //   return new moment(value).fromNow();
    }
  }
}
