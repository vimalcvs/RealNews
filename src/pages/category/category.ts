import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';
import { VideoPage } from '../video/video';
import { ArticlePage } from '../article/article';
import { SubcatPage } from '../subcat/subcat';
import { SearchPage } from '../search/search';
import { FavPage } from '../fav/fav';
@IonicPage()
@Component({
  selector: 'page-category',
  templateUrl: 'category.html',
})
export class CategoryPage {
  page: number;
  category
  category1
  cat
  cat1
  catname
  cout
  cat2
  readyepisode: boolean = false;
  play
  tags1
  article2
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
  constructor(public navCtrl: NavController, private _http: ApiProvider, private _loading: LoadingController, private _toast: ToastController,
    public navParams: NavParams) {

    this.category = this.navParams.get("id");
    this.catname=this.navParams.get("name");
    console.log(this.catname)
    
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad Category Details');
    this.loadcategory();
    this.loadtags();
   
  }

  loadcategory() {
    let loader = this._loading.create({
      content: 'Loading News..',
      duration: 3000
    })
    loader.present();
    var _request = {
      CategoryPost: "CategoryPost",
      CatId: this.category
    }
    this._http.postrequest("GetData", _request).subscribe(data => {

      this.category1 = data;
      console.log(data);
      if (this.category1 == null) {
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
  loadtags() {
    var _request = {
      SubCategory: "SubCategory",
      CatId: this.category
    }
    this._http.postrequest("GetData", _request).subscribe(data => {
      this.tags1 = data;
      console.log(data);
      if (this.tags1 == "Blank") {

        this.readyepisode =false;
        
      }
      else {
        this.readyepisode = true;
      }

    })
  }
  article1(id1: string, id2: string) {
    this.navCtrl.push(ArticlePage, { id: id1, category_id: id2 })

  }
  playvideo(id1: string, id2: string) {
    this.navCtrl.push(VideoPage, { id: id1, category_id: id2 })
  }
  sub(id1:string,id2:string) {
    this.navCtrl.push(SubcatPage, { id: id1,name:id2 })
  
  }
  fav(){
    this.navCtrl.push(FavPage);
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
loadbolly(){
  var _request={
    BreakingNews:"BreakingNews"
  }
  this._http.postrequest('GetData',_request).subscribe(data=>{
    console.log(data)
    this.article2=data
  })
}

  // serach Articles
  
  searchvideos(){
  this.navCtrl.push(SearchPage);
  }
    doInfinite(infiniteScroll) {
    console.log('Begin async operation');
    /* this.loadbolly(); */
    setTimeout(() => {
     this.loadbolly();
    console.log('Async operation has ended');
    infiniteScroll.complete();
    }, 500);
    }
  doRefresh(refresher) {
    setTimeout(() => {
      this.loadcategory();
      this.loadtags();
      refresher.complete();
    }, 1000);
  }
}




