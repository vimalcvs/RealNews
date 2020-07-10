import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, LoadingController, Events } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import {ArticlePage} from '../article/article'
import { VideoPage } from '../video/video';
import { ApiProvider } from '../../providers/api/api';

@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {
  identity
  Ihold
  meowname
  Iholdarticle
  banners
  pet: string = "puppies";
  isAndroid: boolean = false;
  constructor(public navParams: NavParams,public api: HttpClient,public navCtrl: NavController,private _loading:LoadingController,public events: Events,
    private _http:ApiProvider,private _toast:ToastController) {

    this.meowname=this.navParams.get('title');
    this.identity=this.meowname;
    
  }
  readarticle(id:string){
    this.navCtrl.push('ArticlePage', {
      videoid: id
  });
}

  ionViewDidLoad() {
    console.log('ionViewDidLoad CatvideosPage');

  }

  loadsearchart(searchval) {
  let loader = this._loading.create({
    content: 'seraching!..',
    duration: 3000
  })
  loader.present();
  var _request = {
    PostSearch:"PostSearch",
    Title:searchval
  }
  this._http.postrequest("GetData", _request).subscribe(data => {
    this.banners = data
    console.log(this.banners);
    if (this.banners == undefined) {
      let toast = this._toast.create({
        message: 'There are no seacrh!!',
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
playvideo(id1:string,id2:string){
  this.navCtrl.push(VideoPage,{id:id1,category_id:id2})
}
  article1(id1:string,id2:string){
    this.navCtrl.push(ArticlePage,{id:id1,category_id:id2})
   
  }
}
