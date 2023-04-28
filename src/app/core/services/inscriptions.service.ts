import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { Course, Inscription, InscriptionsStudents, Mentor } from '../models';
import { CoursesService } from './courses.service';
import { StudentService } from './student.service';

@Injectable({
  providedIn: 'root'
})
export class InscriptionsService {

  private courses$: Observable<Course[]>;

  private inscriptions$ = new BehaviorSubject<Inscription[]>([
    {
      id: 1,
      commission: 11232,
      courseSelected: {
        id: 1,
        courseName: 'Angular',
        description: 'Framework para aplicaciones web desarrollado en TypeScript, de código abierto, mantenido por Google, que se utiliza para crear y mantener aplicaciones web de una sola página',
        duration: '3 meses'
      },
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
    this.courses$ = this.coursesService.getCoursesList();

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

  getListOfCourses(): Observable<Course[]> {
    return this.courses$;
  }
}
