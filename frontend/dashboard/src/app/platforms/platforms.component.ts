import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {PlatformsService} from "../services/platforms.service";
import {Router} from "@angular/router";
import {Platforms} from "../models/Platforms.model";
import {GetBackendUrlService} from "../services/get-backend-url.service";
import {AuthService} from "../shared/auth.service";

@Component({
  selector: 'app-platforms',
  templateUrl: './platforms.component.html',
  styleUrls: ['./platforms.component.css']
})
export class PlatformsComponent implements OnInit {
  title = 'dashboard';
  public platforms= null;
  selectplatform: FormGroup;
  name: string;
  selectedPlatform: Platforms;
  constructor(private platformService: PlatformsService,
              private router: Router,
              private formBuilder: FormBuilder,
              private backendurlService: GetBackendUrlService) { }

  ngOnInit(): void {
    this.getPlatforms();

    setTimeout(() => {
      if (this.platforms == '') {
        this.platforms = null;
      }
    }, 500);

    this.selectplatform = this.formBuilder.group({
      name: ['']
    });
  }

  getPlatforms() {
    this.platformService.getAllPlatforms()
      .subscribe(data => {
        this.platforms = data;
        console.log(this.platforms)
      });
  }
  onSubmit() {
    console.log(this.selectplatform.value.name);
    console.log(this.selectplatform.value.ip);
  }

  onAddPlatformClick() {
    this.router.navigate(['addplatform']);
  }

  onDeletePlatform(id: number) {
    this.platformService.deletePlatform(id)
      .subscribe(data => this.router.navigate(['']),
        error => console.log(error),
        () => this.getPlatforms());
  }

  onEditPlatform(platform: Platforms) {
    window.localStorage.removeItem("platformId");
    window.localStorage.setItem("platformId", platform.id.toString());
    this.router.navigate(['edit-platform']);
  }

  setSelected(platform: Platforms) {
    this.selectedPlatform = platform;
    console.log(platform.name);
    console.log(platform.port);
    this.backendurlService.changePlatformUrl(platform.ip + ':' + platform.port);
    this.backendurlService.changePlatformName(platform.name);
  }
}
