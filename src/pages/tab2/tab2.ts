import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { LoadingController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { ServiceProvider } from '../../providers/service/service';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Transfer, FileUploadOptions, TransferObject } from '@ionic-native/transfer';

@IonicPage()
@Component({
  selector: 'page-tab2',
  templateUrl: 'tab2.html',
})
export class Tab2Page {
  fullname: any;
  password: any;
  role: any;
  mobile: any;
  email: any;
  address: any;
  position: any;
  prefix: any;

  constructor(private transfer: Transfer, private camera: Camera, public service: ServiceProvider, public toastCtrl: ToastController, public loadingCtrl: LoadingController, public alertCtrl: AlertController, public navCtrl: NavController, public navParams: NavParams) {
    this.setData();
  }

  
  editProfile() {
    let prompt = this.alertCtrl.create({
      title: 'Edit profile',

      inputs: [
        {
          name: 'fullname',
          value: this.fullname
        },
        {
          name: 'password',
          value: this.password,
          type: 'password'
        },
        {
          name: 'role',
          value: this.role
        },
        {
          name: 'address',
          value: this.address
        },
        {
          name: 'prefix',
          value: this.prefix
        },
        {
          name: 'position',
          value: this.position
        },
        {
          name: 'mobile',
          value: this.mobile
        },
        {
          name: 'email',
          value: this.email
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
            this.save(data);
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
    this.presentToast('Changes saved');
  }

  presentToast(message) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000
    });
    toast.present();
  }

  logout() {
    this.navCtrl.push(LoginPage);
  }
  setData() {
    this.fullname = sessionStorage.getItem('fullname')
    this.password = sessionStorage.getItem('password')
    this.role = sessionStorage.getItem('role')
    this.mobile = sessionStorage.getItem('mobile')
    this.email = sessionStorage.getItem('email')
    this.address = sessionStorage.getItem('address')
    this.prefix = sessionStorage.getItem('prefix')
    this.position = sessionStorage.getItem('position')

  }
  save(info) {
    this.service.updateProfileInfo(info).subscribe(res => {
      if (res && res.successful) {
        sessionStorage.setItem('fullname', res.full_name)
        sessionStorage.setItem('password', res.password)
        if (res && res.role === 1)
          sessionStorage.setItem('role', 'Staff')
        else if (res && res.role === 2)
        sessionStorage.setItem('role', 'Student')
        else if (res && res.role === 2)
        sessionStorage.setItem('role', 'Guest')
        sessionStorage.setItem('mobile', res.phone_number)
        sessionStorage.setItem('email', res.email)
        sessionStorage.setItem('address', res.address)
        this.setData();
        this.presentToast(res.message)
      } else {
        this.presentToast(res.error)
      }
    })
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad Tab2Page');
  }

}
