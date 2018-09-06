import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { ProjectsService } from '../projects.service';
import { Project } from '../project.model';

@Component({
  selector: 'app-project-single',
  templateUrl: './project-single.component.html',
  styleUrls: ['./project-single.component.css']
})
export class ProjectSingleComponent {
  private projectId: string;
  public project: Project;

  constructor(private projectsService: ProjectsService, public route: ActivatedRoute) {}

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('projectId')) {
        this.projectId = paramMap.get('projectId');
        console.log('projectId');
        this.projectsService.getProject(this.projectId).subscribe(projectData => {
          /*load this project to be viewed*/
          this.project = {
            title: projectData.title,
            type: projectData.type,
            _id: projectData._id,
            tagline: projectData.tagline,
            overview: projectData.overview,
            design: projectData.design,
            code: projectData.code,
            future: projectData.future,
            github: projectData.github,
            image: projectData.image,
            languages: projectData.languages,
            projectImg: projectData.projectImg,
            techImg: projectData.techImg,
            thumbNail: projectData.thumbNail,
            designImg: projectData.designImg
          };

        });
      }
    });


  }

}
