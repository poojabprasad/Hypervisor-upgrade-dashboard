import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {GetBackendUrlService} from "./get-backend-url.service";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class StatsService {
  url: string;
  urlObservable: Observable<string>;

  constructor(private http:HttpClient,
              private backendUrl: GetBackendUrlService) {
    this.urlObservable = this.backendUrl.getUrlObservable();
    this.urlObservable.subscribe(
      (newUrl) => { this.url = window.location.protocol + '//' + newUrl;
        console.log('new url is ' + this.url);
      });
  }

  getstats() {
    console.log('url is ' + this.url);
    return this.http.get(this.url + '/api/v1/stats/stats');
  }

  getUpgradeStatus() {
    return this.http.get(this.url + '/api/v1/stats/upgradestatus');
  }

  getExecDetails() {
    return this.http.get(this.url + '/api/v1/stats/execdetails');
  }

  getNodes() {
    return this.http.get(this.url + '/api/v1/stats/nodes');
  }
}
