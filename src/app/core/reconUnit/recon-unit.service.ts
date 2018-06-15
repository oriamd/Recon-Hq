import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {Constants} from "@app/Constants";

@Injectable({
  providedIn: 'root'
})
export class ReconUnitService {

  url:string = Constants.serverHost + "/reconunit";

  constructor(private httpClient : HttpClient) { }

  getAllReconUnits():Observable<any>{
    return this.httpClient.get(this.url);
  }

  getReconUnit(id:string):Observable<any>{
    return this.httpClient.get(this.url + "/" + id);
  }
}
