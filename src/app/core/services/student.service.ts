import { Injectable } from '@angular/core';
import { Student } from '../models';
import { BehaviorSubject, Observable, find, map, pipe } from 'rxjs';
import { CoursesService } from './courses.service';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private courses$: Observable<string[]>;

  private students$ = new BehaviorSubject<Student[]>([
    { id: 1, name: 'Carlos', surname: 'Calvo', dni: '41332232', email: 'carlos.calvo@gmail.com', phone: '1122334455', courseSelected: ['Angular', 'Node JS']}])

  constructor(
    private coursesService: CoursesService
  ) {
    this.courses$ = this.coursesService.getCoursesList().pipe(
      map((courses) => courses.map((course) => course.courseName))
    );
  }

  updateStudentList(students: Student[]): void {
    this.students$.next(students);
  }

  getListOfCourses(): Observable<string[]> {
    return this.courses$;
  }

  getStudentList(): Observable<Student[]> {
    return this.students$.asObservable();
  }

  getStudentDetail(id: number): Observable<Student | undefined> {
    return this.students$.asObservable()
      .pipe(
        map((students: Student[]) => students.find((student) => student.id === id))
      )
  }
}
