import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { Tab1Page } from '../tab1/tab1';
import { CallNumber } from '@ionic-native/call-number';
import { SMS } from '@ionic-native/sms';
import { ToastController } from 'ionic-angular';
import { ServiceProvider } from '../../providers/service/service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoadingController } from 'ionic-angular';
//import { NavigatePage } from '../navigate/navigate';
//import Beacons from 'react-native-beacons-manager';
//import { EstimoteBeacons } from '@ionic-native/estimote-beacons';
import { Http } from '@angular/http';
import {MenuProvider} from '../../providers/menu/menu';


@IonicPage()
@Component({
  selector: 'page-tab4',
  templateUrl: 'tab4.html',
})
export class Tab4Page {
  fullname: any;
  password: any;
  role: any;
  mobile: any;
  email: any;
  position: any;
  address: any;
  locationid: any;
  locationname: any;
  myInput: any;
  NavigateMe: any;
  staff_information: any;
  location_information_offices: any = [];
  location_information_classrooms: any = [];
  location_information_facilities: any = [];
  items;
  search:any;
  data: any[];
  searchResult:any=[];

  constructor(public http: Http, private service: ServiceProvider, private toastCtrl: ToastController, public loadingCtrl: LoadingController,
    private sms: SMS, private callSvc: CallNumber, public alerCtrl: AlertController,
    public navCtrl: NavController, public navParams: NavParams) {
      console.log('Hello MenuProvider Provider');
      this.data = [];
      this.search = 'staffs';
  }

  presentToast(message: any) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000
    });
    toast.present();
  }

  call(mobile) {
    // let mobileToString = "'" + mobile + "'";
    this.callSvc.callNumber(mobile, true).then(() => {
      console.log('call worked');
    }).catch((err) => {
      alert(JSON.stringify(err))
    });
  }

  sendSMS(mobile) {
    // let mobileToString = "'" + mobile + "'";
    var options: {
      replaceLineBreaks: true,
      android: {
        intent: 'INTENT'
      }
    }
    this.sms.send(mobile, 'Message', options).then(() => {
      console.log('sms worked');
    }).catch((err) => {
      alert(JSON.stringify(err))
    });
  }

  doAlertOffices(office) {
    let alert = this.alerCtrl.create({
      title: 'Student Development & Campus Lifestyle',
      message: 'Level 1<br>+6(03) 21754000<br>',
      buttons: [{
        text: 'Back',
        handler: data => {
          console.log('Back clicked');
        }
      },
      {
        text: 'Navigate',
        handler: data => {
          console.log('Navigate clicked');
          this.navCtrl.push('NavigatePage');
          this.loadToastOffice();
        }
      }]
    });
    alert.present()
  }

  doAlertFaci() {
    let alert = this.alerCtrl.create({
      title: 'Student Development & Campus Lifestyle',
      message: 'Level 14<br>+6(03) 21754000<br>',
      buttons: [{
        text: 'Back',
        handler: data => {
          console.log('Back clicked');
        }
      },
      {
        text: 'Navigate',
        handler: data => {
          console.log('Navigate clicked');
          this.navCtrl.push('NavigatePage');
          this.loadToastOffice();
        }
      }]
    });
    alert.present()
  }

  doAlert(staff) {
    let alert = this.alerCtrl.create({
      title: staff.full_name,
      message: staff.address + '<br>' + staff.position + ' <br>'+staff.phone_num+'<br>'+staff.email,
      buttons: [{
        text: 'Back',
        handler: data => {
          console.log('Back clicked');
        }
      },
      {
        text: 'Navigate',
        handler: data => {
          console.log('Navigate clicked');
          this.navCtrl.push('NavigatePage');
          this.loadToastStaff();
        }
      }]
    });
    alert.present()
  }

  load() {
    this.navCtrl.push('MainPage');
  }

  NavigateStaff() {
    this.navCtrl.push('NavigatePage');
    this.loadToastStaff();
  }

  NavigateOffice() {
    this.navCtrl.push('NavigatePage');
    this.loadToastOffice();
  }

  loadToastStaff() {
    let loader = this.loadingCtrl.create({
      content: "Initiating navigation to Dr Mohd Nizam's office.",
      duration: 3000
    });
    loader.present();
  }


  loadToastOffice() {
    let loader = this.loadingCtrl.create({
      content: "Initiating navigation to SDCL office.",
      duration: 3000
    });
    loader.present();
  }

  textNum() {
    this.navCtrl.push('SmsPage');
  }

  ionViewDidLoad() {
    this.getStaffData();
    this.getOfficeData();
  }
  onInput(ev){
    this.searchResult = [];
    if(this.myInput && this.search === 'staffs'){
       this.staff_information.forEach(staff=>{
         if(staff.full_name.toLowerCase().indexOf(this.myInput.toLowerCase()) > -1){
           if(this.searchResult.indexOf(staff) === -1){
           this.searchResult.push(staff);
          }
         }
       })
    }else if(this.myInput && this.search === 'offices'){
      this.location_information_offices.forEach(office=>{
        if(office.location_name.toLowerCase().indexOf(this.myInput.toLowerCase()) > -1){
          if(this.searchResult.indexOf(office) === -1){
          this.searchResult.push(office);
         }
        }
      })
    }else if(this.myInput && this.search === 'classrooms'){
      this.location_information_classrooms.forEach(classroom=>{
        if(classroom.location_name.toLowerCase().indexOf(this.myInput.toLowerCase()) > -1){
          if(this.searchResult.indexOf(classroom) === -1){
          this.searchResult.push(classroom);
         }
        }
      })
    }else if(this.myInput && this.search === 'facilities'){
      this.location_information_facilities.forEach(facility=>{
        if(facility.location_name.toLowerCase().indexOf(this.myInput.toLowerCase()) > -1){
          if(this.searchResult.indexOf(facility) === -1){
          this.searchResult.push(facility);
         }
        }
      })
    }
  }

  staffInformation(){
    if(this.myInput){
      return this.searchResult
    }else{
      return this.staff_information;
    }
  }
  locationInformationOffices(){
    if(this.myInput){
      return this.searchResult
    }else{
      return this.location_information_offices;
    }
  }
  locationInformationClassrooms(){
    if(this.myInput){
      return this.searchResult
    }else{
      return this.location_information_classrooms;
    }
  }
  locationInformationFacilities(){
    if(this.myInput){
      return this.searchResult
    }else{
      return this.location_information_facilities;
    }
  }
  changeSegment(){
    this.myInput = "";
  }
  getOfficeData() {
    this.service.getOffice().subscribe(res => {
      if (res.successful) {
        if(res && res.location){
          res.location.forEach(loc=>{
            if(loc.location_type === '2'){
              this.location_information_offices.push(loc);
            }
            if(loc.location_type === '3'){
              this.location_information_classrooms.push(loc);
            }
            if(loc.location_type === '4'){
              this.location_information_facilities.push(loc);
            }
          })
        }
      }
    })
  }

  getStaffData() {
    this.data = [
    this.service.getStaff().subscribe(res => {
      if (res.successful) {
        this.staff_information = res.staffs;
      }
    })];
  }

  filter(kat){
    return this.data.filter(menu=>{
      return menu.kat.toLowerCase() === kat.toLowerCase();     
    });
  }

}
