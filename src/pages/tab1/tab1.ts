import { Component, ChangeDetectorRef,ViewChild, ElementRef,NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, Events } from 'ionic-angular';
import { EstimoteBeacons } from '@ionic-native/estimote-beacons';
import { ServiceProvider } from '../../providers/service/service';

// plugins
import { IBeacon } from 'ionic-native';

// providers
import { BeaconProvider } from '../../providers/beacon/beacon-provider'

// models
import { BeaconModel } from '../../module/beacon-module';


declare var evothings:any;
declare var google;
@IonicPage()
@Component({
  selector: 'page-tab1',
  templateUrl: 'tab1.html',
})
export class Tab1Page {
  @ViewChild('map') mapElement: ElementRef;
  beacons: BeaconModel[] = [];
  zone: any;
  map: any;
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
    private service: ServiceProvider,
    public beaconProvider: BeaconProvider,
    public events: Events) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Tab1Page');
    this.beaconProvider.initialise().then((isInitialised) => {
      if (isInitialised) {
      this.listenToBeaconEvents();
      }
      });
    this.eb.requestAlwaysAuthorization();

    this.eb.enableAnalytics(true);
    this.getOfficeData()
    this.loadMap();
  }

  listenToBeaconEvents() {
    this.events.subscribe('didRangeBeaconsInRegion', (data) => {
    
    // update the UI with the beacon list
    this.zone.run(() => {
    
    this.beacons = [];
    
    let beaconList = data.beacons;
    beaconList.forEach((beacon) => {
    let beaconObject = new BeaconModel(beacon);
    this.beacons.push(beaconObject);
    });
    
    });
    
    });
    console.log(this.beacons)
    }

  loadMap(){
 
    let latLng = new google.maps.LatLng(-34.9290, 138.6010);
 
    let mapOptions = {
      center: latLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }
 
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
 
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
