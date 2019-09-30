import { Component, OnInit } from '@angular/core';
import {NodeDetailsService} from "../services/node-details.service";

@Component({
  selector: 'app-delete-node',
  templateUrl: './delete-node.component.html',
  styleUrls: ['./delete-node.component.css']
})
export class DeleteNodeComponent implements OnInit {

  constructor(private nodeDetailsService: NodeDetailsService) { }
  public nodeDetails;

  ngOnInit() {
    this.getNodes()
  }

  getNodes() {
    this.nodeDetailsService.getNodeDetails()
      .subscribe(
        data => {this.nodeDetails = data;
          console.log(data)},
        err => {window.alert('Unable to fetch the nodes')},
        () => {console.log()}
      );

  }

}
