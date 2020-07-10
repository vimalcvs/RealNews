import { Component } from '@angular/core';
import {IonicPage,NavController, NavParams, ToastController, Events, LoadingController } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';
import { ShowAlertPopupsProvider } from '../../providers/show-alert-popups/show-alert-popups';
import { LoginPage } from '../login/login';
@IonicPage()
@Component({
  selector: 'page-password',
  templateUrl: 'password.html',
})
export class PasswordPage {
  pw1
  regi = {
    old:'',
    password: '',
    repassword: ''
  }
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private toastCtrl: ToastController,
    public events: Events,
    private _http: ApiProvider,
    private _toast: ToastController,
    private _loading: LoadingController,
    public showAlert: ShowAlertPopupsProvider) {
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad PasswordPage');
  }changepass(regi) {
    if (regi.old == '' || regi.old == undefined) {
      this.showAlert._showIonicAlert('Error', 'Please enter Old Password')
      return
    }
    if (regi.password == '' || regi.password == undefined) {
      this.showAlert._showIonicAlert('Error', 'Please enter Password')
      return
    }

    if (regi.repeatpass == '' || regi.repeatpass == undefined) {
      this.showAlert._showIonicAlert('Error', 'Please repeat password')
      return
    }

    if (regi.repeatpass != regi.password) {
      this.showAlert._showIonicAlert('Error', 'Passwords dont match')
      return
    }
    let loader = this._loading.create({
      content: 'Saving Preferences..',
      duration: 2000
    })
    loader.present();
   
      var _request = {
        UserId: localStorage.getItem('userid'),
        curp:regi.old,
        newp: regi.password
        
      }
      this._http.postrequest("ChangePassword", _request).subscribe((data:any) => {
        console.log(data)
        this.pw1=data.msg
        console.log(this.pw1)
        if(this.pw1 == "Doesn't Match Your Old Password"){
        let toast = this._toast.create({
          message: 'You Enter Wrong Old Password',
          duration: 3000
        });
        toast.present();
        loader.dismiss();
      
      }else{
        let toast = this._toast.create({
          message: 'Your password has been changed',
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
