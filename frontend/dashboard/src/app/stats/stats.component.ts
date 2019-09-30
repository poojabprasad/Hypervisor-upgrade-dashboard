import { Component, OnInit } from '@angular/core';
import {StatsService} from "../services/stats.service";
import {NodeDetails} from "../nodes/node.model";
import { interval, Subscription } from "rxjs";
import {ExecutionDetailsService} from "../services/execution-details.service";
import {GetBackendUrlService} from "../services/get-backend-url.service";

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent implements OnInit {
  public tailStream;
  public counters;
  public execDetails;
  public upgradeStatus;
  public nodes;

  failedNodes: string[];
  completedNodes: string[];
  inProgressNodes: string[];
  pendingNodes: string[];

  public subscription: Subscription;
  validUrl: string = null;
  constructor(private statsService: StatsService,
              private executionDetails: ExecutionDetailsService,
              private backendurlService: GetBackendUrlService) { }

  ngOnInit() {
    if (this.backendurlService.isValidUrl()) {
      this.validUrl = "valid";
    }
    this.getStats();
    const source = interval(10000);
    this.subscription = source.subscribe(value => this.getStats());
    this.tailStream = this.executionDetails.getTailstreamPort();
  }

  getStats() {
    this.statsService.getstats()
      .subscribe(data => {this.counters = data; console.log(data)});

    this.statsService.getUpgradeStatus()
      .subscribe(data => {this.upgradeStatus = data; console.log(data)});

    this.statsService.getExecDetails()
      .subscribe(data => {this.execDetails = data; console.log(data)});

    this.statsService.getNodes()
      .subscribe(data => {this.nodes = data; console.log(data)});

  }

}
