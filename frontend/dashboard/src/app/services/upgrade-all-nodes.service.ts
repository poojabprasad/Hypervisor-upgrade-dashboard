import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {GetBackendUrlService} from "./get-backend-url.service";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UpgradeAllNodesService {
  url: string;
  urlObservable: Observable<string>;

  constructor(private http: HttpClient,
              private backendUrl: GetBackendUrlService) {
    this.urlObservable = this.backendUrl.getUrlObservable();
    this.urlObservable.subscribe(
      (newUrl) => { this.url = window.location.protocol + '//' + newUrl;
        console.log('new url is ' + this.url);
      });
  }

  upgradeAll(upgradeall: boolean) {
    return this.http.get(this.url + '/api/v1/script/upgradeall/' + upgradeall);
  }

  getExecDetails() {
    console.log('url is ' + this.url);
    return this.http.get(this.url + '/api/v1/execdetails/listall');
  }

  pauseUpgrade() {
    return this.http.get(this.url + '/api/v1/script/pause');
  }

  resumeUpgrade() {
    return this.http.get(this.url + '/api/v1/script/resume');
  }

  stopUpgrade() {
    return this.http.get(this.url + '/api/v1/script/stop');
  }
}
