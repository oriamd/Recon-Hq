import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {Constants} from "@app/Constants";


@Injectable({
  providedIn: 'root'
})

export class TargetService {

  url:string = Constants.serverHost + '/target';

  constructor(private httpClient : HttpClient) { }

  postTarget(target):Observable<any>{
    return this.httpClient.post(this.url,target);
  }

  getAllTargets():Observable<any>{
    return this.httpClient.get(this.url);
  }

  getTarget(id:string):Observable<any>{
    return this.httpClient.get(this.url + "/" + id);
  }

}
