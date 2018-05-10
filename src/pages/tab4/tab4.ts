import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { Tab1Page } from '../tab1/tab1';
import { CallNumber } from '@ionic-native/call-number';
import { SMS } from '@ionic-native/sms';
//import { NavigatePage } from '../navigate/navigate';
//import Beacons from 'react-native-beacons-manager';
//import { EstimoteBeacons } from '@ionic-native/estimote-beacons';

@IonicPage()
@Component({
  selector: 'page-tab4',
  templateUrl: 'tab4.html',
})
export class Tab4Page {

  constructor(private sms: SMS, private callSvc: CallNumber, public alerCtrl: AlertController, public navCtrl: NavController, public navParams: NavParams) {
  }

  call() {
    this.callSvc.callNumber(`60133273816`, true).then(()=>{
      console.log('call worked');
    }).catch((err)=>{
      alert(JSON.stringify(err))
    });
}

sendSMS() {
  var options: {
    replaceLineBreaks: true,
    android: {
      intent: 'INTENT'
    }
  }
  this.sms.send(`60109389275`, 'Message', options).then(()=>{
    console.log('sms worked');
  }).catch((err)=>{
    alert(JSON.stringify(err))
  });
}

  doAlert() {
    let alert = this.alerCtrl.create({
      title: '<img src="assets/imgs/avatar-user-teacher-312a499a08079a12-512x512.png"> Dr Mohd Nizam B Husen',
      message: 'Room 1903, Level 19 <br> Head of Section Software Engineering <br> +6 019 223 8976 <br> nizam@unikl.edu.my',
      buttons: ['Back', 'Navigate']
    });
    alert.present()
  }

  load() {
    this.navCtrl.push('MainPage');
  }

  Navigate(){
    this.navCtrl.push('NavigatePage');
  }

  textNum(){
    this.navCtrl.push('SmsPage');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Tab4Page');
  }

}

