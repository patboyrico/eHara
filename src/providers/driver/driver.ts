import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Storage } from '@ionic/storage';
import { AngularFireDatabase } from 'angularfire2/database';

import { TokenProvider } from '../token/token';




@Injectable()
export class DriverProvider {


  public base_url =  'http://172.104.216.175:8080/';;
  public driver;
  public device;

  public pickupRequest: boolean = false;
  //public driverId: string = '2ULXHsUunHoX6HEdSdaX';

  public riderId: string;
  public access_token;
  public username;

  dbLocationRef: any;
  geoFire: any;

  constructor(public http: HttpClient, public storage: Storage, public token: TokenProvider, public afs: AngularFireDatabase, 
      ) {
        //  this.dbLocationRef = (this.afs.list('driversAvailable/' + this.driverId));
        //  this.geoFire = new GeoFire(this.dbLocationRef.$ref);
        this.storage.get('token').then(token => {

            this.access_token = token;
        
          });

          this.storage.get('data').then
          (
            data => {
              this.username = data;
            }
          )

          this.dbLocationRef = this.afs.list('driversAvailable/' + this.username + 'l');
    
      }

      setDeviceId(id, deviceId)
      {
          this.device = {
               "action": "update_id",
               "fid": deviceId.toString()
          }

          let header: HttpHeaders = new HttpHeaders()
          header = header.append('Authorization', 'Bearer ' + this.access_token);

          this.http.put(this.base_url + 'firebase/' + id,  this.device, {
            headers: header
        }).subscribe(result => {});

      }


      setDriverLocation(online, latitude, longitude, id)
      {
           this.driver = {
              activity: 'online',
              value: online,
              long: longitude.toString(),
              lat: latitude.toString()
          }

          let header: HttpHeaders = new HttpHeaders()
          header = header.append('Content-Type', 'text/plain');
          header = header.append('Authorization', 'Bearer ' + this.access_token);

          this.http.put(this.base_url + 'driver/' + id,  this.driver, {
            headers: header
        }).subscribe(result => {});

      }

      // updateDriverLocation(latitude, longitude, username)
      // {
      //   this.afs.list('driversAvailableRegular/' + username + '/l').set({
      //     0: latitude, 
      //     1: longitude
      //   }, null);   
      // }


}
