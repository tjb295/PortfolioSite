/*This is the Service that will send and retrieve project
from this site to this server */
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { Project } from './project.model';

@Injectable({ providedIn: 'root'})
export class ProjectsService {
  private projects: Project[] = [];

  /*create subject for recieving from db*/
  private projectsUpdated = new Subject<{projects: Project[]}>();

  constructor(private http: HttpClient, private router: Router) {}

  addProject(project: Project) {
    /*Form Data for appending*/
    console.log(project);
    const projectData = new FormData();

    /*Append each attrib of project to formData */
    projectData.append('_id', project._id);
    projectData.append('title', project.title);
    projectData.append('type', project.type);
    projectData.append('languages', project.languages[0]);
    projectData.append('tagline', project.tagline);
    projectData.append('overview', project.overview);
    projectData.append('future', project.future);
    projectData.append('design', project.design);
    projectData.append('code', project.code);
    projectData.append('github', project.github);

    console.log(projectData);

    this.http.post<{message: string, project: Project}>('/api/projects', project)
    .subscribe((responseData) => {
      console.log(responseData);
    });
  }

}
