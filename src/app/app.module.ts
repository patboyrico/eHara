import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { HttpClientModule } from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { EditProfilePage } from '../pages/edit-profile/edit-profile';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
//import { FIREBASE_CONFIG } from '../app/firebase.credentials.';

import { Geolocation } from '@ionic-native/geolocation';
import { Firebase } from '@ionic-native/firebase';
import { UniqueDeviceID } from '@ionic-native/unique-device-id';
import { Device } from '@ionic-native/device';


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { DriverProvider } from '../providers/driver/driver';
import { DbProvider } from '../providers/db/db';
import { LoginPage } from '../pages/login/login';
import { EarningsPage } from '../pages/earnings/earnings';
import { RidesPage  } from '../pages/rides/rides';
import { TokenProvider } from '../providers/token/token';
import { AuthProvider } from '../providers/auth/auth';
import { FcmProvider } from '../providers/fcm/fcm';

export const FIREBASE_CONFIG = {
  apiKey: "AIzaSyDE3AjW_QVWmPkxyZjWIk8sVcIJR915xuE",
  authDomain: "ehara-8569c.firebaseapp.com",
  databaseURL: "https://ehara-8569c.firebaseio.com",
  projectId: "ehara-8569c",
  storageBucket: "ehara-8569c.appspot.com",
  messagingSenderId:  "853570012334"
}

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    EarningsPage,
    RidesPage,
    EditProfilePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(FIREBASE_CONFIG),
    HttpClientModule,
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    EarningsPage,
    RidesPage,
    EditProfilePage
    
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    DriverProvider,
    DbProvider,
    TokenProvider,
    AuthProvider,
    Geolocation,
    Firebase,
    UniqueDeviceID,
    FcmProvider,
    Device,
    DriverProvider,
    DriverProvider
  ]
})
export class AppModule {}
