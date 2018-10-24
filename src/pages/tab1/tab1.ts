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
import { IBeacon } from "@ionic-native/ibeacon";

// providers
import { BeaconProvider } from "../../providers/beacon/beacon-provider";

// models
import { BeaconModel } from "../../module/beacon-module";

declare var evothings: any;
declare var google;
declare var IndoorAtlas: any;
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
  lowpass: any;
  beaconList = [];
  region: any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private platform: Platform,
    private change: ChangeDetectorRef,
    private eb: EstimoteBeacons,
    private service: ServiceProvider,
    public beaconProvider: BeaconProvider,
    public events: Events,
    public ibeacon: IBeacon
  ) {}

  ionViewDidLoad() {
    console.log("ionViewDidLoad Tab1Page");
    this.getOfficeData();
    // this.startScanningForBeacons();
    // setup a beacon region – CHANGE THIS TO YOUR OWN UUID
    this.region = this.ibeacon.BeaconRegion(
      "bbd2b66fac64f79c93bbe028e776fa3c",
      "B9407F30-F5F8-466E-AFF9-25556B57FE6D"
    );

   
    // this.eb.startMonitoringForRegion(this.region,true).subscribe(data=>{
    //   console.log(data);
    // })
    // this.ibeacon.startRangingBeaconsInRegion(this.region).then(
    //   (data) => {
    //     // resolve(true);
    //     console.log(data);
    //   },
    //   error => {
    //     console.error("Failed to begin monitoring: ", error);
    //     // resolve(false);
    //   }
    // );
  }
  startLocating(){
     // start ranging
     this.eb.startRangingBeaconsInRegion(this.region).subscribe(data => {
      console.log(data);
    });
    // onSuccess Callback
    var onSuccess = function() {
      alert("IndoorAtlas was successfully initialized");
      IndoorAtlas.getCurrentPosition(onSuccess2, onError2);
    };

    // onError Callback receives a PositionError object
    function onError(error) {
      alert("Code: " + error.code + "\n" + "Message: " + error.message);
    }

    IndoorAtlas.initialize(onSuccess, onError, {
      key: "85385ec6-8e0c-45e7-af01-776d25ae6801",
      secret:
        "eHE3bzJ4tzIjUES00puoyoZlSlZ1T74ENNxJuOxlk/U5x5tm7IQs7E923BrUUtmVx9s73YK8cwiBwlNSkyrqIg4sYtN3yILJuIsJSMQ0QjqLd0+xhjPebDsH8EWDKw=="
    });
    console.log(IndoorAtlas);
    // onSuccess Callback
    // This method accepts a Position object, which contains the
    // current GPS coordinates
    var onSuccess2 = function(position) {
      console.log(position)
      alert(
        "Latitude: " +
          position.coords.latitude +
          "\n" +
          "Longitude: " +
          position.coords.longitude +
          "\n" +
          "Altitude: " +
          position.coords.altitude +
          "\n" +
          "Accuracy: " +
          position.coords.accuracy +
          "\n" +
          "Heading: " +
          position.coords.heading +
          "\n" +
          "Floor: " +
          position.coords.floor +
          "\n" +
          "Timestamp: " +
          position.timestamp
      );
    };

    // onError Callback receives a PositionError object
    function onError2(error) {
      alert("Code: " + error.code + "\n" + "Message: " + error.message);
    }

    
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
        this.lowpass = evothings.eddystone.createLowPassFilter(0.8);
        this.beaconData.distancefiltered = this.lowpass.filter(this.distance);
        console.log(this.beaconData);
        this.beaconList.push(this.beaconData);
      },
      error => console.error(error)
    );
  }
  stop() {
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
  clear() {
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
