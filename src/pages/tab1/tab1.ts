import { Component, ChangeDetectorRef } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { EstimoteBeacons } from '@ionic-native/estimote-beacons';
import { ServiceProvider } from '../../providers/service/service';
declare var evothings:any;

@IonicPage()
@Component({
  selector: 'page-tab1',
  templateUrl: 'tab1.html',
})
export class Tab1Page {
  
  beaconData: any;
  myInput:any;
  searchResult:any;
  mapLocation:any;
  selectedLocation:any
  uuid: any;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private platform: Platform,
    private change: ChangeDetectorRef,
    private eb: EstimoteBeacons,
    private service: ServiceProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Tab1Page');
    this.eb.requestAlwaysAuthorization();

    this.eb.enableAnalytics(true);
    this.getOfficeData()
  }

  startScanningForBeacons(){
    this.platform.ready().then(() => {
      evothings.eddystone.startScan((data) =>{
       this.beaconData = data;
       console.log(this.beaconData);
       setTimeout(()=>{
         this.change.detectChanges();
       }, 1000);
      }, error => console.error(error))
    })
  }

  getOfficeData() {
    this.service.getOffice().subscribe(res => {
      if (res.successful) {
        if(res && res.location){
          this.mapLocation = res.location
        }
      }
    });
  }
  selectLocation(location){
    this.myInput = "" ;
    this.searchResult = [];
    this.selectedLocation = location;
    console.log(this.selectedLocation);
  }
  ionClear(){
    this.myInput = "";
    this.searchResult = [];
  }
  onInput(ev){
    this.searchResult = [];
    if(this.myInput){
       this.mapLocation.forEach(location=>{
         if(location.location_name.toLowerCase().indexOf(this.myInput.toLowerCase()) > -1){
           if(this.searchResult.indexOf(location) === -1){
           this.searchResult.push(location);
          }
         }
       })
    }
    if(this.searchResult.length === 0){
      this.searchResult.push({location_name:'Location Not Found'})
    }
  }

}
