import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../auth/auth.service';

import { Project } from './project.model';
import { ProjectsService } from './projects.service';
import { Subscription } from 'rxjs/internal/Subscription';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent {

  currentProjectType = 'web';

  /*Gonna need to load in the projects somehow*/
  webProjects: Project[] = [];
  mobileProjects: Project[] = [];

  webProjectsSub: Subscription;
  mobileProjectsSub: Subscription;

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
  }

  onDelete(projectId: string) {
    this.isLoading = true;
    /*Call our service to make delete request*/
    this.projectsService.deleteProject(projectId).subscribe(() => {
      this.projectsService.getWebPosts();
    });

  }
  ngOnDestroy() {
    this.webProjectsSub.unsubscribe();
    this.mobileProjectsSub.unsubscribe();
  }

}
