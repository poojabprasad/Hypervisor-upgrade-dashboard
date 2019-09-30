import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Platforms} from "../models/Platforms.model";

const httpOptions= {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class PlatformsService {
  url: string = window.location.protocol + '//' + window.location.hostname + ':10000';

  constructor(private http: HttpClient) { }

  addPlatform(platform: Platforms) {
    return this.http.post(this.url + '/api/v1/platforms/addplatform', platform);
  }

  getAllPlatforms() {
    return this.http.get(this.url + '/api/v1/platforms/listall');
  }

  getPlatformById(id: number) {
    return this.http.get(this.url + '/api/v1/platforms/' + id);
  }

  deletePlatform(id: number) {
    return this.http.delete(this.url + '/api/v1/platforms/deleteplatform/' + id);
  }

  editPlatform(platform: Platforms) {
    return this.http.post(this.url + '/api/v1/platforms/editplatform', platform);
  }
}
