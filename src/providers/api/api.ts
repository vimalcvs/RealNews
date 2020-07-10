import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError } from 'rxjs/operators';
import { ShowAlertPopupsProvider } from '../show-alert-popups/show-alert-popups';

@Injectable()
export class ApiProvider {
    url: string = "http://rajattripathi.cf/apeknews/public/index.php/api/"


  constructor(public http: HttpClient, private popup: ShowAlertPopupsProvider) {
    console.log('Hello ApiProvider Provider');
  }

  getrequest(controller: string) {
    return this.http.get(this.url + controller).pipe(
      catchError(this.handleError([]))
    );
  }


  jsonprequest(api: string) {
    return this.http.jsonp(api, 'callback').pipe(
      catchError(this.handleJsonpError([]))
    )
  }


  
  postrequest(controller: string, data: object) {
    // const httpOptions = {
    //   headers: new HttpHeaders({ 'Access-Control-Allow-Origin':'*' })
    // };
    return this.http.post(this.url + controller, data).pipe(
      catchError(this.handleError([]))
    );
  }

  private handleError<T>(result?: T) {
    return (error: any): Observable<T> => {
      this.popup._showIonicAlert('Please Check Your Intenet Connection ' + "", "")
      return of(result as T);
    };
  }

  private handleJsonpError<T>(result?: T) {
    return (error: any): Observable<T> => {
      //this.popup._showIonicAlert('Http Status: ' + error.status, error.message)
      return of(result as T);
    };
  }

}
