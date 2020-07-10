import { Component } from '@angular/core';
import {IonicPage,NavController, NavParams, Events } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { PasswordPage } from '../password/password';
@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  myid
  contact1
  email
  lname
  date
  name
  constructor(public navCtrl: NavController, public events: Events, public navParams: NavParams) {
    events.publish('user:login');
  }

  ionViewDidLoad() {
    this.myid = localStorage.getItem('userid');
this.lname=localStorage.getItem('fname')
    this.email = localStorage.getItem('email');
    this.contact1 = localStorage.getItem('contact');
    this.name = localStorage.getItem('username')
    if (localStorage.getItem('userid') === undefined || localStorage.getItem('userid') === null) {
      this.navCtrl.setRoot('LoginPage');
    } else {

    

    }
  }

  password(){
  this.navCtrl.push('PasswordPage')
}

}
