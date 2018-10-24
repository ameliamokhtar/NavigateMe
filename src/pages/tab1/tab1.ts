import {
  Component,
  ChangeDetectorRef,
  ViewChild,
  ElementRef,
  NgZone
} from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  Platform,
  Events
} from "ionic-angular";
import { EstimoteBeacons } from "@ionic-native/estimote-beacons";
import { ServiceProvider } from "../../providers/service/service";

// plugins
import { IBeacon } from "ionic-native";

// providers
import { BeaconProvider } from "../../providers/beacon/beacon-provider";

// models
import { BeaconModel } from "../../module/beacon-module";

declare var evothings: any;
declare var google;
@IonicPage()
@Component({
  selector: "page-tab1",
  templateUrl: "tab1.html"
})
export class Tab1Page {
  @ViewChild("map")
  mapElement: ElementRef;
  beacons = [];
  zone: any;
  map: any;
  beaconData: any;
  myInput: any;
  searchResult: any;
  mapLocation: any;
  selectedLocation: any;
  uuid: any;
  distance: any;
  lowpass:any;
  beaconList=[];
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private platform: Platform,
    private change: ChangeDetectorRef,
    private eb: EstimoteBeacons,
    private service: ServiceProvider,
    public beaconProvider: BeaconProvider,
    public events: Events
  ) {}

  ionViewDidLoad() {
    console.log("ionViewDidLoad Tab1Page");
    this.getOfficeData();
    // this.startScanningForBeacons();
    
  }

  startScanningForBeacons() {
      evothings.eddystone.startScan(
        data => {
          this.beaconData = data;
          if (
            this.beaconData &&
            this.beaconData.txPower &&
            this.beaconData.rssi
          ) {
            this.distance = evothings.eddystone.calculateAccuracy(
              this.beaconData.txPower,
              this.beaconData.rssi
            );
            this.beaconData.distance = this.distance + " Meter";
          }
          this.lowpass = evothings.eddystone.createLowPassFilter(0.8)
          this.beaconData.distancefiltered = this.lowpass.filter(this.distance);
          console.log(this.beaconData);
          this.beaconList.push(this.beaconData)
         },
        error => console.error(error)
      );
  }
  stop(){
    evothings.eddystone.stopScan();
  }
  getOfficeData() {
    this.service.getOffice().subscribe(res => {
      if (res.successful) {
        if (res && res.location) {
          this.mapLocation = res.location;
        }
      }
    });
  }
  clear(){
    this.beaconList = [];
  }
  selectLocation(location) {
    this.myInput = "";
    this.searchResult = [];
    this.selectedLocation = location;
    console.log(this.selectedLocation);
  }
  ionClear() {
    this.myInput = "";
    this.searchResult = [];
  }
  onInput(ev) {
    this.searchResult = [];
    if (this.myInput) {
      this.mapLocation.forEach(location => {
        if (
          location.location_name
            .toLowerCase()
            .indexOf(this.myInput.toLowerCase()) > -1
        ) {
          if (this.searchResult.indexOf(location) === -1) {
            this.searchResult.push(location);
          }
        }
      });
    }
    if (this.searchResult.length === 0) {
      this.searchResult.push({ location_name: "Location Not Found" });
    }
  }
}
