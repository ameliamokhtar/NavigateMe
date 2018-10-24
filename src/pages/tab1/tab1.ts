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
  floor: any;
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
    let floor: any;
    let _this;
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

    function successCallback(floorplan) {
      console.log(floorplan);
      document.getElementById("map").setAttribute("src", floorplan.url);
    }
    function errorCallback(error) {
      console.log(error);
    }
    IndoorAtlas.fetchFloorPlanWithId(
      "83789798-f42a-4b79-9b4e-d21759dc3656",
      successCallback,
      errorCallback,
      function(floorplan) {}
    );
    console.log(IndoorAtlas);
    var destination = { latitude: 60.16, longitude: 24.95, floor: 2 };

    IndoorAtlas.buildWayfinder({
      nodes: [
        {
          latitude: 3.1592267115380066,
          longitude: 101.70147310942413,
          floor: 0
        },
        {
          latitude: 3.1593244633765565,
          longitude: 101.70134335756303,
          floor: 0
        },
        {
          latitude: 3.159296342985594,
          longitude: 101.70132223516705,
          floor: 0
        },
        {
          latitude: 3.1593023661683626,
          longitude: 101.70145637704992,
          floor: 0
        },
        {
          latitude: 3.1592635332464734,
          longitude: 101.70142351998949,
          floor: 0
        },
        { latitude: 3.15936931947853, longitude: 101.70128069235945, floor: 0 },
        { latitude: 3.15938538827235, longitude: 101.70129276230003, floor: 0 },
        {
          latitude: 3.1594007875328454,
          longitude: 101.7012350948062,
          floor: 0
        },
        {
          latitude: 3.1593914140699546,
          longitude: 101.7012277187314,
          floor: 0
        },
        {
          latitude: 3.1594168563261436,
          longitude: 101.70121296658182,
          floor: 0
        },
        {
          latitude: 3.1594422985817223,
          longitude: 101.70123174204491,
          floor: 0
        },
        {
          latitude: 3.1594684103696835,
          longitude: 101.70125319971703,
          floor: 0
        },
        {
          latitude: 3.159491844024996,
          longitude: 101.70125856413509,
          floor: 0
        },
        {
          latitude: 3.1593907445368847,
          longitude: 101.70119620277546,
          floor: 0
        },
        {
          latitude: 3.1593800320077645,
          longitude: 101.70118748559618,
          floor: 0
        },
        {
          latitude: 3.159378023408542,
          longitude: 101.70117072178984,
          floor: 0
        },
        {
          latitude: 3.159356598349933,
          longitude: 101.70115596964025,
          floor: 0
        },
        { latitude: 3.159435603251366, longitude: 101.7011888267007, floor: 0 },
        {
          latitude: 3.1594489939120405,
          longitude: 101.70117072178984,
          floor: 0
        },
        {
          latitude: 3.1594623845725116,
          longitude: 101.70114926411772,
          floor: 0
        }
      ],
      edges: [
        { begin: 0, end: 4 },
        { begin: 1, end: 2 },
        { begin: 4, end: 1 },
        { begin: 1, end: 5 },
        { begin: 3, end: 4 },
        { begin: 6, end: 5 },
        { begin: 5, end: 7 },
        { begin: 8, end: 7 },
        { begin: 7, end: 9 },
        { begin: 10, end: 9 },
        { begin: 13, end: 9 },
        { begin: 9, end: 17 },
        { begin: 11, end: 10 },
        { begin: 12, end: 11 },
        { begin: 14, end: 13 },
        { begin: 15, end: 14 },
        { begin: 16, end: 15 },
        { begin: 17, end: 18 },
        { begin: 18, end: 19 }
      ]
    });
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
