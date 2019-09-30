import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable, of} from "rxjs";
import {NodeDetails} from "../nodes/node.model";
import {GetBackendUrlService} from "./get-backend-url.service";

const httpOptions= {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class NodeDetailsService {
  url: string = null;
  urlObservable: Observable<string>;

  constructor(private  http:HttpClient,
              private backendUrl: GetBackendUrlService) {
    this.urlObservable = this.backendUrl.getUrlObservable();
    this.urlObservable.subscribe(
      (newUrl) => {
        if (newUrl !== null) {
          this.url = window.location.protocol + '//' + newUrl;
        }
      console.log('new url is ' + this.url);
    });
  }

  getNodeDetails() {
    return this.http.get(this.url + '/api/v1/nodes/listall');
  }

  getNode(id: number)  {
    return this.http.get(this.url + '/api/v1/nodes/listnodebyid/' + id);
  }

  startUpgrade(id: number) {
    return this.http.get(this.url + '/api/v1/script/upgradeone/' + id);
  }

  pauseUpgrade(id: number) {
    return this.http.get(this.url + '/api/v1/script/pause/' + id);
  }

  resumeUpgrade(id: number) {
    return this.http.get(this.url + '/api/v1/script/resume/' + id);
  }

  stopUpgrade(id: number) {
    return this.http.get(this.url + '/api/v1/script/stop/node/' + id);
  }

  addNode(node: NodeDetails) {
    return this.http.post(this.url + '/api/v1/nodes/addnode', node);
  }

  upgradeOneNode(nodes: string) {
    return this.http.get(this.url + '/api/v1/script/updateone/' + nodes);
  }

  pause() {
    return this.http.get(this.url + '/api/v1/script/pause');
  }

  resume() {
    return this.http.get(this.url + '/api/v1/script/resume');
  }

  stop() {
    return this.http.get(this.url + '/api/v1/script/stop');
  }
}
