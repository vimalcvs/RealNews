import { Component } from '@angular/core';
import {NavController, NavParams, ToastController, Events, LoadingController } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';
import { ShowAlertPopupsProvider } from '../../providers/show-alert-popups/show-alert-popups';
import { DomSanitizer } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { SocialSharing } from '@ionic-native/social-sharing';
import { LoginPage } from '../login/login';
import { VideoPage } from '../video/video';

@Component({
  selector: 'page-article',
  templateUrl: 'article.html',
})
export class ArticlePage {
  id4
  id5
  view
  comments
  article
  defaultInputBox: boolean = false;
  mylink
  sl
  title1
  title2
  img1
  loggedin
  imagemul
  title3
  banners1
  resp1
  num
  resp
  my_url
  havefav:boolean=false
  readyrelated: boolean = false
  related
  title4
  m1
  posted
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
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private toastCtrl: ToastController,
    public events: Events,
    private _http: ApiProvider,
    private _toast: ToastController, private socialSharing: SocialSharing,
    private _loading: LoadingController,
    public showAlert: ShowAlertPopupsProvider,
    private sanitize: DomSanitizer, public api: HttpClient) {
    this.id4 = this.navParams.get('id');
    this.id5 = this.navParams.get('category_id');
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ArticlePage')
    if (localStorage.getItem('userid') === undefined || localStorage.getItem('userid') === null) {
      this.loggedin = false;
    } else {
      this.loggedin = true;
    }
    this.loadArticle();
    this.loadcomments();
    this.loadbanners() ;
    this.hasfav();
    this.loadImg();
  }

  
  loadArticle() {
    var _request = {
      SinglePost:"SinglePost",
      PostId: this.id4,
     
    }
    this._http.postrequest("GetData", _request).subscribe(data => {
      this.article = data[0];
      console.log(data);
      this.mylink = this.article.image_slider;
      this.title1 = this.article.title;
      this.title2 = this.article.content;
      this.view=this.article.hit
      this.sl=this.article.title_slug
      this.title3 = this.article.LoggedEmail;
      this.title4 = this.article.created_at;
    
      this.urlpaste();
    })

  }
  loadImg(){
    var _request={
"PostSlider":"PostSlider",
	"POSTID":this.id4
    }
    this._http.postrequest('GetData',_request).subscribe(data=>{
      this.img1=data
      console.log(data)
      if(this.img1=="Blank"){
         this.imagemul = false;
      }else{
         this.imagemul = true;
      }
     
    })
  }
  urlpaste() {
    this.my_url = this.mylink;
    /* console.log('load video link' + this.my_url); */
    return this.sanitize.bypassSecurityTrustResourceUrl(this.my_url);
  }

//comment
  postcomments(posted: string) {
if(posted=='' || posted==undefined){
  this.showAlert._showIonicAlert('Error','Please Enter Comment')
}
    var _request = {
      PostId: this.id4,
      UserId: localStorage.getItem('userid'),
      Comment: posted,
      CommentInsert:"CommentInsert",
      Comments:"Comments"

    }
    return new Promise(resolve => {
      this.api.post('http://rajattripathi.cf/apeknews/public/index.php/api/InsertAll', _request,
        { responseType: 'text' }).subscribe(response => {
          resolve(response);
          this.resp = response;
          console.log(this.resp)
          if (response == 'failed') {
            let toast = this.toastCtrl.create({
              message: 'Failed to post Comment!',
              duration: 3000,
              position: 'top'
            });

            toast.onDidDismiss(() => {
              console.log('Dismissed toast');
            });

            toast.present();

          } else {

            let toast = this.toastCtrl.create({
              message: 'Your Comment has been Posted!',
              duration: 3000,
              position: 'top'
            });

            toast.onDidDismiss(() => {
              console.log('Dismissed toast');
            });

            toast.present();
            this.posted = '';
           


          }


        }, err => {
          console.log(err);
        });
    });
   
  }

