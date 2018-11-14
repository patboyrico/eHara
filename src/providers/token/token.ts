import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Storage } from '@ionic/storage';


@Injectable()
export class TokenProvider {

  public token;

  private iss = {
    login: 'http://127.0.0.1:8000/api/login'
  };

  constructor(public http: HttpClient, private storage: Storage) {}

  handle(token) {
    this.setToken(token);
    return true;
}

setToken(token) {
  this.storage.set('token', token);
}

getToken() {
  return this.storage.get('token').then(token => {

    return token;

  });
}

removeToken() {
   this.storage.remove('token');
}

// validate() {
//   const token = this.getToken();
//   if (token) {
//     const payload = this.payload(token);
//     if (payload) {
//       return Object.keys(this.iss).indexOf(payload.iss) > -1 ? true : false;
//     }
//   }
//   return false;
// }

// payload(token) {
//   const payload = token.split('.')[1];
//   return this.decode(payload);
// }

// decode(payload) {
//   return JSON.parse(atob(payload));
// }

// loggedIn() {
//   return this.validate();
// }

}
