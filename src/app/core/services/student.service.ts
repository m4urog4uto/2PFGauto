import { Injectable } from '@angular/core';
import { Student } from '../models';
import { BehaviorSubject, Observable, find, map, pipe } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private students$ = new BehaviorSubject<Student[]>([
    { id: 1, name: 'Carlos', surname: 'Calvo', dni: '41332232', email: 'carlos.calvo@gmail.com', phone: '1122334455', courseSelected: 'Angular' },
    { id: 2, name: 'Melina', surname: 'Perez', dni: '41332232', email: 'melina.perez@gmail.com', phone: '1133445566', courseSelected: 'Fullstack MERN' },
    { id: 3, name: 'Julieta', surname: 'Rodriguez', dni: '42541232', email: 'julieta.rodriguez@gmail.com', phone: '1144556677', courseSelected: 'JavaScript' }
  ])

  constructor() {}

  updateStudentList(students: Student[]): void {
    this.students$.next(students);
    this.students$.subscribe(console.log)
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
