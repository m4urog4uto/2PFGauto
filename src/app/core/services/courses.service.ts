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
    },
    {
      id: 2,
      courseName: 'Node JS',
      description: 'Node.js es un entorno en tiempo de ejecución multiplataforma, de código abierto, para la capa del servidor basado en el lenguaje de programación JavaScript, asíncrono, con E/S de datos en una arquitectura orientada a eventos y basado en el motor V8 de Google.',
      duration: '3 meses'
    },
    {
      id: 3,
      courseName: 'Ciberseguridad',
      description: 'La ciberseguridad, también conocida como seguridad digital, es la práctica de proteger su información digital, dispositivos y activos. Esto incluye información personal, cuentas, archivos, fotos e incluso el dinero.',
      duration: '5 meses'
    }
  ])

  constructor() {}

  updateCourseList(courses: Course[]): void {
    this.courses$.next(courses);
  }

  getCoursesList(): Observable<Course[]> {
    return this.courses$.asObservable();
  }
}
