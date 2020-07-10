import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { Events } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';
import { ShowAlertPopupsProvider } from '../../providers/show-alert-popups/show-alert-popups';
import { SignupPage } from '../signup/signup';
import { ForgetPage } from '../forget/forget';
import { HomePage } from '../home/home';
@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  public backgroundImage = './assets/imgs/1.png';
  loggedin: Boolean = false;
  id1
  fname
  lname
  con1
  email1
  LoginDetails: any
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private toastCtrl: ToastController,
    public events: Events,
    private _http: ApiProvider,
    private _toast: ToastController,
    private _loading: LoadingController,
    public showAlert: ShowAlertPopupsProvider
  ) {
    events.publish('user:login');
  }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }
  ngAfterViewInit() {
    let tabs = document.querySelectorAll('.show-tabbar');
    if (tabs !== null) {
        Object.keys(tabs).map((key) => {
            tabs[key].style.display = 'none';
        });
    }
}

ionViewWillLeave() {
  let tabs = document.querySelectorAll('.show-tabbar');
  if (tabs !== null) {
      Object.keys(tabs).map((key) => {
          tabs[key].style.display = 'flex';
      });

  }

}

  dologin(username: string, password: string) {

    if (username == '' || username == undefined) {
      this.showAlert._showIonicAlert('Error', 'Please enter username')
      return
    }

    if (password == '' || password == undefined) {
      this.showAlert._showIonicAlert('Error', 'Please enter password')
      return
    }

    let loader = this._loading.create({
      content: 'Authenticating..',
      duration: 2000
    })
    loader.present();

    var _request = {
      Email: username,
      Password: password
    }
    this._http.postrequest("Login", _request).subscribe((data:any) => {
      this.LoginDetails = data.Data
      console.log(this.LoginDetails)
      console.log(data)
      if (this.LoginDetails == null) {
        let toast = this._toast.create({
          message: 'Your Credentials do not match or Your Wrong Username or Password',
          duration: 2000
        });
        toast.present();
        loader.dismiss();
      }
      else {
        this.fname=this.LoginDetails.username
        this.id1=this.LoginDetails.id
        this.email1=this.LoginDetails.email
        localStorage.setItem('fname', this.fname)
        localStorage.setItem('userid', this.id1)
        localStorage.setItem('email', this.email1)
        let toast = this._toast.create({
          message: 'Login Successfully',
          duration: 2000
        });
        toast.present();
        this.redirect()
        loader.dismiss();
    
      }
    })

  }

  redirect() {
    /* this.navCtrl.last().name */
   /*  this.navCtrl.push(this.navCtrl.getPrevious().name); */
    this.navCtrl.setRoot('HomePage')
  }

  gotosignup() {
    this.navCtrl.setRoot(SignupPage)
  }
  forget() {
    this.navCtrl.setRoot('ForgetPage')
  }




}
