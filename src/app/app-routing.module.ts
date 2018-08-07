import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProjectsHeaderComponent } from './projects/projects-header/projects-header.component';
import { ProjectsComponent } from './projects/projects.component';
//import different components for mobile and web apps

const routes: Routes = [
  {
    path: 'projects/:type', component: ProjectsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
