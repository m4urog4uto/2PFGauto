import { Component, OnDestroy } from '@angular/core';
import { Observable, Subject, map, takeUntil } from 'rxjs';
import { Course, Inscription, InscriptionsStudents, Student } from 'src/app/core/models';
import { InscriptionsService } from '../../../core/services/inscriptions.service';
import { ActivatedRoute } from '@angular/router';
import { StudentService } from 'src/app/core/services/student.service';
import { CoursesService } from 'src/app/core/services/courses.service';

@Component({
  selector: 'app-detail-class',
  templateUrl: './inscriptions-detail.component.html',
  styleUrls: ['./inscriptions-detail.component.css']
})
export class InscriptionsDetailComponent implements OnDestroy {

  inscriptionsDetail: Inscription | undefined;
  destroyed$ = new Subject<void>();
  studentsAssigned: Student[] = [];
  coursesAssigned: Course | undefined; 

  constructor(
    private inscriptionsService: InscriptionsService,
    private activatedRoute: ActivatedRoute,
    private studentService: StudentService,
    private coursesService: CoursesService
  ) {

    this.inscriptionsService.getInscriptionDetail(parseInt(this.activatedRoute.snapshot.params['commission']))
      .pipe(takeUntil(this.destroyed$))
      .subscribe((inscriptionDetail) => this.inscriptionsDetail = inscriptionDetail);
    
    this.studentService.getStudentList()
      .pipe(
        map((students) => students.filter((student) => this.inscriptionsDetail?.students.includes(`${student.name} ${student.surname}`))
      ))
      .subscribe((result) => this.studentsAssigned = result)

    this.coursesService.getCoursesList()
      .pipe(
        takeUntil(this.destroyed$),
        map((courses) => courses.find((course) => course.courseName = String(this.inscriptionsDetail?.courseName))
      ))
      .subscribe((result) => this.coursesAssigned = result)
    
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  };

  removeInscriptionStudent(id: number): void {
    // debugger;
    if (this.studentsAssigned && this.inscriptionsDetail) {
      const studentId = this.studentsAssigned.findIndex((obj) => obj.id === id);
      if (studentId > -1) {
        this.studentsAssigned.splice(studentId, 1);
      };

      this.studentsAssigned = [ ...this.studentsAssigned ];
      const studentsAssignedNames = this.studentsAssigned.map((san) => `${san.name} ${san.surname}`)
      this.inscriptionsDetail.students = studentsAssignedNames;
    }
  }

}
