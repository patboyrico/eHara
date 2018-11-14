import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { TokenProvider } from '../token/token';



/*
  Generated class for the DbProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DbProvider {

  public base_url =  'http://192.168.43.130:8080/';
  public access_token

  constructor(public http: HttpClient, private token: TokenProvider,
              public storage: Storage
    ) { 
       this.storage.get('token').then(token => {

        this.access_token = token;
    
      });

    }

  getDriverInfo(username)
  {
    return this.http.get(this.base_url + 'user/' + username, {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.access_token)
  });
  }

  getRequestedRide()
  {
    
    this.http.get(this.base_url + 'rides',{
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.token.token)
  });
  }

  
  updateDriverOnlineStatus(id, body)
  {
    this.http.put(this.base_url + 'driver/' + id, body, {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.token.token)
  }).subscribe(result => {}); 
  }


}
