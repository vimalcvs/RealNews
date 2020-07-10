import { Component } from '@angular/core';
import { NavController, NavParams,LoadingController, AlertController } from 'ionic-angular';
import {LoginPage} from '../login/login'
import { ApiProvider } from '../../providers/api/api';
import { ShowAlertPopupsProvider } from '../../providers/show-alert-popups/show-alert-popups';
import { ToastController } from 'ionic-angular';
import { Events } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
  public backgroundImage = './assets/imgs/1.png';
signupdetails
Ihold
msg1
users = {
  "Email": '',
  "Username": '',
  "Password  ": '', 
}
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private toastCtrl: ToastController,
    public events: Events,
    private _http: ApiProvider,
    private _toast: ToastController,
    private _loading: LoadingController,private apiProvider:ApiProvider,
    public showAlert: ShowAlertPopupsProvider,public api: HttpClient,private alertCtrl: AlertController
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }

  registerUser(username: string, password: string,email:string) {

    if (username == '' || username == undefined) {
      this.showAlert._showIonicAlert('Error', 'Please enter username')
      return
    }

    if (password == '' || password == undefined) {
      this.showAlert._showIonicAlert('Error', 'Please enter password')
      return
    }

    if (email == '' || email == undefined) {
      this.showAlert._showIonicAlert('Error', 'Please enter email')
      return
    }
    let loader = this._loading.create({
      content: 'Please Wait..',
      duration: 2000
    })
    loader.present();

    var _request = {
      Email:password,
      Password:email,
      Username:username,
      Signup:"Signup"
    }
    console.log(_request)
    this._http.postrequest("InsertAll", _request).subscribe((data:any) => {
      console.log(data)
      this.msg1=data.msg
      console.log(this.msg1)
      if(this.msg1=="Registered Successfully"){
        let alert = this.alertCtrl.create({
          title: 'Congratulations!',
          subTitle: 'You are now a member',
          buttons: ['Okay!']
        });
        alert.present();
        this.navCtrl.push('LoginPage');
  
      }
      else{
        let alert = this.alertCtrl.create({
          title: 'Opps!!',
          subTitle: 'Something Went Wrong',
          buttons: ['Okay!']
        });
        alert.present();
      }
    })

  }

  redirect() {
    this.navCtrl.setRoot('LoginPage')
  }

 gotologin() {
    this.navCtrl.setRoot('LoginPage')
  }
}
