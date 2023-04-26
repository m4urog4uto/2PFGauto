import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardCoursesComponent } from './pages/dashboard-courses/dashboard-courses.component';
import { PipesModule } from '../shared/pipes/pipes.module';
import { SharedModule } from '../shared/shared.module';
import { DirectivesModule } from '../shared/directives/directives.module';
import { MaterialModule } from '../shared/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ModalFormCourseComponent } from './components/ModalFormCourse/modal-form-course.component';
import { TableCourseComponent } from './components/TableCourse/table-course.component';



@NgModule({
  declarations: [
    DashboardCoursesComponent,
    ModalFormCourseComponent,
    TableCourseComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    BrowserModule,
    PipesModule,
    DirectivesModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class CoursesModule { }
