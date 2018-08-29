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
  private webProjects: Project[] = [];
  private mobileProjects: Project[] = [];

  private webProjectsUpdated = new Subject<{projects: Project[]}>();

  /*create subject for recieving from db*/
  private projectsUpdated = new Subject<{projects: Project[]}>();

  constructor(private http: HttpClient, private router: Router) {}

  /*Function for retrieving all projects*/
  getWebPosts() {
    this.http.get<{message: string, projects: any}>('/api/projects/Web')
    .pipe(
      map((projectData) => {
        return {
          projects: projectData.projects.map(project => {
            return {
              _id: project._id,
              title: project.title,
              type: 'Web',
              languages: project.languages,
              tagline: project.tagline,
              overview: project.overview,
              future: project.future,
              design: project.design,
              code: project.code,
              github: project.github
            };
          })
        };
      })
    )
    .subscribe(transformedProjectData => {
      this.webProjects = transformedProjectData.projects;
      console.log(this.webProjects);
      this.webProjectsUpdated.next({ projects: [...this.webProjects]});
    });
  }

  getWebPostsUpdateListener() {
    return this.webProjectsUpdated.asObservable();
  }

  addProject(project: Project, image: File) {
    /*Form Data for appending*/
    console.log(project);
    console.log(image);
    const projectData = new FormData();

    /*Append each attrib of project to formData */
    projectData.append('_id', project._id);
    projectData.append('title', project.title);
    projectData.append('type', project.type);
    projectData.append('languages', project.languages);
    projectData.append('tagline', project.tagline);
    projectData.append('overview', project.overview);
    projectData.append('future', project.future);
    projectData.append('design', project.design);
    projectData.append('code', project.code);
    projectData.append('github', project.github);
    projectData.append('image', project.image);

    console.log(projectData);

    this.http.post<{message: string, project: Project}>('/api/projects', project)
    .subscribe((responseData) => {
      console.log(responseData);
    });
  }

  /*Delete Method */
  deleteProject(projectId: string) {
    return this.http.delete('/api/projects/' + projectId);
  }

}
