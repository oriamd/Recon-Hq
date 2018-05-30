import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/Observable";

@Injectable({
  providedIn: 'root'
})

export class TargetService {

  url:string = 'http://localhost:3000/target';

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
