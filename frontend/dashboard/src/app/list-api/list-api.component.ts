import { Component, OnInit } from '@angular/core';
import {GetBackendUrlService} from "../services/get-backend-url.service";
import {ExecutionDetailsService} from "../services/execution-details.service";

@Component({
  selector: 'app-list-api',
  templateUrl: './list-api.component.html',
  styleUrls: ['./list-api.component.css']
})
export class ListApiComponent implements OnInit {

  validUrl: string = null;
  apiLink: string;
  constructor(private backendurlService: GetBackendUrlService,
              private execDetails: ExecutionDetailsService) { }

  ngOnInit() {
    if (this.backendurlService.isValidUrl()) {
      this.validUrl = "valid";
    }
    this.apiLink = this.execDetails.getSwaggerUi() + '/api/swagger-ui.html';
  }
}
