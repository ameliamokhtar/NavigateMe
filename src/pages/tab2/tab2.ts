import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { LoadingController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-tab2',
  templateUrl: 'tab2.html',
})
export class Tab2Page {

  constructor(public toastCtrl: ToastController, public loadingCtrl: LoadingController, public alertCtrl: AlertController, public navCtrl: NavController, public navParams: NavParams) {
  }

  editProfile() {
    let prompt = this.alertCtrl.create({
      title: 'Edit profile',

      inputs: [
        {
          name: 'name',
          placeholder: 'Amelia Mokhtar'
        },
        {
          name: 'password',
          placeholder: '********'
        },
        {
          name: 'mobilenumber',
          placeholder: '+6 010 938 9275'
        },
        {
          name: 'email',
          placeholder: 'ameliamokhtar96@gmail.com'
        },
      ],
      
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: data => {
            console.log('Save clicked');
            this.presentLoading();
          }
        }
      ]
    });
    prompt.present();
  }

  presentLoading() {
    let loader = this.loadingCtrl.create({
      content: "Saving changes",
      duration: 500
    });
    loader.present();
    this.presentToast();
  }

  presentToast() {
    let toast = this.toastCtrl.create({
      message: 'Changes saved',
      duration: 3000
    });
    toast.present();
  }

  logout(){
    this.navCtrl.push(LoginPage);
}

  ionViewDidLoad() {
    console.log('ionViewDidLoad Tab2Page');
  }

}
