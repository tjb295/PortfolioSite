import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProjectsHeaderComponent } from './projects/projects-header/projects-header.component';
import { ProjectsComponent } from './projects/projects.component';
import { LoginComponent } from './auth/login.component';
import { SignupComponent } from './auth/signup/singup.component';

import { HomeComponent } from './home/home.component';
import { ProjectSingleComponent } from './projects/project-single/project-single.component';
import { ConsoleComponent } from './console/console.component';

import { AuthGuard } from './auth/auth.guard';
/*import different components for mobile and web apps*/

const routes: Routes = [
  {
    path: 'projects/:id', component: ProjectSingleComponent
  },
  {
    path: '', component: HomeComponent
  },
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'signup', component: SignupComponent
  },
  {
    path: 'console', component: ConsoleComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'edit/:projectId',
    component: ConsoleComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [ RouterModule ],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
