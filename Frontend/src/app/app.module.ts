import { UpdateResultService } from './_services/update-result.service';
import { ViewService } from './_services/view.service';
import { appRoutingModule } from './app.routing';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

import { AppComponent } from './app.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { LogInComponent } from './log-in/log-in.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AdminHomePageComponent } from './admin-home-page/admin-home-page.component';
import { BatchResultComponent } from './batch-result/batch-result.component';
import { CourseResultComponent } from './course-result/course-result.component';
import { ViewProfileComponent } from './view-profile/view-profile.component';
import { AddResultComponent } from './add-result/add-result.component';
import { CommonModule } from '@angular/common';
import { StudentHomePageComponent } from './student-home-page/student-home-page.component';

@NgModule({
  declarations: [
    AppComponent,
    SignUpComponent,
    LogInComponent,
    AdminHomePageComponent,
    BatchResultComponent,
    CourseResultComponent,
    ViewProfileComponent,
    AddResultComponent,
    StudentHomePageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    appRoutingModule,
    ReactiveFormsModule,
    CommonModule,
    Ng2SearchPipeModule
  ],
  providers: [
    ViewService,
    UpdateResultService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
