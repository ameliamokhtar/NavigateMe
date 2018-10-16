import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, ToastController } from 'ionic-angular';

import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { ServiceProvider } from '../../providers/service/service';
/**
 * Generated class for the ForgotPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-forgot',
  templateUrl: 'forgot.html',
})
export class ForgotPage {

  forgotForm: FormGroup;
  constructor(public alertCtrl: AlertController,
    public service: ServiceProvider,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    public navCtrl: NavController,
    public navParams: NavParams,
    private fb: FormBuilder) {
    this.forgotForm = fb.group({
      'email': [null, Validators.required]
    });
  }

  reset(forgotForm) {
    let alert = this.alertCtrl.create({
      title: 'Password reset',
      subTitle: 'We sent you an email with a link to reset your password. You can recover your profile by following the instruction in the email.',
      buttons: ['OK']
    });
    this.service.resetPassword(forgotForm.email).subscribe();
    alert.present();
    this.navCtrl.push('LoginPage')
  }
}
