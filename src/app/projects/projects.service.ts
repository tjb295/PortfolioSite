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
  private mobileProjectsUpdated = new Subject<{projects: Project[]}>();

  public typeStatusListener = new Subject<string>();

  /*create subject for recieving from db*/
  private projectsUpdated = new Subject<{projects: Project[]}>();

  constructor(private http: HttpClient, private router: Router) {}

  /*Function for retrieving all web type projects*/
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

  getMobilePosts() {
    this.http.get<{message: string, projects: any}>('/api/projects/Mobile')
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
      this.mobileProjects = transformedProjectData.projects;
      console.log(this.webProjects);
      this.mobileProjectsUpdated.next({ projects: [...this.mobileProjects]});
    });
  }

  getWebPostsUpdateListener() {
    return this.webProjectsUpdated.asObservable();
  }

  getMobilePostsUpdateListener() {
    return this.mobileProjectsUpdated.asObservable();
  }

  /*Subject to listen for type change*/
  getTypeStatusListener() {
    return this.typeStatusListener.asObservable();
  }

  setType(type: string) {
    this.typeStatusListener.next(type);
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
    projectData.append('projectImg', project.projectImg);
    projectData.append('techImg', project.techImg);
    projectData.append('thumbNail', project.thumbNail);
    console.log(project.thumbNail);
    projectData.append('designImg', project.designImg);

    console.log(projectData);

    this.http.post<{message: string, project: Project}>('/api/projects', project)
    .subscribe((responseData) => {
      console.log(responseData);
      this.router.navigate(['/']);
    });
  }

  /*Retrieve single Project*/
  getProject(id: string) {
    console.log(id + 'is this working wtf');
    return this.http.get<{_id: string, title: string, type: string, languages: string, tagline: string, overview: string, design: string, code: string, future: string, github: string, image: string, thumbNail: string, projectImg: string, techImg: string, designImg: string}>('/api/projects/single/' + id );
  }

  /*Update an existing project*/
  updateProject(project: Project, image: File | string, projectId: string) {
    let projectData: Project | FormData;
    if (typeof(image) === 'object') {
      /*Append each attrib of project to formData */
      projectData = new FormData();
      projectData.append('_id', projectId);
      projectData.append('title', project.title);
      projectData.append('type', project.type);
      projectData.append('languages', project.languages);
      projectData.append('tagline', project.tagline);
      projectData.append('overview', project.overview);
      projectData.append('future', project.future);
      projectData.append('design', project.design);
      projectData.append('code', project.code);
      projectData.append('github', project.github);
      projectData.append('image', image);
      projectData.append('projectImg', project.projectImg);
      projectData.append('techImg', project.techImg);
      projectData.append('thumbNail', project.thumbNail);
      projectData.append('designImg', project.designImg);
    } else {
      projectData = {...project, image: image};
    }
    console.log(project._id);
    this.http.put('/api/projects/' + projectId, projectData)
    .subscribe(response => {
      console.log(response + 'HELP ME');
      this.router.navigate(['/']);
    });



  }

  /*Delete Method */
  deleteProject(projectId: string) {
    return this.http.delete('/api/projects/' + projectId);
  }

}
