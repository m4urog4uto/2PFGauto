import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Course } from '../models';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  private courses$ = new BehaviorSubject<Course[]>([
    {
      id: 1,
      courseName: 'Angular',
      description: 'Framework para aplicaciones web desarrollado en TypeScript, de código abierto, mantenido por Google, que se utiliza para crear y mantener aplicaciones web de una sola página',
      duration: '3 meses'
    }])

  constructor() {}

  updateCourseList(courses: Course[]): void {
    this.courses$.next(courses);
  }

  getCoursesList(): Observable<Course[]> {
    return this.courses$.asObservable();
  }
}
