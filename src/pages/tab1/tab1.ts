import { Component, ChangeDetectorRef } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { EstimoteBeacons } from '@ionic-native/estimote-beacons';

@IonicPage()
@Component({
  selector: 'page-tab1',
  templateUrl: 'tab1.html',
})
export class Tab1Page {

  beaconData: any;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private platform: Platform,
    private change: ChangeDetectorRef,
    private eb: EstimoteBeacons) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Tab1Page');
    this.eb.requestAlwaysAuthorization();

    this.eb.enableAnalytics(true);
  }





  // connectToBeacon(beacon){

  // }



}
