import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../auth/auth.service';

import { Project } from './project.model';
import { ProjectsService } from './projects.service';
import { Subscription } from 'rxjs/internal/Subscription';

import { ProjectsHeaderComponent } from './projects-header/projects-header.component';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent {

  currentProjectType = 'Mobile';
  projectTypeSub: Subscription;

  /*Gonna need to load in the projects somehow*/
  webProjects: Project[] = [];
  mobileProjects: Project[] = [];

  webProjectsSub: Subscription;
  mobileProjectsSub: Subscription;

  /*Sub to listen for switch from displaying mobile*/


  public selectedProject: string;
  public isLoading = false;
  private authStatusSub: Subscription;
  userIsAuthenticated = false;

  constructor(public projectsService: ProjectsService, private authService: AuthService) {}

  ngOnInit() {
    this.projectsService.getWebPosts();
    this.webProjectsSub = this.projectsService.getWebPostsUpdateListener()
    .subscribe((projectData: { projects: Project[]} ) => {
      this.webProjects = projectData.projects;
    });

    this.projectsService.getMobilePosts();
    this.mobileProjectsSub = this.projectsService.getMobilePostsUpdateListener()
    .subscribe((projectData: { projects: Project[]}) => {
      this.mobileProjects = projectData.projects;
    });

    /*Authentication for deleting and editing of project*/
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authStatusSub = this.authService.getAuthStatusListener().subscribe(
      isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
      }
    );

    /*listener for type of project to display*/
    this.projectTypeSub = this.projectsService.getTypeStatusListener()
    .subscribe(projectType => {
      console.log(projectType + ' in sub');
      this.currentProjectType = projectType;
    });
  }

  onDelete(projectId: string) {
    this.isLoading = true;
    /*Call our service to make delete request*/
    this.projectsService.deleteProject(projectId).subscribe(() => {
      this.projectsService.getWebPosts();
      this.projectsService.getMobilePosts();
    });

  }
  ngOnDestroy() {
    this.webProjectsSub.unsubscribe();
    this.mobileProjectsSub.unsubscribe();
    this.projectTypeSub.unsubscribe();
  }

}
