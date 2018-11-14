import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { HomePage } from '../home/home';

import { AuthProvider } from '../../providers/auth/auth';
import { TokenProvider } from '../../providers/token/token';
import { DbProvider } from '../../providers/db/db';

import { Storage } from '@ionic/storage';



@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  public error: any;

  public form = {
      username: null,
      password: null
  };

  public driverData;
  public driverId;
  public driverUserid;
  public username;

  constructor(
              public navCtrl: NavController, public navParams: NavParams,
              public auth: AuthProvider, public token: TokenProvider,
              public loadCtrl: LoadingController, public db: DbProvider,
              public storage: Storage
    ) {
  }

  ionViewDidLoad() {
   
  }

  
  handleError(error) {
    if(error.status == 401)
    {
      this.error = 'The credentials do not match our records';
      //console.log(this.error);
    }
}

  handleResponse(data) {

    
      this.db.getDriverInfo(data.username).subscribe(
              resp => {
                  console.log(resp);
              }
      );
      this.token.handle(data.access_token);
      this.navCtrl.setRoot(HomePage, {
      		driverData: this.driverData,
      		driverId: this.driverId,
      		driverUserId: this.driverUserid
      });
  }

  getResponse(resp)
  {
    this.driverData = resp;
    console.log(this.driverData);
  }

  toDash()
  {
    let loading = this.loadCtrl.create({
      content:'Logging In...'
    });

    loading.present();

    this.auth.login(this.form).subscribe(
     data => { 
       this.handleResponse(data);
        loading.dismiss();
     },
     error => { 
       this.handleError(error);
     loading.dismiss();
     }
    );

  }


}
