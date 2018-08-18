import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';

import { Project } from '../projects/project.model';

import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-console',
  templateUrl: './console.component.html',
  styleUrls: ['./console.component.css']
})
export class ConsoleComponent implements OnInit {


  private projectId: string;
  public project: Project;
  form: FormGroup;

  ngOnInit() {
    /*do form initialization*/
    this.form = new FormGroup({
      title: new FormControl(null, {
        validators: [Validators.required]
      }),
      languages: new FormControl(null, {
        validators: [Validators.required]
      }),
      type: new FormControl(null, {
        validators: [Validators.required]
      }),
      tagline: new FormControl(null, {
        validators: [Validators.required]
      }),
      overview: new FormControl(null, {
        validators: [Validators.required]
      }),
      design: new FormControl(null, {
        validators: [Validators.required]
      }),
      code: new FormControl(null, {
        validators: [Validators.required]
      }),
      future: new FormControl(null, {
        validators: [Validators.required]
      }),
      github: new FormControl(null, {
        validators: [Validators.required]
      })
    });
  }

  constructor(private authService: AuthService) {}

  onSavePost() {
    if (this.form.invalid) {
      return;
    }
    /*do something*/
  }
  onLogout() {
    this.authService.logout();
  }
}
