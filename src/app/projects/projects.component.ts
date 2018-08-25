import { Component } from '@angular/core';

import { Project } from './project.model';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent {
  /*Gonna need to load in the projects somehow*/
  projects: Project[] = [];

  public selectedProject: string;

}
