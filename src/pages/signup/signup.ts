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
  location:any= [] ;
  constructor(public service: ServiceProvider,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    public navCtrl: NavController,
    public navParams: NavParams,
    private fb: FormBuilder) {
    this.signupForm = fb.group({
      'email': [null, Validators.required],
      'fullname': [null, Validators.required],
      'password': [null, Validators.required],
      'phone_num': [null, Validators.required],
      'role': [null, Validators.required],
      'prefix': [null, Validators.required],
      'position': [null, Validators.required],
      'address': [null, Validators.required],
    });
    this.service.getOffice().subscribe(loc=>{
      this.location = loc.location;
    });
  }

  signup(signup) {
    console.log(signup);
    let signupData;
    let location_id ;
    this.location.forEach(loc=>{
      if(loc.address == signup.address){
        location_id = loc.location_id; 
      }
    })
    if(signup.role == 1){ //staff
    signupData = {
      'email': signup.email,
      'fullname': signup.fullname,
      'password': signup.password,
      'phone_num': signup.phone_num,
      'role': signup.role,
      'prefix': signup.prefix,
      'position': signup.position,
      'address': signup.address,
      'location_id':location_id
    };
  }else{ //student and guest
    signupData = {
      'email': signup.email,
      'fullname': signup.fullname,
      'password': signup.password,
      'phone_num': signup.phone_num,
      'role': signup.role,
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
