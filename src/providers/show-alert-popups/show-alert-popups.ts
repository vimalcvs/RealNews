import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';


@Injectable()
export class ShowAlertPopupsProvider {

  constructor(public http: HttpClient,private alertCtrl: AlertController) {
    console.log('Hello ShowAlertPopupsProvider Provider');
  }

  _showIonicAlert(title:string,template:string):void{
    let alert = this.alertCtrl.create({
      title:title,
      subTitle: template,
      buttons: ['OK']
    });
    alert.present();
  }


}
