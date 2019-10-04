import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {PlatformsService} from "../services/platforms.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-add-platform',
  templateUrl: './add-platform.component.html',
  styleUrls: ['./add-platform.component.css']
})
export class AddPlatformComponent implements OnInit {
  name: string;
  ip: string;
  port: number;
  addPlatform: FormGroup;

  constructor(private platformService: PlatformsService,
              private router: Router,
              private route: ActivatedRoute,
              private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.addPlatform = this.formBuilder.group({
      name: ['', Validators.required],
      ip: ['', Validators.required],
      port: ['', Validators.required]
    });
  }

  onSubmit() {
    this.platformService.addPlatform(this.addPlatform.value)
      .subscribe(data => {console.log('Platform added'); this.router.navigate([''])},
        error => window.alert('Unable to add platform' + error));
  }

  cancel() {
    this.router.navigate(['']);
  }
}
