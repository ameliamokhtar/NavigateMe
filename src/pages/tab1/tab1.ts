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
  floor:any;
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
    var onSuccess = function() {
      // alert("IndoorAtlas was successfully initialized");
    };

    // onError Callback receives a PositionError object
    function onError(error) {
      // alert("Code: " + error.code + "\n" + "Message: " + error.message);
    }

    IndoorAtlas.initialize(onSuccess, onError, {
      key: "85385ec6-8e0c-45e7-af01-776d25ae6801",
      secret:
        "eHE3bzJ4tzIjUES00puoyoZlSlZ1T74ENNxJuOxlk/U5x5tm7IQs7E923BrUUtmVx9s73YK8cwiBwlNSkyrqIg4sYtN3yILJuIsJSMQ0QjqLd0+xhjPebDsH8EWDKw=="
    });
    console.log(IndoorAtlas);

  }
  startLocating() {
    let lat = 0;
    let long = 0;
    let floor:any;
    let _this
    // onSuccess Callback
    //   This method accepts a `Position` object, which contains
    //   the current GPS coordinates
    function onSuccess(position) {
      lat = position.coords.latitude;
      long = position.coords.longitude;
      alert(
        "Latitude: " +
          position.coords.latitude +
          "\n" +
          "Longitude: " +
          position.coords.longitude
      );
    }

    // onError Callback receives a PositionError object
  
    // IndoorAtlas.watchPosition(onSuccess, onError, {
    //   timeout: 10000
    // });
    function successCallback(floorplan) {
      console.log(document.getElementById("map"));
      document.getElementById("map").setAttribute("src", floorplan.url);
    }
    function errorCallback(error) {
      console.log(error);
    }
    IndoorAtlas.fetchFloorPlanWithId("83789798-f42a-4b79-9b4e-d21759dc3656",
      successCallback,
      errorCallback,
      function(floorplan) {
       return floorplan;
        // Use route.legs to draw the route etc.
      }
    );
    console.log(IndoorAtlas)
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
          if (this.searchResult.indexOf(location) ==-1) {
            this.searchResult.push(location);
          }
        }
      });
    }
    if (this.searchResult.length ==0) {
      this.searchResult.push({ location_name: "Location Not Found" });
    }
  }
}
