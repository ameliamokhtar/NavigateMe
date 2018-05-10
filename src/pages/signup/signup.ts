import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  constructor(public toastCtrl: ToastController, public loadingCtrl: LoadingController, public navCtrl: NavController, public navParams: NavParams) {
  }

  load() {
    let loader = this.loadingCtrl.create({
      content: "Calculating location",
      duration: 3000
    });
    loader.present();
    this.navCtrl.push('MainPage');
    this.presentToast();
  }

  presentToast() {
    let toast = this.toastCtrl.create({
      message: 'Welcome, Amelia',
      duration: 3000
    });
    toast.present();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }

}
