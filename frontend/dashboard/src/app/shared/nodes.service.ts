import { Injectable } from '@angular/core';
import {NodeDetails} from "../nodes/node.model";
import {Observable, of} from "rxjs";
import {LoggingService} from "./logging.service";

@Injectable({
  providedIn: 'root'
})
export class NodesService {

  constructor(private logService: LoggingService) { }

   nodes: NodeDetails[] = [//{
  //   id: 1,
  //   hostId: 1,
  //   hostName: 'node51',
  //   currentStatus: 'Running',
  //   upgradeStatus: '',
  //   upgradeStartTime: 'now',
  //   upgradeEndTime: 'now',
  //   oldKernelVersion: '4.7',
  //   newKernelVersion: '4.11'
  // },
  //   {
  //     id: 2,
  //     hostId: 2,
  //     hostName: 'node52',
  //     currentStatus: 'Failed',
  //     upgradeStatus: '',
  //     upgradeStartTime: 'now',
  //     upgradeEndTime: 'now',
  //     oldKernelVersion: '4.7',
  //     newKernelVersion: '4.11'
  //   },
  //   {
  //     id: 3,
  //     hostId: 3,
  //     hostName: 'node53',
  //     currentStatus: 'Completed',
  //     upgradeStatus: '',
  //     upgradeStartTime: 'now',
  //     upgradeEndTime: 'now',
  //     oldKernelVersion: '4.7',
  //     newKernelVersion: '4.11'
  //   },
  //   {
  //     id: 4,
  //     hostId: 4,
  //     hostName: 'node54',
  //     currentStatus: '',
  //     upgradeStatus: '',
  //     upgradeStartTime: 'now',
  //     upgradeEndTime: 'now',
  //     oldKernelVersion: '4.7',
  //     newKernelVersion: '4.11'
  //   },
  //   {
  //     id: 5,
  //     hostId: 5,
  //     hostName: 'node55',
  //     currentStatus: '',
  //     upgradeStatus: '',
  //     upgradeStartTime: 'now',
  //     upgradeEndTime: 'now',
  //     oldKernelVersion: '4.7',
  //     newKernelVersion: '4.11'
  //   }
  ];

  getNodes(): Observable<NodeDetails[]> {
    return of(this.nodes);
  }

  getNode(id: number): Observable<NodeDetails> {
    return of(this.nodes.find(x => x.id === id));
  }

  addNode(node: NodeDetails): Observable<string> {
    this.nodes.push(node);
    this.logService.log(node.hostName, 'added');

    return of('');
  }
  
  updateNode(node: NodeDetails): Observable<string> {
    this.nodes.forEach((node1, i) => {
      if (node === node1) {
        this.nodes[i] = node;
      }
    });

    this.logService.log(node.hostName, 'updated');
    return of('');
  }

  deleteNode(deletedNode: NodeDetails): Observable<string> {
    this.nodes.forEach((node1, i) => {
      if (deletedNode === node1) {
        this.nodes.splice(i, 1);
      }
    })

    this.logService.log(deletedNode.hostName, 'deleted');
    return of('');
  }
}
