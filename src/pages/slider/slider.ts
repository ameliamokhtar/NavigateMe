import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the SliderPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-slider',
  templateUrl: 'slider.html',
})
export class SliderPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  slides = [
    {
      title: "Welcome to NavigateMe!",
      description: "For <b>first timers</b>, please go through this sliders to ensure you have the best user experience with NavigateMe. <br> ",
      image: "assets/imgs/ica-slidebox-img-1.png",
    },
    {
      title: "Get started",
      description: "Please turn on your bluetooth for indoor positioning and navigation. Also, for navigation purpose, you need to have a stable Wi-Fi connection.",
      image: "assets/imgs/653-10113d0b50131a8905aa86e715013e7e.jpg",
    },
  ];

openLogin(){
  this.navCtrl.push('LoginPage');
}

  ionViewDidLoad() {
    console.log('ionViewDidLoad SliderPage');
  }

  henlo(){
    this.navCtrl.push('Login');
  }

}
