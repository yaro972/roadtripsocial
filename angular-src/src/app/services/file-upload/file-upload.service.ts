import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { environment } from './../../../environments/environment';

@Injectable()
export class FileUploadService {

  constructor(
    private _http: Http
  ) { }

  /**
  * Uplaod d'un fichier depuis le navigateur
  * https://stackoverflow.com/questions/43444440/how-to-include-a-file-upload-control-in-an-angular2-reactive-form
  */
  upload(fileToUpload: any) {
    let input = new FormData();
    input.append("file", fileToUpload);
    const headers = new Headers();

    headers
      .append('Content-type', 'image');
    return this._http
      .post(environment.BACKENDURL + "/api/uploadFile", input);
  }

}
