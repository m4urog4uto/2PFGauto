import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardStudentsComponent } from './students/pages/dashboard-students/dashboard-students.component';
import { DashboardCoursesComponent } from './courses/pages/dashboard-courses/dashboard-courses.component';
import { DetailsStudentsComponent } from './students/pages/details-students/details-students.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DashboardInscriptionsComponent } from './inscriptions/pages/inscriptions/dashboard-inscriptions.component';
import { InscriptionsDetailComponent } from './inscriptions/pages/inscriptions-detail/inscriptions-detail.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      {
        path: 'alumnos',
        children: [
          {
            path: '',
            component: DashboardStudentsComponent
          },
          {
            path: ':studentId',
            component: DetailsStudentsComponent
          }
        ]
      },
      {
        path: 'inscripciones',
        children: [
          {
            path: '',
            component: DashboardInscriptionsComponent
          },
          {
            path: ':commission',
            component: InscriptionsDetailComponent
          }
        ]
      },
      {
        path: 'cursos',
        children: [
          {
            path: '',
            component: DashboardCoursesComponent
          }
        ]
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'dashboard',
  }
]

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
