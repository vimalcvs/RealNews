import { Component } from '@angular/core';
import { IonicPage,NavController, LoadingController, ToastController, Events } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';
import { VideoPage } from '../video/video';
import { ArticlePage } from '../article/article';
import { SearchPage } from '../search/search';
import { FavPage } from '../fav/fav';
import { AdMobFree, AdMobFreeBannerConfig,AdMobFreeInterstitialConfig,AdMobFreeRewardVideoConfig } from '@ionic-native/admob-free';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  video
  article2
  article3
  article4
  article6
  loggedin
  public pagingEnabled: boolean = true;
  article5
  article
  cout
  pet: string = "puppies";
  banners
  ready: boolean = false;
  private isOn: boolean = false;
getButtonText(): string {
  return `Switch ${ this.isOn ? 'Off' : 'On' }`;
}
setState(): void {
  this.isOn = !this.isOn;
}
toggleDetails() {
  this.isOn = !this.isOn;
}
  constructor(public navCtrl: NavController,private _loading:LoadingController,public events: Events,
    private _http:ApiProvider,private _toast:ToastController,private admobFree : AdMobFree) {
      events.publish('user:login');
  }
ionViewDidLoad(){
console.log("Home Page Loaded");
this.showBannerAd();
this.showInterstitialAds();
this.loadbanners();
this.loadbolly();
 this.loadsport();
 this.loadarticle();
  this.loadcount();
 
}
loadbanners() {
  let loader = this._loading.create({
    content: 'Loading Data!!..',
    duration: 10000
  })
  loader.present();
  var _request = {
    FeatureSlider:"FeatureSlider"
  }
  this._http.postrequest("GetData", _request).subscribe(data => {
    this.banners = data
    console.log(this.banners);
    if (this.banners == undefined) {
      let toast = this._toast.create({
        message: 'There are no banners around here? Hello!',
        duration: 3000
      });
      toast.present();
      loader.dismiss();
    }
    else {

      loader.dismiss();
      this.ready = true;
    }
  })

}
loadarticle(){
  var _request={
    FeaturePost:"FeaturePost"
  }
  this._http.postrequest('GetData',_request).subscribe(data=>{
    console.log(data)
    this.article=data
  
  })
}
loadbolly(){
  var _request={
    BreakingNews:"BreakingNews"
  }
  this._http.postrequest('GetData',_request).subscribe(data=>{
    console.log(data)
    this.article2=data
  })
}
loadsport(){
  var _request={
    LatestNews:"LatestNews"
  }
  this._http.postrequest('GetData',_request).subscribe(data=>{
    console.log(data)
    this.article3=data
  
  })
}
loadsport1(){
  var _request={
    LatestNews:"LatestNews"
  }
  this._http.postrequest('GetData',_request).subscribe(data=>{
    console.log(data)
    this.article6=data
  
  })
}


loadworld(){
  var _request={
    CategoryPost:"CategoryPost",
    CatId:"2"
  }
  this._http.postrequest('GetData',_request).subscribe(data=>{
    console.log(data)
    this.article5=data
  
  })
}
loadcount(){
  var _request={
    ReadingPostUserCount:"ReadingPostUserCount",
    UserId:localStorage.getItem('userid')
  }
  this._http.postrequest('InsertAll',_request).subscribe((data:any)=>{
    console.log(data)
    this.cout=data.Total
    console.log(this.cout)
  
  })
}
showBannerAd() {
  let bannerConfig: AdMobFreeBannerConfig = {
       
      autoShow: true,
      id: "Your AD ID"
  };
  this.admobFree.banner.config(bannerConfig);

  this.admobFree.banner.prepare().then(() => {
      // success
  }).catch(e => console.log(e));
}


showInterstitialAds(){
  let interstitialConfig: AdMobFreeInterstitialConfig = {
      // isTesting:true,
      autoShow: true,
      id: "Your AD ID"
  };
  this.admobFree.interstitial.config(interstitialConfig);
  this.admobFree.interstitial.prepare().then(() => {
  }).catch(e => console.log(e));
}
playvideo(id1:string,id2:string){
  this.navCtrl.push(VideoPage,{id:id1,category_id:id2})
}
article1(id1:string,id2:string){
  this.navCtrl.push(ArticlePage,{id:id1,category_id:id2})
 
}
searchvideos(){
  this.navCtrl.push(SearchPage);
  }
  doRefresh(refresher) {
    setTimeout(() => {
    this.loadarticle();
    this.loadbolly();
    this.loadbanners();
    this.loadsport();
    this.loadcount();
      refresher.complete();
    }, 2000);
  }
  fav(){
    this.navCtrl.push(FavPage);
  }


}