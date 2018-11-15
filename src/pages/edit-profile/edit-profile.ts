import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { TokenProvider } from '../../providers/token/token';
import { LoginPage } from '../login/login';

/**
 * Generated class for the EditProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-edit-profile',
  templateUrl: 'edit-profile.html',
})
export class EditProfilePage {

  public driverProfile;

  constructor(public navCtrl: NavController, public navParams: NavParams, public token: TokenProvider) {
      
  }

  ionViewDidLoad() {
    this.driverProfile = this.navParams.get('driver');
    console.log(this.driverProfile);
  }

  logout()
  {
    this.token.removeToken();
    this.navCtrl.setRoot(LoginPage);
  }

  goBack()  {
    this.navCtrl.pop();
  }

}
