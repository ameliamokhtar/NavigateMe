import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { ServiceProvider } from '../../providers/service/service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-tab3',
  templateUrl: 'tab3.html',
})
export class Tab3Page {

  fullname: any;
  email: any;
  userfeedback: any;
  userfeedbackForm: FormGroup;
  
  constructor(public service:ServiceProvider,
              public loadingCtrl: LoadingController,
              public toastCtrl: ToastController,  
              public navCtrl: NavController, 
              public navParams: NavParams,
              private fb: FormBuilder) {
                this.setData();
                this.userfeedbackForm = fb.group({
                  'fullname': [null, Validators.required],
                  'email': [null, Validators.required],
                  'userfeedback': [null, Validators.required],
                });
  }

  setData(){
    this.fullname = sessionStorage.getItem('fullname')
    this.email = sessionStorage.getItem('email')
  }

  getFeedback(userfeedback) {
    console.log(userfeedback);
    let userfeedbackData = {'fullname':userfeedback.fullname,
                      'email':userfeedback.email,
                      'userfeedback':userfeedback.userfeedback,};
    this.service.getFeedback(userfeedbackData).subscribe(data=>{
      if(data.successful){
        this.presentToast(data.msg + "!");
      }else if(!data.successful){
        this.presentToast(data.error);
      }
    })
    
  }

  presentToast(message:any) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000
    });
    toast.present();
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad Tab3Page');
  }


}
