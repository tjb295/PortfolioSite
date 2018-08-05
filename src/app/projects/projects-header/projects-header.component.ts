import { Component } from '@angular/core';

@Component({
  selector: 'app-projects-header',
  templateUrl: './projects-header.component.html',
  styleUrls: ['./projects-header.component.css']
})
export class ProjectsHeaderComponent {

  public hideText = true;

  showText(event: HTMLElementEventMap) {

  }
}
