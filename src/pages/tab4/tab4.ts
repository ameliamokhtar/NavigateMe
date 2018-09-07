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

  NavigateMe: any;
  staff_information: any;
  location_information_offices: any = [];
  location_information_classrooms: any = [];
  location_information_facilities: any = [];
  items;

  constructor(public http: Http, private service: ServiceProvider, private toastCtrl: ToastController, public loadingCtrl: LoadingController,
    private sms: SMS, private callSvc: CallNumber, public alerCtrl: AlertController,
    public navCtrl: NavController, public navParams: NavParams) {

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
      title: '<img src="assets/imgs/avatar-user-business-man-399587fe24739d5a-512x512.png"> '+staff.full_name,
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
    this.service.getStaff().subscribe(res => {
      if (res.successful) {
        this.staff_information = res.staffs;
      }
    })
  }

}
