import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddPlatformComponent } from './add-platform/add-platform.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule} from "@angular/common/http";
import {
  MatButtonModule, MatCardModule, MatCheckboxModule,
  MatDatepickerModule,
  MatFormFieldModule,
  MatInputModule, MatListModule,
  MatNativeDateModule, MatSlideToggleModule, MatTabsModule, MatToolbarModule
} from '@angular/material';

import { NodesComponent } from './nodes/nodes.component';
import { UpgradeStatusDirective } from './shared/upgrade-status.directive';
import { NodeDetailsComponent } from './node-details/node-details.component';
import { AddNodeComponent } from './add-node/add-node.component';
import {NodesService} from "./shared/nodes.service";
import {LoggingService} from "./shared/logging.service";
import { EditNodeComponent } from './edit-node/edit-node.component';
import {NodeDetailsService} from "./services/node-details.service";
import {ExecutionDetailsService} from "./services/execution-details.service";
import {StatsService} from "./services/stats.service";
import {UpgradeStatusService} from "./services/upgrade-status.service";
import { StatsComponent } from './stats/stats.component';
import { UpgradeAllNodesComponent } from './upgrade-all-nodes/upgrade-all-nodes.component';
import {UpgradeAllNodesService} from "./services/upgrade-all-nodes.service";
import { Component } from "@angular/core";
import { ManageNodesComponent } from './manage-nodes/manage-nodes.component';
import { DeleteNodeComponent } from './delete-node/delete-node.component';
import {ManageNodeService} from "./services/manage-node.service";
import { UpgradeOneNodeComponent } from './upgrade-one-node/upgrade-one-node.component';
import { ListApiComponent } from './list-api/list-api.component';
import {GetBackendUrlService} from "./services/get-backend-url.service";
import { PlatformsComponent } from './platforms/platforms.component';
import { EditPlatformComponent } from './edit-platform/edit-platform.component';
import { MainMenuComponent } from './main-menu/main-menu.component';

@NgModule({
  declarations: [
    AppComponent,
    AddPlatformComponent,
    NodesComponent,
    UpgradeStatusDirective,
    NodeDetailsComponent,
    AddNodeComponent,
    EditNodeComponent,
    StatsComponent,
    UpgradeAllNodesComponent,
    ManageNodesComponent,
    DeleteNodeComponent,
    UpgradeOneNodeComponent,
    ListApiComponent,
    AddPlatformComponent,
    PlatformsComponent,
    EditPlatformComponent,
    MainMenuComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatListModule,
    MatCardModule,
    HttpClientModule,
    MatToolbarModule,
    MatTabsModule,
    ReactiveFormsModule
  ],
  providers: [NodesService, LoggingService, NodeDetailsService, ExecutionDetailsService,
    StatsService, UpgradeStatusService, UpgradeAllNodesService, ManageNodeService, GetBackendUrlService],
  bootstrap: [AppComponent]
})
export class AppModule { }
