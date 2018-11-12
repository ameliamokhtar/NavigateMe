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
  route:any = [];
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public service:ServiceProvider,
              public toastCtrl: ToastController,  
              private fb: FormBuilder) {
                this.setData();
                // this.navigateForm = fb.group({
                //   'fullname': [null, Validators.required],
                // });
  }

  setData(){
    let location = sessionStorage.getItem('location_id');
    this.service.getNavigation(location).subscribe(location=>{
      if(location.successful){
        this.route = location.route[0].coordinate.split(". ");
      }
    })
  }
  getRouteArrow(route){
    if(route.toString().toLocaleLowerCase().includes("straight")){
      return 1;
    }else if(route.toString().toLocaleLowerCase().includes("right")){
      return 2;
    }else if(route.toString().toLocaleLowerCase().includes("left")){
    return 3;
    }else{
      return 1;
    } 
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad NavigatePage');
  }

}
