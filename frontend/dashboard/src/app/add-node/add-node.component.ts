import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {NodeDetails} from "../nodes/node.model";
import {NodesService} from "../shared/nodes.service";
import {NodeDetailsService} from "../services/node-details.service";
import {error} from "@angular/compiler/src/util";
import {Router} from "@angular/router";
import {ManageNodeService} from "../services/manage-node.service";

@Component({
  selector: 'app-add-node',
  templateUrl: './add-node.component.html',
  styleUrls: ['./add-node.component.css']
})
export class AddNodeComponent implements OnInit {
  title = 'Add a node';
  nodename: string;
  hostid: number;

  // @Output()
  // newNode = new EventEmitter<NodeDetails>();

  newNode: NodeDetails;
  nodeDetails : NodeDetails;

  constructor(private manageNodeService: ManageNodeService,
              private router: Router) { }

  ngOnInit() {
  }

  onSubmit() {
    console.log(this.nodename);
    console.log(this.hostid);
    if (this.nodename === undefined) {
      window.alert("please enter the node name");
      return false;
    }

    if (this.hostid === null) {
      window.alert('Please enter the host id');
      return false;
    }
    this.nodeDetails = new class implements NodeDetails {
      currentStatus: string;
      hostId: number;
      hostName: string;
      id: number;
      newKernelVersion: string;
      oldKernelVersion: string;
      upgradeEndTime: string;
      upgradeStartTime: string;
      upgradeStatus: string;
      skipUpgrade: number;
    }
    //const nodeDetails = null;
    this.nodeDetails.hostName = this.nodename;
    this.nodeDetails.hostId = this.hostid;
    this.nodeDetails.currentStatus = '';
    this.nodeDetails.upgradeStatus = '';
    this.nodeDetails.oldKernelVersion = '';
    this.nodeDetails.newKernelVersion = '';
    this.nodeDetails.upgradeStartTime = '';
    this.nodeDetails.upgradeEndTime = '';
    this.nodeDetails.skipUpgrade = 0;
    //this.newNode.emit(nodeDetails);

    console.log('calling the api to create node');
    this.manageNodeService.addNode(this.nodeDetails)
      .subscribe(data => {console.log(data);
                    this.router.navigate(['/home'])},
        error => window.alert('Node ' + this.nodeDetails.hostName + ' already exists'),
        () => console.log('node added'));
  }
}
