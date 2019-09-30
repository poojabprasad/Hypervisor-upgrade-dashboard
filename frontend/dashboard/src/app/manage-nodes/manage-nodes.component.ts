import { Component, OnInit } from '@angular/core';
import {NodeDetailsService} from "../services/node-details.service";

@Component({
  selector: 'app-manage-nodes',
  templateUrl: './manage-nodes.component.html',
  styleUrls: ['./manage-nodes.component.css']
})
export class ManageNodesComponent implements OnInit {

  constructor(private nodeService: NodeDetailsService) { }

  ngOnInit() {
  }

  onAddNodeClick() {}

  onEditNodeClick() {}
}
