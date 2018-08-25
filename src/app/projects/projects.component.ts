import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { Project } from './project.model';
import { ProjectsService } from './projects.service';
import { Subscription } from 'rxjs/internal/Subscription';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent {
  /*Gonna need to load in the projects somehow*/
  webProjects: Project[] = [];
  mobileProjects: Project[] = [];

  webProjectsSub: Subscription;

  public selectedProject: string;

  constructor(public projectsService: ProjectsService) {}

  ngOnInit() {
    this.projectsService.getWebPosts();
    this.webProjectsSub = this.projectsService.getWebPostsUpdateListener()
    .subscribe((projectData: { projects: Project[]} ) => {
      this.webProjects = projectData.projects;
    });
  }

  ngOnDestroy() {
    this.webProjectsSub.unsubscribe();
  }

}
