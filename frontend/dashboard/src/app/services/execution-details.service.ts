import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {GetBackendUrlService} from "./get-backend-url.service";
import {Observable} from "rxjs";

const httpOptions= {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class ExecutionDetailsService {
  urlObservable: Observable<string>;
  url: string = null;

  constructor(private http: HttpClient,
              private backendUrl: GetBackendUrlService) {
    this.urlObservable = this.backendUrl.getUrlObservable();
    this.urlObservable.subscribe(
      (newUrl) => {
        if (newUrl != null) {
          this.url = window.location.protocol + '//' + newUrl;
        }
      });
  }

  getExecutionDetails() {
    return this.http.get(this.url + '/api/v1/execdetails/listall');
  }

  getTailstreamPort() {
    var re = /(\d+)$/;
       if (this.url != null) {
            var newUrl = this.url.replace(re, "10001");
            return newUrl;
       }
    }

  getSwaggerUi() {
    return this.url;
  }
}
