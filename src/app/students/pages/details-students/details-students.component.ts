import { Component, OnDestroy } from '@angular/core';
import { Observable, Subject, takeUntil } from 'rxjs';
import { Student } from 'src/app/core/models';
import { StudentService } from '../../../core/services/student.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-details-students',
  templateUrl: './details-students.component.html',
  styleUrls: ['./details-students.component.css']
})
export class DetailsStudentsComponent {

  studentDetail$: Observable<Student | undefined>;

  constructor(private studentService: StudentService, private activatedRoute: ActivatedRoute,) {
    this.studentDetail$ = this.studentService.getStudentDetail(parseInt(this.activatedRoute.snapshot.params['studentId']));
  }
}
