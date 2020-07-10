import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController, Events, LoadingController } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';
import { ShowAlertPopupsProvider } from '../../providers/show-alert-popups/show-alert-popups';
import { LoginPage } from '../login/login';
@IonicPage()
@Component({
  selector: 'page-forget',
  templateUrl: 'forget.html',
})
export class ForgetPage {
  pass
  msg1
  public backgroundImage = './assets/imgs/1.png';
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private toastCtrl: ToastController,
    public events: Events,
    private _http: ApiProvider,
    private _toast: ToastController,
    private _loading: LoadingController,
    public showAlert: ShowAlertPopupsProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ForgetPage');
  }
  forget(email){
  if (email == '' ) {
    this.showAlert._showIonicAlert('Error', 'Please enter Mail')
    return
  }

  let loader = this._loading.create({
    content: 'Authenticating..',
    duration: 3000
  })
  loader.present();

  var _request = {
    Email:email,
  }
  this._http.postrequest("ForgetPassword", _request).subscribe((data:any) => {
    this.pass = data.msg
    console.log(this.pass)
    if (this.pass == "This email doesn't exist in our database.") {
      let toast = this._toast.create({
        message: 'Your Credentials do not match or Your Wrong ',
        duration: 3000
      });
      toast.present();
      loader.dismiss();
    }
    else {
      let toast = this._toast.create({
        message: 'Link Sent Successfully',
        duration: 3000
      });
      toast.present();
      loader.dismiss();
    }
  })
}
login(){
  this.navCtrl.setRoot('LoginPage')
}
}
