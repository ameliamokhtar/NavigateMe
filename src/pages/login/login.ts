import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SignupPage } from '../signup/signup';
import { MainPage } from '../main/main';
import { ToastController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  constructor(public loadingCtrl: LoadingController, public toastCtrl: ToastController, public navCtrl: NavController, public navParams: NavParams) {
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

  openMainPage() {
    this.navCtrl.push('MainPage');
    this.presentToast();
  }
 
  openSignUpPage() {
    this.navCtrl.push('SignupPage');
  }

 ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

}
