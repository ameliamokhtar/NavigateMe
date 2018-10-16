import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { MyApp } from './app.component';
import { AuthServiceProvider } from '../providers/auth-service/auth-service';
import { HttpModule } from '@angular/http';
import { CallNumber } from '@ionic-native/call-number';
import { SMS } from '@ionic-native/sms';
import { ServiceProvider } from '../providers/service/service';
import { EstimoteBeacons } from '@ionic-native/estimote-beacons';
//import { AuthService } from '../providers/auth-service';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Transfer, FileUploadOptions, TransferObject } from '@ionic-native/transfer';
import { BeaconProvider } from '../providers/beacon/beacon-provider';
@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule, HttpModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    StatusBar,
    SplashScreen,
    CallNumber,
    SMS,
    Transfer,
    Camera,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    EstimoteBeacons,
    //AuthService,
    ServiceProvider,
    AuthServiceProvider,
    BeaconProvider
  ]
})
export class AppModule {}
