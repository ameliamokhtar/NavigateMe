import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SignupPage } from '../signup/signup';
import { MainPage } from '../main/main';
import { ToastController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { ServiceProvider } from '../../providers/service/service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertController } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  loginForm: FormGroup;
  constructor(public alertCtrl: AlertController,
              public service:ServiceProvider, 
              public loadingCtrl: LoadingController, 
              public toastCtrl: ToastController, 
              public navCtrl: NavController, 
              public navParams: NavParams,
              private fb: FormBuilder) {
                this.loginForm = fb.group({
                  'email': [null, Validators.required],
                  'password': [null, Validators.required],
                });
  }

  login(login) {
    let loginData = {email:login.email,password:login.password};
    this.service.login(loginData).subscribe(data=>{
      if(data.successful){
        let loader = this.loadingCtrl.create({
          content: "Calculating location",
          duration: 3000
        });
        loader.present();
        this.navCtrl.push('MainPage');
        this.presentToast("Welcome "+data.full_name);
        sessionStorage.setItem('fullname',data.full_name)
        sessionStorage.setItem('password',data.password)
        if(data && data.role === 1)
        sessionStorage.setItem('role','Staff')
        else(data && data.role === 2)
        sessionStorage.setItem('role','Student')
        sessionStorage.setItem('mobile',data.phone_number)
        sessionStorage.setItem('email',data.email)
      }else if(!data.successful){
        this.presentToast(data.error);
      }
    })
    
  }

  forgotPassword() {
    let alert = this.alertCtrl.create({
      title: 'Password reset',
      subTitle: 'We sent you an email with a link to reset your password. You can recover your profile by following the instruction in the email.',
      buttons: ['OK']
    });
    alert.present();
  }

  presentToast(message:any) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000
    });
    toast.present();
  }
 
  home() {
    this.navCtrl.push('MainPage');
  }

  openSignUpPage() {
    this.navCtrl.push('SignupPage');
  }

 ionViewDidLoad() {
   if(sessionStorage.getItem('email')){
     this.navCtrl.push('MainPage');
   }
    console.log('ionViewDidLoad LoginPage');
  }

}
