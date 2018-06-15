import { Injectable } from '@angular/core';
import {Observable} from "rxjs/Observable";
import {HttpClient} from "@angular/common/http";
import {Constants} from "@app/Constants";

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  url:string = Constants.serverHost + "/message";
  constructor(private httpClient : HttpClient) { }

  postMessage(message):Observable<any>{
    return this.httpClient.post(this.url,message);
  }

}
