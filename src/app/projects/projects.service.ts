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
    const projectData = FormData();

    /*Append each attrib of project to formData */
    Object.keys(project).forEach(key => projectData.append(key, object[key]));


    this.http.post<{message: string, project: Project}>('/api/projects', projectData)
    .subscribe((responseData) => {
      console.log(responseData);
    });
  }

}
