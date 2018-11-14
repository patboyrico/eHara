import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable()
export class AuthProvider {

  public base_url =  'http://172.104.216.175:8080/';

  constructor(public http: HttpClient) {
    //console.log('Hello AuthProvider Provider');
  }

  login(data) {
    return this.http.post(this.base_url + 'api/login', data);
  }

}
