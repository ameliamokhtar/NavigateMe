// import { HttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Injectable } from '@angular/core';

@Injectable()
export class ServiceProvider {
  // apiUrl: any = "http://localhost/navigateme_backend"; //local
  // apiUrl: any  = "   https://62ec8b5f.ngrok.io/backend" //ngrok server
  apiUrl: any = "https://bbb87a39.ngrok.io/navigateme_backend" //ngrok server lan
  //apiUrl: any = "http://transientservitor.my/backend-navigateme"; //server
  headers = new Headers();
  constructor(public http: Http) {
  }


  public login(data) {
    let url = '{url}/login.php'
      .replace(/\{url\}/g, this.apiUrl)
    this.headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    let params = "email=" + data.email + "&password=" + data.password;
    return this.http.post(url, params, { headers: this.headers }).map((res: Response) => {
      return res.json();
    });
  }

  public signup(data) {
    let url = '{url}/signup.php'
      .replace(/\{url\}/g, this.apiUrl)
    this.headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    let params;
    if(data.role === 1){
      params = "username=" + data.username
      + "&password=" + data.password
      + "&fullname=" + data.fullname
      + "&role=" + data.role
      + "&prefix=" + data.prefix
      + "&position=" + data.position
      + "&location_id=" + data.location_id
      + "&phone_num=" + data.mobile
      + "&email=" + data.email;
    }else{
      params = "username=" + data.username
        + "&password=" + data.password
        + "&fullname=" + data.fullname
        + "&role=" + data.role
        + "&prefix=" + data.prefix
        + "&phone_num=" + data.mobile
        + "&email=" + data.email;
    }
    return this.http.post(url, params, { headers: this.headers }).map((res: Response) => {
      return res.json();
    });
  }

  public getFeedback(data) {
    let url = '{url}/sendFeedback.php'
      .replace(/\{url\}/g, this.apiUrl)
    this.headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    let params = "&fullname=" + data.fullname
      + "&email=" + data.email
      + "&userfeedback=" + data.userfeedback;
    return this.http.post(url, params, { headers: this.headers }).map((res: Response) => {
      return res.json();
    });
  }

  public getStaff() {
    let url = '{url}/getStaff.php'
      .replace(/\{url\}/g, this.apiUrl)
    this.headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    return this.http.get(url, { headers: this.headers }).map((res: Response) => {
      return res.json();
    });
  }


  public getOffice() {
    let url = '{url}/getOffice.php'
      .replace(/\{url\}/g, this.apiUrl)
    this.headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    return this.http.get(url, { headers: this.headers }).map((res: Response) => {
      return res.json();
    });
  }

  public updateProfileInfo(info) {
    let url = '{url}/editProfile.php'
      .replace(/\{url\}/g, this.apiUrl)
    this.headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    let params = "password=" + info.password
      + "&mobile=" + info.mobile
      + "&fullname=" + info.fullname
      + "&email=" + info.email;
    return this.http.post(url, params, { headers: this.headers }).map((res: Response) => {
      return res.json();
    });
  }


  public resetPassword(mail) {
    let url = '{url}/resetPassword.php'
      .replace(/\{url\}/g, this.apiUrl)
      let params = "mail=" + mail;
    this.headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    return this.http.post(url, params, { headers: this.headers });
  }
}