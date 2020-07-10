import { Component } from '@angular/core';
import {NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';
import { ArticlePage } from '../article/article';
import { VideoPage } from '../video/video';
import { FavPage } from '../fav/fav';
import { SearchPage } from '../search/search';

@Component({
  selector: 'page-subcat',
  templateUrl: 'subcat.html',
})
export class SubcatPage {
  subcat1
  subname
  cout
  sub1
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
  constructor(public navCtrl: NavController, private _http: ApiProvider, private _loading: LoadingController,private _toast: ToastController,
    public navParams: NavParams) {
      this.subcat1 = this.navParams.get("id");
      this.subname=this.navParams.get("name");
    console.log(this.subcat1)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SubcatPage');
    this.loadsubcategory();
   /*  this.loadcount() */
  }
  loadsubcategory(){
    let loader = this._loading.create({
      content: 'Breaking News..',
      duration: 3000
    })
    loader.present();
    var _request = {
      SubCategoryPost:"SubCategoryPost",
      SubCatId:this.subcat1
    }
    console.log(_request)
    this._http.postrequest("GetData", _request).subscribe((data:any) => {
      this.sub1 = data;
    /*   this.subname=data.name
      console.log(data);
      console.log(this.subname); */
   if(this.sub1 == null){
    let toast = this._toast.create({
      message: 'There are no Articles or Videos around !',
      duration: 3000
    });
    toast.present();
    loader.dismiss();
  }
  else {

    loader.dismiss();
 
  }
   
    })
    
  }
  fav(){
    this.navCtrl.push('FavPage');
  }

  //load Favourite Count
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


  // serach Articles
  
  searchvideos(){
  this.navCtrl.push(SearchPage);
  }

  article1(id1:string,id2:string){
    this.navCtrl.push(ArticlePage,{id:id1,category_id:id2})
   
  }
  playvideo(id1:string,id2:string){
    this.navCtrl.push(VideoPage,{id:id1,category_id:id2})
  }
  doRefresh(refresher) {
    setTimeout(() => {
      this.loadsubcategory();
      refresher.complete();
    }, 1000);
  }
}
