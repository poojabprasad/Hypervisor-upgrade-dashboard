import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {NodeDetails} from "../nodes/node.model";
import {Observable} from "rxjs";
import {GetBackendUrlService} from "./get-backend-url.service";

const httpOptions= {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class ManageNodeService {
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

  editNode(node: NodeDetails) {
    return this.http.post(this.url + '/api/v1/nodes/editnode', node);
  }

  deleteNode(id: number) {
    return this.http.get(this.url + '/api/v1/nodes/deletenode/' + id);
  }

  addNode(node: NodeDetails) {
    return this.http.post(this.url + '/api/v1/nodes/addnode', node);
  }
}
