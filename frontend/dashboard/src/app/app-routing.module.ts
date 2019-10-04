import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AddPlatformComponent} from "./add-platform/add-platform.component";
import {AppComponent} from "./app.component";
import { AddNodeComponent } from './add-node/add-node.component';
import { NodeDetailsComponent } from './node-details/node-details.component';
import { AuthGuard } from './shared/auth.guard';
import { EditNodeComponent } from './edit-node/edit-node.component';
import { DeleteNodeComponent } from './delete-node/delete-node.component';
import { StatsComponent } from './stats/stats.component';
import { UpgradeAllNodesComponent } from './upgrade-all-nodes/upgrade-all-nodes.component';
import { UpgradeOneNodeComponent } from './upgrade-one-node/upgrade-one-node.component';
import { ListApiComponent } from './list-api/list-api.component';
import { PlatformsComponent } from './platforms/platforms.component';
import { EditPlatformComponent } from './edit-platform/edit-platform.component';
import {NodesComponent} from "./nodes/nodes.component";

const routes: Routes = [
  {
    path: '',
    component: PlatformsComponent
  },
  {
    path: 'home',
    component: NodesComponent
  },
  {
    path: 'home/platforms',
    component: PlatformsComponent
  },
  {
    path: 'home/listall',
    component: NodesComponent
  },
  {
    path: 'addnode',
    component: AddNodeComponent
  },
  {
    path: 'nodedetails/:id',
    component: NodeDetailsComponent
  },
  {
    path: 'node/:id/edit',
    canActivate: [AuthGuard],
    component: EditNodeComponent,
  },
  {
    path: 'edit-node',
    component: EditNodeComponent
  },
  {
    path: 'edit-platform',
    component: EditPlatformComponent
  },
  {
    path: 'deletenode',
    component: DeleteNodeComponent
  },
  {
    path: 'home/stats',
    component: StatsComponent
  },
  {
    path: 'home/upgradeall',
    component: UpgradeAllNodesComponent
  },
  {
    path: 'home/upgradeonenode',
    component: UpgradeOneNodeComponent
  },
  {
    path: 'home/listapi',
    component: ListApiComponent
  },
  {
    path: 'addplatform',
    component: AddPlatformComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
