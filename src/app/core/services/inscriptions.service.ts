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
        { id: 1, fullName: 'Carlos Garcia' },
        { id: 2, fullName: 'Yamila Gimenez' }
      ],
      students: [
        { id: 1, fullName: 'Carlos Calvo', dni: '41332232'},
        { id: 2, fullName: 'Manuel Perez', dni: '42334622'},
        { id: 3, fullName: 'Lucia Llanos', dni: '43432536'}
      ]
    }
  ])

  private inscriptionsStudentsList$: Observable<InscriptionsStudents[]>;

  private inscriptionsMentors$ = new BehaviorSubject<Mentor[]>([
    { id: 1, fullName: 'Carlos Garcia' },
    { id: 2, fullName: 'Yamila Gimenez' },
    { id: 3, fullName: 'Juan Lopez' },
    { id: 4, fullName: 'Ricardo Moreno' },
    { id: 5, fullName: 'Sonia Gonzales' },
    { id: 6, fullName: 'Nicolas Patrizi' }
  ]);

  constructor(
    private coursesService: CoursesService,
    private studentService: StudentService
  ) {
    this.courses$ = this.coursesService.getCoursesList();

    this.inscriptionsStudentsList$ = this.studentService.getStudentList()
      .pipe(
        map((students) => students.map((student) => {
          return { 
            id: student.id,
            fullName: `${student.name} ${student.surname}`,
            dni: student.dni
          }
        }))
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

  getInscriptionsStudents(): Observable<InscriptionsStudents[]> {
    return this.inscriptionsStudentsList$;
  }

  getInscriptionsMentors(): Observable<Mentor[]> {
    return this.inscriptionsMentors$.asObservable();
  }

  getListOfCourses(): Observable<Course[]> {
    return this.courses$;
  }
}
