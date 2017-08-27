import { Injectable } from '@angular/core';
import { ProcessHttpmsgProvider } from './../process-httpmsg/process-httpmsg';
import { baseURL } from './../../shared/baseurl';
import { Leader } from './../../shared/leader';
import { Observable } from 'rxjs/Observable';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/catch';

/*
  Generated class for the LeaderProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class LeaderProvider {

  constructor(public http: Http, 
    private processHttpmsgService : ProcessHttpmsgProvider) {
    console.log('Hello LeaderProvider Provider');
  }

  getLeaders(): Observable<Leader[]>{
    return this.http.get(baseURL+'leaders')
    .map(res=>{return this.processHttpmsgService.extractData(res)})
    .catch(error => {return this.processHttpmsgService.handleError(error)});
  }

  getLeader(id:number):Observable<Leader>{
    return this.http.get(baseURL+'leader/'+id)
    .map(res=>{return this.processHttpmsgService.extractData(res)})
    .catch(error => {return this.processHttpmsgService.handleError(error)});
  }

  getFeaturedLeader(): Observable<Leader>{
    return this.http.get(baseURL+'leaders?featured=true')
    .map(res=>{return this.processHttpmsgService.extractData(res)[0]})
    .catch(error => {return this.processHttpmsgService.handleError(error)});
  }

}
