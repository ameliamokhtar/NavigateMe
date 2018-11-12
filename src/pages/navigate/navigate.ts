import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ServiceProvider } from '../../providers/service/service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-navigate',
  templateUrl: 'navigate.html',
})
export class NavigatePage {
  fullname: any;
  navigateForm: FormGroup;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public service:ServiceProvider,
              public toastCtrl: ToastController,  
              private fb: FormBuilder) {
                this.setData();
                this.navigateForm = fb.group({
                  'fullname': [null, Validators.required],
                });
  }

  setData(){
    this.fullname = sessionStorage.getItem('fullname')
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NavigatePage');
  }

}
