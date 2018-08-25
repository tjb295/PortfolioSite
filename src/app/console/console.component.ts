import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';

import { Project } from '../projects/project.model';

import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ProjectsService } from '../projects/projects.service';

import { mimeType } from './mime-type.validator';

@Component({
  selector: 'app-console',
  templateUrl: './console.component.html',
  styleUrls: ['./console.component.css']
})
export class ConsoleComponent implements OnInit {


  private projectId: string;
  public project: Project;
  form: FormGroup;
  imagePreview: string;

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
      }),
      image: new FormControl(null, {
        validators: [Validators.required],
        asyncValidators: [mimeType]
      })
    });
  }

  constructor(private authService: AuthService, private projectsService: ProjectsService) {}

  onSavePost() {
    if (this.form.invalid) {
      console.log('AHHHH');
      return;
    }

    this.project = {
      _id: '',
      title: this.form.value.title,
      type: this.form.value.type,
      languages: this.form.value.languages,
      tagline: this.form.value.tagline,
      overview: this.form.value.overview,
      design: this.form.value.design,
      code: this.form.value.code,
      future: this.form.value.future,
      github: this.form.value.github,
      image: 'scrn1.png'
    };
    console.log(this.project);

    this.projectsService.addProject(this.project, this.form.value.image);
    this.form.reset();
  }

  onImagePickedEvent(event: Event) {
    /*Say this is an HTMLInputElement*/
    const file = (event.target as HTMLInputElement).files[0];

    /*patch value allows you to target a simple control*/
    this.form.patchValue({image: file});

    /*Tells form that value is changed and to validate*/
    this.form.get('image').updateValueAndValidity();

    /*convert this to an image url*/
    const reader = new FileReader();

    reader.onload = () => {
      this.imagePreview = reader.result;
    };

    reader.readAsDataURL(file);
  }

  onLogout() {
    this.authService.logout();
  }
}
