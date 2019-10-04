import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class GetBackendUrlService {

  private currentPlatform = new BehaviorSubject(null);
  currentPlatformUrl = this.currentPlatform.asObservable();

  private url: string = null;
  private platformName: string;

  constructor() {
  }

  changePlatformUrl(url: string) {
    console.log('new platform is ' + url);
    this.url = url;
    this.currentPlatform.next(url);
  }

  changePlatformName(name: string) {
    this.platformName = name;
  }

  getPlatformName() {
    return this.platformName;
  }

  getUrl() {
    return 'http://' + this.currentPlatformUrl;
  }

  getUrlObservable(): Observable<string> {
    return this.currentPlatform.asObservable();
  }

  isValidUrl() {
    console.log('url is ' + this.url);
    if (this.url == null) {
      return false;
    }
    return true;
  }
}
