import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ApiProvider } from '../providers/api/api';
import { ShowAlertPopupsProvider } from '../providers/show-alert-popups/show-alert-popups';
import { HttpClientModule } from '@angular/common/http';
import {OneSignal} from '@ionic-native/onesignal';
import { SocialSharing } from '@ionic-native/social-sharing';
/* import {ProgressBarModule} from "angular-progress-bar" */
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { Network } from '@ionic-native/network/ngx';
import {FavPage} from '../pages/fav/fav';
import {VideoPage} from '../pages/video/video';
import {SubcatPage} from '../pages/subcat/subcat';
import {SignupPage} from '../pages/signup/signup';
import {SearchPage} from '../pages/search/search';
import {ArticlePage} from '../pages/article/article';
import { AdMobFree, AdMobFreeBannerConfig,AdMobFreeInterstitialConfig,AdMobFreeRewardVideoConfig } from '@ionic-native/admob-free';

@NgModule({
  declarations: [
    MyApp,FavPage,VideoPage,SubcatPage,SignupPage,SearchPage,ArticlePage
  ],
  imports: [
    BrowserModule,HttpClientModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,FavPage,VideoPage,SubcatPage,SignupPage,SearchPage,ArticlePage
  ],
  providers: [SocialSharing,
    StatusBar,Network,
    SplashScreen,OneSignal,InAppBrowser,AdMobFree,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ApiProvider,
    ShowAlertPopupsProvider
  ]
})
export class AppModule {}
