import { Component } from '@angular/core';
import { CoursesService } from '../../../core/services/courses.service';
import { Course } from 'src/app/core/models';
import { MatDialog } from '@angular/material/dialog';
import { ModalFormCourseComponent } from '../../components/ModalFormCourse/modal-form-course.component';

@Component({
  selector: 'app-dashboard-courses',
  templateUrl: './dashboard-courses.component.html',
  styleUrls: ['./dashboard-courses.component.css']
})
export class DashboardCoursesComponent {
  courses: Course[] = [];

  constructor(
    private dialogService: MatDialog,
    private coursesService: CoursesService
  ) {
    this.coursesService.getCoursesList().subscribe((courses) => this.courses = courses);
  }

  addCourse(): void {
    const dialogo = this.dialogService.open(ModalFormCourseComponent, {
      data: {
        course: {
          courseName: '',
          description: '',
          duration: ''
        }
      }
    });

    dialogo.afterClosed().subscribe(result => {
      if (result.courseName) {
        const newStudent = { ...result, id: this.courses.length + 1 }
        this.courses = [ ...this.courses, newStudent ];
        this.coursesService.updateCourseList(this.courses);
      }
    });
  }

  removeCourse(ev: number): void {
    const studentId = this.courses.findIndex((obj) => obj.id === ev);
    if (studentId > -1) {
      this.courses.splice(studentId, 1);
    };

    this.courses = [ ...this.courses ];
    this.coursesService.updateCourseList(this.courses);
  }

  editCourse(ev: number): void {
    const studentId = this.courses.find((obj) => obj.id === ev);
    if (studentId) {
      const { id, courseName, description, duration } = studentId;
      const dialogo = this.dialogService.open(ModalFormCourseComponent, {
        data: {
          course: {
            id,
            courseName,
            description,
            duration
          }
        }
      });

      dialogo.afterClosed().subscribe((result: Course) => {
        if (result) {
          const newAlumnosList = this.courses.map(obj => {
            if (obj.id === result.id) {
              return { ...obj, ...result }
            }
            return obj;
          })
          this.courses = [ ...newAlumnosList ];
          this.coursesService.updateCourseList(this.courses);
        }
      });

    }
  }
}
