import {Component, Input, OnInit} from '@angular/core';
import {NodeDetails} from "../nodes/node.model";
import {NodesService} from "../shared/nodes.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../shared/auth.service";
import {NodeDetailsService} from "../services/node-details.service";
import {ExecutionDetailsService} from "../services/execution-details.service";
import {interval, Subscription } from "rxjs";
import {GetBackendUrlService} from "../services/get-backend-url.service";

@Component({
  selector: 'app-node-details',
  templateUrl: './node-details.component.html',
  styleUrls: ['./node-details.component.css']
})
export class NodeDetailsComponent implements OnInit {
  //@Input()
  passedNode: NodeDetails;

  public tailStream;
  public nodedetails;
  public execdetails;
  public subscription: Subscription;
  public userInput = true;

  constructor(private nodeService: NodesService,
              private nodeDetailsService: NodeDetailsService,
              private route: ActivatedRoute,
              private router: Router,
              private authService: AuthService,
	      private executionDetailsService: ExecutionDetailsService,
	      private backendurlService: GetBackendUrlService) { }

  ngOnInit() {
    this.getNode();
    const source = interval(10000);
    this.subscription = source.subscribe(value => this.getNode());
    this.tailStream = this.executionDetailsService.getTailstreamPort();
  }

  getNode() {
    const id = +this.route.snapshot.params.id;
    this.nodeDetailsService.getNode(id)
      .subscribe(node => {this.nodedetails = node;
        console.log(this.nodedetails);});

    this.executionDetailsService.getExecutionDetails()
      .subscribe(data => this.execdetails = data,
        error1 => this.execdetails = null);
  }

  startUpgrade() {
    const id = +this.route.snapshot.params.id;
    this.nodeDetailsService.startUpgrade(id)
      .subscribe(data => {this.nodedetails = data},
        err => {console.log(err);
	window.alert('Exception happened during upgrade in ' + this.backendurlService.getPlatformName());},
        () => console.log('Upgrade started'));

    setTimeout(() => {
        this.getNode();
      },
      3000);
  }

  pauseUpgrade() {
    //this.openConfirmationDialog();
    if (this.userInput) {
      const id = +this.route.snapshot.params.id;
      this.nodeDetailsService.pauseUpgrade(id)
        .subscribe(data => {
            this.nodedetails = data
          },
          err => console.log(err),
          () => console.log('Upgrade paused'));

      setTimeout(() => {
          this.getNode();
        },
        3000);
    }
  }

  stopUpgrade() {
    //this.openConfirmationDialog();
    if ((this.userInput)) {
      const id = +this.route.snapshot.params.id;
      this.nodeDetailsService.stopUpgrade(id)
        .subscribe(data => {
            this.nodedetails = data
          },
          err => console.log(err),
          () => console.log('Upgrade stopped'));

      setTimeout(() => {
          this.getNode();
        },
        3000);

      this.execdetails = null;
    }
  }

  resumeUpgrade() {
    const id = +this.route.snapshot.params.id;
    this.nodeDetailsService.resumeUpgrade(id)
      .subscribe(data => {this.nodedetails = data},
        err => console.log(err),
        () => console.log('Upgrade resumed'));

    setTimeout(() => {
        this.getNode();
      },
      3000);
  }

  onOverrideDetails() {
    this.passedNode.currentStatus = "Completed";

    this.nodeService.updateNode(this.passedNode)
      .subscribe(res => console.log(res));
  }

  onDelete() {
    this.nodeService.deleteNode(this.passedNode)
      .subscribe(res => console.log(res));

    //this.passedNode = null;
    this.router.navigate(['']);
  }

  onClickEdit() {
    this.router.navigate(['/node', this.passedNode.id, 'edit'],
      {queryParams: {hostName: this.passedNode.hostName},
      fragment: 'editing'});
  }

  isAdmin() {
    return this.authService.loggedIn;
  }
}
