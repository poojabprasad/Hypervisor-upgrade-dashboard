import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NodeDetailsService} from "../services/node-details.service";
import {Router} from "@angular/router";
import {ExecutionDetailsService} from "../services/execution-details.service";
import {NodeDetails} from "../nodes/node.model";
import {GetBackendUrlService} from "../services/get-backend-url.service";

@Component({
  selector: 'app-upgrade-one-node',
  templateUrl: './upgrade-one-node.component.html',
  styleUrls: ['./upgrade-one-node.component.css']
})
export class UpgradeOneNodeComponent implements OnInit {
  tailStream: string;
  upgradeForm: FormGroup;
  public execDetails = null;
  validMessage:any = null;

  constructor(private nodeDetailsService: NodeDetailsService,
              private route: Router,
              private formBuilder: FormBuilder,
              private execDetailsService: ExecutionDetailsService,
              private backendurlService: GetBackendUrlService) { }

  ngOnInit() {
    if (this.backendurlService.isValidUrl()) {
      this.validMessage = "valid";
    }
    // this.execDetails = this.execDetailsService.getExecutionDetails();

    this.upgradeForm = this.formBuilder.group({
      sourceNode: ['', Validators.required],
      destinationNode: ['', Validators.required]
    });
  }

  onSubmit() {
    let sourceNode = this.upgradeForm.get('sourceNode').value;
    let destinationNode = this.upgradeForm.get('destinationNode').value

    const nodeName = sourceNode + "," + destinationNode;

    this.nodeDetailsService.upgradeOneNode(nodeName)
      .subscribe(data => { console.log(data)},
        error => {this.validMessage = error;
        window.alert('Exception happened during upgrade in ' + this.backendurlService.getPlatformName());},
        () => this.validMessage = 'Upgrade started');

    this.execDetailsService.getExecutionDetails()
      .subscribe(data => {this.execDetails = data;console.log(data)},
        error1 => {this.execDetails = error1; console.log(error1)});

    this.tailStream = this.execDetailsService.getTailstreamPort();
  }
}