//reply comment
postreply(CommentId,posted1: string) {
  if(posted1=='' || posted1==undefined){
    this.showAlert._showIonicAlert('Error','Please Enter Comment')
  }
      var _request = {
        PostId: this.id4,
        UserId: localStorage.getItem('userid'),
        ParentId:CommentId,
        ReplyComment:"ReplyComment",
        Comment:posted1,
        CommentInsert:"CommentInsert",
      }
      console.log(_request)
      return new Promise(resolve => {
        this.api.post('http://rajattripathi.cf/apeknews/public/index.php/api/InsertAll', _request,
          { responseType: 'text' }).subscribe(response => {
            resolve(response);
            this.resp1 = response;
            console.log(this.resp1)
            if (response == 'failed') {
              let toast = this.toastCtrl.create({
                message: 'Failed to post Comment!',
                duration: 3000,
                position: 'top'
              });
  
              toast.onDidDismiss(() => {
                console.log('Dismissed toast');
              });
  
              toast.present();
  
            } else {
  
              let toast = this.toastCtrl.create({
                message: 'Your Comment has been Posted!',
                duration: 3000,
                position: 'top'
              });
  
              toast.onDidDismiss(() => {
                console.log('Dismissed toast');
              });
  
              toast.present();
              this.posted = '';
             
  
  
            }
  
  
          }, err => {
            console.log(err);
          });
      });
     
    }

//reply finished



  showInputBox(){
    this.defaultInputBox = true;
  }
  loadcomments() {
    let loader = this._loading.create({
      content: 'Loading News!!',
      duration: 2000
    })

    loader.present();
    var _request = {
      PostID: this.id4,
      CommentDisplay:"CommentDisplay"
    }
    this._http.postrequest("GetData", _request).subscribe(data => {
      console.log(data)
      this.comments = data;
      if (this.comments == "Blank") {
        let toast = this._toast.create({
          message: 'No Comments',
          duration: 3000
        });
        console.log('comments' + this.comments);
        toast.present();
        loader.dismiss();
      }
      else {
        console.log('comments' + this.comments);
        loader.dismiss();


      }
    })

  }


  doRefresh(refresher) {
    setTimeout(() => {
  this.loadbanners();
      refresher.complete();
    }, 2000);

  }
  shareInfo() {
    this.socialSharing.share("Real News", "Article", "http://rajattripathi.cf/"+this.mylink,"http://rajattripathi.cf/"+this.sl
     ).
      then(() => {
        alert("Sharing success");
        // Success!
      }).catch(() => {
        // Error!
        alert("Share failed");
      });
  }
  loadbanners() {
   
    var _request = {
      "RelatedPost":"RelatedPost",
      PostId:this.id4,
      CatId:this.id5
    }
    this._http.postrequest("GetData ", _request).subscribe(data => {
      this.banners1 = data
      console.log(this.banners1);
      if (this.banners1 == undefined) {
        let toast = this._toast.create({
          message: 'There are no Article ',
          duration: 3000
        });
        toast.present();
     
      }
      else {

      }
    })

  }

  login(){
    this.navCtrl.push('LoginPage')
  }
  adfav(){
    var _request = {
      ReadingPost:"ReadingPost",
      PostId:this.id4,
      UserId:localStorage.getItem('userid')
    }
    console.log(_request)
    this._http.postrequest("InsertAll", _request).subscribe((data:any) => {
      console.log(data)
     /*  data[0].count */
     this.m1=data.msg
     console.log(this.m1)
      if (this.m1 == 'Reading Added Successfully') {
        let toast = this._toast.create({
          message: 'Video added to your favourite!',
          duration: 3000
        });
        toast.present(); 
        this.havefav=true; 
     
      }else if(this.m1=="You Have Already Added This Post"){
        let toast = this._toast.create({
          message: 'Content Already In Your Favorite List!',
          duration: 3000
        });
        toast.present();
      }
      else {
        if(this.m1=="Please Login"){
          let toast = this._toast.create({
            message: 'Please Login To Add Reading List!!',
            duration: 4000
          });
          toast.present();
        console.log(' Added failed');
         
      }
    }
    })
  }
  hasfav(){
    var _request = {
      ReadingPostCount:"ReadingPostCount",
      PostId:this.id4,
      UserId:localStorage.getItem('userid')
    }
    console.log(_request)
    this._http.postrequest("InsertAll", _request).subscribe((data:any) => {
      console.log(data)
     this.num=data.Total
     console.log(this.num)
      if (this.num > 0) {
        this.havefav=true; 
        console.log('has Added success');
       }
       else {
         console.log('has Added failed');
         }
    })
  }
  article1(id1: string, id2: string) {
    this.navCtrl.push(ArticlePage, { id: id1, category_id: id2 })

  }
  playvideo(id1: string, id2: string) {
    this.navCtrl.push(VideoPage, { id: id1, category_id: id2 })
  }
}
