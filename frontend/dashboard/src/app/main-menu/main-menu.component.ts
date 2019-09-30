import { Component, OnInit } from '@angular/core';
import {AuthService} from "../shared/auth.service";
import {Router} from "@angular/router";
import {GetBackendUrlService} from "../services/get-backend-url.service";

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.css']
})
export class MainMenuComponent implements OnInit {

  title = 'hypervisor-upgrades-dashboard';
  platformName: string;
  navLinks: any[];
  activeLinkIndex = -1;

  constructor(private authService: AuthService,
              private router: Router,
              private backendService: GetBackendUrlService) {
    this.navLinks = [
      {
        label: 'Platforms',
        link: '',
        index: 0
      },
      {
        label: 'List Nodes',
        link: '/home/listall',
        index: 1
      }, {
        label: 'Upgrade One Node',
        link: '/home/upgradeonenode',
        index: 2
      }, {
        label: 'Upgrade All Nodes',
        link: '/home/upgradeall',
        index: 3
      },{
        label: 'Stats',
        link: '/home/stats',
        index: 4
      }, {
        label: 'API\'s',
        link: '/home/listapi',
        index: 5
      }
    ];
  }

  ngOnInit(): void {
    this.router.events.subscribe((res) => {
      this.activeLinkIndex = this.navLinks.indexOf(this.navLinks.find(tab => tab.link === '.' + this.router.url));
    });

    this.platformName = this.backendService.getPlatformName();
  }
}
