import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AlertModule } from 'ngx-bootstrap';

import { FormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule,
         MatTabsModule,
         MatCardModule,
         MatGridListModule,
         MatButtonModule,
         MatFormFieldModule,
         MatProgressSpinnerModule,
         MatTooltipModule,
         MatInputModule,
         MatExpansionModule,
         MatListModule,
         MatStepperModule
} from '@angular/material';


import { ProjectsComponent } from './projects/projects.component';
import { TabComponent } from './tab/tab.component';
import { HeaderComponent } from './header/header.component';
import { ProjectsHeaderComponent } from './projects/projects-header/projects-header.component';
import { AppRoutingModule } from './/app-routing.module';
import { RouterModule } from '@angular/router/src/router_module';
import { LoginComponent } from './auth/login.component';
import { HomeComponent } from './home/home.component';
import { ProjectSingleComponent } from './projects/project-single/project-single.component';
import { SignupComponent } from './auth/signup/singup.component';
import { AuthInterceptor } from './auth/auth-interceptor';
import { ConsoleComponent } from './console/console.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    TabComponent,
    ProjectsComponent,
    ProjectsHeaderComponent,
    LoginComponent,
    HomeComponent,
    ProjectSingleComponent,
    SignupComponent,
    ConsoleComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatTabsModule,
    MatCardModule,
    AlertModule.forRoot(),
    MatGridListModule,
    MatButtonModule,
    AppRoutingModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
    FormsModule,
    MatInputModule,
    HttpClientModule,
    MatExpansionModule,
    MatListModule,
    MatStepperModule
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
