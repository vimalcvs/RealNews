import { Component } from '@angular/core';
import {NavController, NavParams, LoadingController, ToastController, ActionSheetController } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';
import { VideoPage } from '../video/video';
import { ArticlePage } from '../article/article';
import { SearchPage } from '../search/search';

@Component({
  selector: 'page-fav',
  templateUrl: 'fav.html',
})
export class FavPage {
banner
content
loggedin
content1
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
  constructor(public navCtrl: NavController, public actionSheetCtrl: ActionSheetController,private _http: ApiProvider,private _toast: ToastController,private _loading: LoadingController,public navParams: NavParams) {
  }

  ionViewDidLoad() {
    if (localStorage.getItem('userid') === undefined || localStorage.getItem('userid') === null) {
      this.loggedin = false;
    } else {
      this.loggedin = true;
    } 
    console.log('ionViewDidLoad FavPage');
    this.loadfav();
  }
loadfav(){
  let loader = this._loading.create({
    content: 'Loading Your Reading List!!',
    duration: 2000
  })
  loader.present();
  var _request = {
    ReadingList:"ReadingList",
    UserId:localStorage.getItem('userid')
  }
  this._http.postrequest('GetData',_request).subscribe(data=>{
    console.log(data)
    this.banner=data
    if (this.banner == "Blank") {
      let toast = this._toast.create({
        message: 'There is no Post IN Your Added List!!',
        duration: 3000
      });
      toast.present();
      loader.dismiss();
    }
    else {

      loader.dismiss();
      
    }
  }
  )
}
playvideo(id1:string,id2:string){
  this.navCtrl.push(VideoPage,{id:id1,category_id:id2})
}
  article1(id1:string,id2:string){
    this.navCtrl.push(ArticlePage,{id:id1,category_id:id2})
   
  }
  presentActionSheet(RID, title) {
    const actionSheet = this.actionSheetCtrl.create({
      title: title,
      buttons: [
        {
          text: 'Remove',
          handler: () => {
            this.remove(RID);
            console.log('Remove clicked');
          }
        }, {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }
  remove(RID) {
    let loader = this._loading.create({
      content: 'Remove!!',
      duration: 2000
    })
    loader.present();
    var _request = {
      ReadingPostDelete:"ReadingPostDelete",
      UserId: localStorage.getItem('userid'),
      ReadingID: RID
    }
    this._http.postrequest('InsertAll', _request).subscribe((data:any) => {
      this.content1=data.msg
      console.log(data)
      if (this.content1 == "Remove Successfully") {
        let toast = this._toast.create({
          message: 'There are no Favourite around here!',
          duration: 1000
        });
        toast.present();
        this.loadfav();
      }
      else {
        console.log('not removed')
      }
    })
  }
   // serach Articles
  
 searchvideos(){
  this.navCtrl.push(SearchPage);
  }
  doRefresh(refresher) {
    setTimeout(() => {
    this.loadfav();
      refresher.complete();
    }, 1000);
  }
}
