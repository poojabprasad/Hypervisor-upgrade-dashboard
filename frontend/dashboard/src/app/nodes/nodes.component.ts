import { Component, OnInit } from '@angular/core';
import { NodeDetails } from "./node.model";
import {NodesService} from "../shared/nodes.service";
import {NodeDetailsService} from "../services/node-details.service";
import {ManageNodeService} from "../services/manage-node.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-nodes',
  templateUrl: './nodes.component.html',
  styleUrls: ['./nodes.component.css']
})
export class NodesComponent implements OnInit {

  title = 'Welcome to the hypervisor upgrade dashboard';
  enabled = true;
  //formVisible = false;
  selectedNode: NodeDetails;
  nodes: NodeDetails[];

  public nodeDetails = null;

  constructor(private nodeService: NodesService,
              private manageNodeService: ManageNodeService,
              private nodeDetailsService: NodeDetailsService,
              private router: Router) { }

  ngOnInit() {
    this.getNodes();
  }

  getNodes() {
    this.nodeDetailsService.getNodeDetails()
      .subscribe(
        data => {this.nodeDetails = data;
        console.log(data)},
             err => {console.log(err)},
        () => {console.log()}
        );
  }

  onNewNode(event: NodeDetails) {

    this.nodeService.addNode(event)
      .subscribe(success => console.log(success));
  }

  onDeleteNode(id: number) {
    this.manageNodeService.deleteNode(id)
      .subscribe(data => console.log(data),
      error => console.log(error),
        () => this.getNodes());
  }

  onEditNode(node: NodeDetails) {
    window.localStorage.removeItem("nodeId");
    window.localStorage.setItem("nodeId", node.id.toString());
    this.router.navigate(['edit-node']);
    // this.manageNodeService.editNode(node)
    //   .subscribe(() => this.getNodes());
  }

  setSelected(node: NodeDetails) {
    this.selectedNode = node;
  }
}
