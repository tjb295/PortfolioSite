import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AlertModule } from 'ngx-bootstrap';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule,
         MatTabsModule,
         MatCardModule,
         MatGridListModule,
         MatButtonModule
} from '@angular/material';


import { ProjectsComponent } from './projects/projects.component';
import { TabComponent } from './tab/tab.component';
import { HeaderComponent } from './header/header.component';
import { ProjectsHeaderComponent } from './projects/projects-header/projects-header.component';
import { AppRoutingModule } from './/app-routing.module';
import { RouterModule } from '@angular/router/src/router_module';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    TabComponent,
    ProjectsComponent,
    ProjectsHeaderComponent
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
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
