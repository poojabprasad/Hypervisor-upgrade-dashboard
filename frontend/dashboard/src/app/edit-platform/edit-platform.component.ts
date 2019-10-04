import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {PlatformsService} from "../services/platforms.service";
import {first} from "rxjs/operators";

@Component({
  selector: 'app-edit-platform',
  templateUrl: './edit-platform.component.html',
  styleUrls: ['./edit-platform.component.css']
})
export class EditPlatformComponent implements OnInit {
  editForm: FormGroup;
  constructor(private router: Router,
              private route: ActivatedRoute,
              private formBuilder: FormBuilder,
              private platformService: PlatformsService) { }

  ngOnInit() {
    const id = window.localStorage.getItem("platformId");
    this.editForm = this.formBuilder.group({
      id: [''],
      name: ['', Validators.required],
      ip: ['', Validators.required],
      port: ['', Validators.required]
    });

    this.platformService.getPlatformById(+id)
      .subscribe(data => {
        this.editForm.setValue(data);
      },
        error => console.log('error happened ' + error),
        );
  }

  onSubmit() {
    this.platformService.editPlatform(this.editForm.value)
      //.pipe(first())
      .subscribe(onloadeddata => this.router.navigate(['']),
        () => this.router.navigate(['']));
  }

}
