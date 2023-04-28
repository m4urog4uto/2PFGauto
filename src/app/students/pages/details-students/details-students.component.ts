import { Component, OnDestroy } from '@angular/core';
import { Observable, Subject, takeUntil, map } from 'rxjs';
import { Course, Student } from 'src/app/core/models';
import { StudentService } from '../../../core/services/student.service';
import { ActivatedRoute } from '@angular/router';
import { CoursesService } from '../../../core/services/courses.service';

@Component({
  selector: 'app-details-students',
  templateUrl: './details-students.component.html',
  styleUrls: ['./details-students.component.css']
})
export class DetailsStudentsComponent {

  studentsList: Student[] = [];
  studentDetail: Student | undefined;
  coursesSelected: Course[] | undefined;

  destroyed$ = new Subject<void>();

  constructor(
    private studentService: StudentService,
    private activatedRoute: ActivatedRoute,
    private coursesService: CoursesService
  ) {
    this.studentService.getStudentDetail(parseInt(this.activatedRoute.snapshot.params['studentId']))
      .pipe(takeUntil(this.destroyed$))
      .subscribe((result) => this.studentDetail = result);
    
    this.studentService.getStudentList().subscribe((result) => this.studentsList = result);
    
    this.coursesService.getCoursesList()
      .pipe(
        takeUntil(this.destroyed$),
        map((courses) => courses.filter((course, i) => this.studentDetail?.courseSelected.includes(course.courseName))
      ))
      .subscribe((result) => this.coursesSelected = result)
  }

  removeCourse(id: number): void {
    if (this.coursesSelected && this.studentDetail) {
      const courseId = this.coursesSelected.findIndex((obj) => obj.id === id);
      if (courseId > -1) {
        this.coursesSelected.splice(courseId, 1);
      };
  
      this.coursesSelected = [ ...this.coursesSelected ];
      const coursesSelectedNames = this.coursesSelected.map((csn) => csn.courseName);
      this.studentDetail.courseSelected = coursesSelectedNames;
    }
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  };
}
