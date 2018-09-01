import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';

import { ProjectsService } from '../projects.service';

@Component({
  selector: 'app-projects-header',
  templateUrl: './projects-header.component.html',
  styleUrls: ['./projects-header.component.css'],
  animations: [
    trigger('activeType' , [
      state('inactive', style({
        backgroundColor: '#eee',
        transform: 'scale(1)'
      })),
      state('active', style({
        backgroundColor: '#cfd8dc',
        transform: 'scale(1.2)'
      })),
      transition('inactive => active', animate('100ms ease-in')),
      transition('active => inactive', animate('100ms ease-out'))
    ])
  ]
})
export class ProjectsHeaderComponent {

  constructor(private projectsService: ProjectsService) {}

  public hideText = true;
  currentlySelected = 'Mobile';
  public State = 'inactive';



  setType(type: string) {
    console.log(type);
    this.currentlySelected = type;
    this.projectsService.setType(type);
  }

  toggleState() {
    this.State = this.State === 'active' ? 'inactive' : 'active';
  }

}
