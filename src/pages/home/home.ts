import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, Platform, LoadingController, AlertController, NavParams, ModalController } from 'ionic-angular';

import { Geolocation } from '@ionic-native/geolocation';
import { DriverProvider } from '../../providers/driver/driver';
import { Storage } from '@ionic/storage';
import { Device } from '@ionic-native/device';


import { filter } from 'rxjs/operators';

import { EditProfilePage } from '../edit-profile/edit-profile';

import { DbProvider } from '../../providers/db/db';


declare var google: any;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

   public lat:number;
   public long: number;
   public driverDetails;
   public isOnline: boolean = false;
   //public driverId: string = '9m1owztm3NXjthd0oEu2Ucf84vK2';
   public driverDBId: number;
   public driverUserId: number;
   public pickupRequestState: boolean = false;
   public username;
   public carClass;
   public deviceId;

   public rider: any;

   public isMapIdle : boolean;

  @ViewChild('map') mapElement: ElementRef;
  map: any;


  constructor(public navCtrl: NavController, public platform: Platform,
              public geo: Geolocation, public loadingCtrl: LoadingController,
              public driverProvider: DriverProvider, public alertCtrl: AlertController,
              public navParams: NavParams, public modalCtrl: ModalController, public db: DbProvider,
              public storage: Storage, public device: Device
              ) {
                  // this.storage.get('driverData').then(
                  //   driverData => {
                  //     console.log(driverData);
                  //   }
                  // )  
                  
              }
 

  ionViewDidLoad() {  

    this.username = this.navParams.get('driverData');
                  
                  this.db.getDriverInfo(this.username).subscribe(
                    resp => {
                        this.driverDetails = resp;
                        console.log(this.driverDetails);
                        console.log(this.driverDetails.id);
                        console.log(this.driverDetails.name);
                        this.carClass = this.driverDetails.driver.carClass.name;
                    }
                  );

    
    this.platform.ready().then(() => {

      this.deviceId = this.device.uuid;
      console.log(this.device.uuid);

      this.driverProvider.setDeviceId(this.driverDetails.id, this.deviceId);
            
      let loading = this.loadingCtrl.create({
        content:'Locating...'
      });
  
      loading.present();

      let mapOptions = {
        zoom: 18,
        //mapTypeId: google.maps.MapTypeId.ROADMAP,
        mapTypeControl: false, 
        streetViewControl: false,
        fullscreenControl: false,
        disableDefaultUI: true
      }
      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
 
      this.geo.getCurrentPosition().then(pos => {

        let latLng = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
        this.map.setCenter(latLng);
        this.map.setZoom(18);

      let driveIcon = '../../assets/icon/icon-car.png';
    let driverMarker = new google.maps.Marker({
          position: latLng,
          icon: driveIcon,
          title: 'Driver'
        });
        driverMarker.setMap(this.map);

        loading.dismiss();


      }).catch((error) => {
        console.log('Error getting location', error);
      });
    });

    this.geo.watchPosition()
                              .pipe(filter((p) => p.coords !== undefined)) //Filter Out Errors
                              .subscribe(position => {
                              let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
                              this.map.setCenter(latLng);
                              this.addMapEventListeners();
                              this.lat = position.coords.latitude;
                              this.long = position.coords.longitude;
                              this.updateDriverOnlineStatus( );
                              console.log(this.long + ' ' + this.lat);
    });

  }

  addMapEventListeners(){
    google.maps.event.addListener(this.map, 'dragstart', () => {
      this.isMapIdle = false;
    })
    google.maps.event.addListener(this.map, 'idle', () => {
      this.isMapIdle = true;
    })
  }

  // updateDriverLocation(latitude, longitude)
  // {
  //   //this.driverProvider.updateDriverLocation(latitude, longitude, this.username);
  // }

  updateDriverOnlineStatus()
  {
      this.isOnline = !this.isOnline;
      this.driverProvider.setDriverLocation(this.isOnline, this.lat, this.long, this.driverDetails.id);
  }

  toProfile()
  {
      
      let profileModal = this.modalCtrl.create(EditProfilePage, { driver: this.driverDetails });
      profileModal.present();
   
  }

  




}
