import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { Course, Inscription, InscriptionsStudents, Mentor } from '../models';
import { CoursesService } from './courses.service';
import { StudentService } from './student.service';

@Injectable({
  providedIn: 'root'
})
export class InscriptionsService {

  private courses$: Observable<string[]>;

  private inscriptions$ = new BehaviorSubject<Inscription[]>([
    {
      id: 1,
      commission: 11232,
      courseName: 'Angular',
      mentors: [
        'Carlos Garcia',
        'Yamila Gimenez'
      ],
      students: [
        'Carlos Calvo'
      ]
    }
  ])

  private inscriptionsStudentsList$: Observable<string[]>;

  private inscriptionsMentors$ = new BehaviorSubject<string[]>([
    'Carlos Garcia',
    'Yamila Gimenez',
    'Juan Lopez',
    'Ricardo Moreno',
    'Sonia Gonzales',
    'Nicolas Patrizi'
  ]);

  constructor(
    private coursesService: CoursesService,
    private studentService: StudentService
  ) {
    this.courses$ = this.coursesService.getCoursesList()
      .pipe(
        map((courses) => courses.map((course) => course.courseName))
      )

    this.inscriptionsStudentsList$ = this.studentService.getStudentList()
      .pipe(
        map((students) => students.map((student) => `${student.name} ${student.surname}`))
      )
  }

  updateInscriptionsList(inscriptions: Inscription[]): void {
    this.inscriptions$.next(inscriptions);
  }

  getInscriptionsList(): Observable<Inscription[]> {
    return this.inscriptions$.asObservable();
  }

  getInscriptionDetail(commission: number): Observable<Inscription | undefined> {
    return this.inscriptions$.asObservable()
      .pipe(
        map((inscriptions: Inscription[]) => inscriptions.find((inscription) => inscription.commission === commission))
      )
  }

  getInscriptionsStudents(): Observable<string[]> {
    return this.inscriptionsStudentsList$;
  }

  getInscriptionsMentors(): Observable<string[]> {
    return this.inscriptionsMentors$.asObservable();
  }

  getListOfCourses(): Observable<string[]> {
    return this.courses$;
  }
}
