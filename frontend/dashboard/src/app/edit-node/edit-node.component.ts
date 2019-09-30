import { Component, OnInit } from '@angular/core';
import {NodesService} from "../shared/nodes.service";
import {ActivatedRoute, Router} from "@angular/router";
import {NodeDetails} from "../nodes/node.model";
import {NodeDetailsService} from "../services/node-details.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ManageNodeService} from "../services/manage-node.service";
import {first} from "rxjs/operators";

@Component({
  selector: 'app-edit-node',
  templateUrl: './edit-node.component.html',
  styleUrls: ['./edit-node.component.css']
})
export class EditNodeComponent implements OnInit {

  nodeName: string;
  hostId: number;
  node: NodeDetails;
  editForm: FormGroup;
  skipUpgrade:boolean = false;

  constructor(private nodeService: NodesService,
              private nodeDetailsService: NodeDetailsService,
              private manageNodeService: ManageNodeService,
              private router:Router,
              private route:ActivatedRoute,
              private formBuilder: FormBuilder) { }

  ngOnInit() {
    const id = window.localStorage.getItem("nodeId");
    //console.log(id);
    //const  id = +this.route.snapshot.params.id;

    this.editForm = this.formBuilder.group({
      id: [''],
      hostName: ['', Validators.required],
      hostId: ['', Validators.required],
      currentStatus: ['', Validators.required],
      upgradeStatus: ['', Validators.required],
      upgradeStartTime: ['', Validators.required],
      upgradeEndTime: ['', Validators.required],
      oldKernelVersion: ['', Validators.required],
      newKernelVersion: ['', Validators.required],
      skipUpgrade: ['', Validators.required],
      createdAt: ['', Validators.required],
      updatedAt: ['', Validators.required]
    });

    this.nodeDetailsService.getNode(+id)
      .subscribe(data => {
                this.editForm.setValue(data);
                console.log(data);
              },
        error1 => {
        console.log(error1);
        console.log('error happened');
        });
    //this.getNode(id);

    //console.log(this.route.snapshot.queryParams);
    //console.log(this.route.snapshot.fragment);

    //this.route.queryParams.subscribe(params => console.log(params));
    //this.route.fragment.subscribe(fragment => console.log(fragment));
  }

  onSubmit() {
    this.editForm.value.skipUpgrade = (this.skipUpgrade == true) ? 1 : 0;
    this.manageNodeService.editNode(this.editForm.value)
      .pipe(first())
      .subscribe(data => {console.log(data);
          this.router.navigate(['home'])},
        () => this.router.navigate(['home']));
  }

  onSaveNode() {
    if (this.nodeName) {
      this.node.hostName = this.nodeName;
    }

    if (this.hostId) {
      this.node.hostId = this.hostId;
    }

    this.nodeService.updateNode(this.node)
      .subscribe(updatednode => console.log(updatednode));

    this.router.navigate(['']);
  }

  getNode(id) {
    this.nodeService.getNode(id)
      .subscribe(node => this.node = node);
  }

  toggleVisibility(e){
    this.skipUpgrade= e.target.checked;
  }
}
