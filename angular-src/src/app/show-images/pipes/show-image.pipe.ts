import { Pipe, PipeTransform } from '@angular/core';
import { environment } from './../../../environments/environment';

@Pipe({
  name: 'showImage'
})
export class ShowImagePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return environment.BACKENDURL + '/api/display-photo/' + value;
  };

};
