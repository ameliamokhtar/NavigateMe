import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { ServiceProvider } from '../../providers/service/service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  signupForm: FormGroup;
  constructor(public service: ServiceProvider,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    public navCtrl: NavController,
    public navParams: NavParams,
    private fb: FormBuilder) {
    this.signupForm = fb.group({
      'username': [null, Validators.required],
      'password': [null, Validators.required],
      'fullname': [null, Validators.required],
      'role': [null, Validators.required],
      'phone_num': [null, Validators.required],
      'prefix': [null, Validators.required],
      'email': [null, Validators.required],
      'position': [null, Validators.required],
      'location': [null, Validators.required],
      'address': [null, Validators.required],
    });
  }

  signup(signup) {
    console.log(signup);
    let signupData;
    if(signup.role === 1){
    signupData = {
      'username': signup.username,
      'password': signup.password,
      'fullname': signup.fullname,
      'position': signup.position,
      'location_id': signup.location,
      'role': signup.role,
      'prefix': signup.prefix,
      'phone_num': signup.phone_num,
      'email': signup.email
    };
  }else{
    signupData = {
      'username': signup.username,
      'password': signup.password,
      'fullname': signup.fullname,
      'role': signup.role,
      'prefix': signup.prefix,
      'phone_num': signup.phone_num,
      'email': signup.email
    };
  }
    this.service.signup(signupData).subscribe(data => {
      if (data.successful) {
        this.presentToast("Welcome " + data.msg + "!");
        this.navCtrl.push('LoginPage');
      } else if (!data.successful) {
        this.presentToast(data.error);
      }
    })

  }

  presentToast(message: any) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000
    });
    toast.present();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }

}
