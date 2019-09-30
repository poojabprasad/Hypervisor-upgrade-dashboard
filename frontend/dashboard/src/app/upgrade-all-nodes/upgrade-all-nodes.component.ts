import { Component, OnInit } from '@angular/core';
import {UpgradeAllNodesService} from "../services/upgrade-all-nodes.service";
import {ExecDetails} from "../shared/exec.details";
import {error} from "@angular/compiler/src/util";
import {interval, Subscription } from "rxjs";
import {UpgradeStatusService} from "../services/upgrade-status.service";
import {ExecutionDetailsService} from "../services/execution-details.service";
import {GetBackendUrlService} from "../services/get-backend-url.service";

@Component({
  selector: 'app-upgrade-all-nodes',
  templateUrl: './upgrade-all-nodes.component.html',
  styleUrls: ['./upgrade-all-nodes.component.css']
})
export class UpgradeAllNodesComponent implements OnInit {
  public tailStream:string;
  public execdetails = null;
  public errorData = null;
  public subscription: Subscription;
  upgradeall:boolean = false;
  public userInput = true;
  public upgradeStatus;
  validUrl: string = null;

  constructor(private upgradeAllService: UpgradeAllNodesService,
              private upgradeStatusService: UpgradeStatusService,
              private exectionDetails: ExecutionDetailsService,
              private backendurlService: GetBackendUrlService) { }

  ngOnInit() {
    if (this.backendurlService.isValidUrl()) {
      this.validUrl = "valid";
    }
    this.tailStream = this.exectionDetails.getTailstreamPort();

    this.getExecDetails();
    this.getUpgradeStatus();
    const source = interval(10000);
    this.subscription = source.subscribe(value => this.getUpgradeStatus());
  }

  getExecDetails() {
    this.upgradeAllService.getExecDetails()
      .subscribe(data => {this.execdetails = data;
      },
        error1 => this.execdetails = null);
  }

  getUpgradeStatus() {
    this.upgradeStatusService.getCompleteUpgradeDetails()
      .subscribe(data => {this.upgradeStatus = data; console.log(data)},
        error => console.log(error));
  }

  startUpgrade() {
    //this.openConfirmationDialog();

    this.upgradeAllService.upgradeAll(this.upgradeall)
      .subscribe(data => {
          this.execdetails = data;
          this.errorData = null;
        },
          error => {this.errorData = error;
          window.alert('Exception happened during upgrade in ' + this.backendurlService.getPlatformName());
      });
  }

  pauseUpgrade() {
    //this.openConfirmationDialog();
    if (this.userInput) {
      this.upgradeAllService.pauseUpgrade()
        .subscribe();

      setTimeout(() => {
          this.getUpgradeStatus();
        },
        3000);
    }
  }

  resumeUpgrade() {
    this.upgradeAllService.resumeUpgrade()
      .subscribe();

    setTimeout(() => {
        this.upgradeStatus();
      },
      3000);
  }

  stopUpgrade() {
    //this.openConfirmationDialog();
    if (this.userInput) {
      this.upgradeAllService.stopUpgrade()
        .subscribe();

      setTimeout(() => {
          this.getUpgradeStatus();
        },
        3000);

      this.execdetails = null;
    }
  }

  toggleVisibility(e){
    this.upgradeall= e.target.checked;
    console.log(this.upgradeall);
  }
}
