import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HomePage } from '../pages/home/home';
import { ApiProvider } from '../providers/api/api';
import { LoginPage } from '../pages/login/login';
import { CategoryPage } from '../pages/category/category';
import { ProfilePage } from '../pages/profile/profile';
import { OneSignal } from '@ionic-native/onesignal';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  /* public backgroundImage = './assets/imgs/bg.jpg'; */
  rootPage: any = 'HomePage';
  name
  lname
  loggedin: Boolean = false;
  pages: Array<{title: string, component: any}>;
  category: Object | any[];

  constructor(public platform: Platform, public statusBar: StatusBar, public events: Events,
    public splashScreen: SplashScreen, private oneSignal: OneSignal,private _http:ApiProvider,
    private iab: InAppBrowser) {
    this.initializeApp();
    events.subscribe('user:login', () => {
      this.loggedIn();
    });
    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage }
    ];
    this.name=localStorage.getItem('username');
    this.lname=localStorage.getItem('lname')
    var _request = {
Category:"Category"
    }
    this._http.postrequest("GetData", _request).subscribe(data => {
      console.log(data)
      this.category = data;
    })

  }
  loggedIn() {
    console.log("logged in");
    if (localStorage.getItem('userid') === undefined || localStorage.getItem('userid') === null) {
      this.loggedin=false;
    } else {
      
      this.loggedin=true;
      //this.nav.setRoot(ClassRoomManagerPage)

    }
    }
  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.show();
      this.splashScreen.hide();
      this.oneSignal.startInit('62dd4b87-e1aa-40b8-b62a-6e7b68283261', '96106335417');
      this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.InAppAlert);
      this.oneSignal.handleNotificationReceived().subscribe(() => {
      });
      this.oneSignal.handleNotificationOpened().subscribe(() => {
      });

      this.oneSignal.endInit();
    });
   
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
  
  login(){
    if (localStorage.getItem('userid') === undefined || localStorage.getItem('userid') === null) {
      this.loggedin=false;
      this.nav.push('LoginPage')
    } else {
      this.loggedin=true;

    }
 
  }
  openCategoryPage(id1: string,id2:string) {
    this.nav.push('CategoryPage', { id: id1,name:id2 })
  }
  profile() {
    this.nav.push('ProfilePage')
  }
  logout() {
    this.loggedin = false;
    localStorage.clear();
    this.nav.setRoot('HomePage');

  }
 
 /* about(){
      
  const browser = this.iab.create("ur url");
browser.show();
}
contact(){

  const browser = this.iab.create("yr url");
browser.show(); */

}
