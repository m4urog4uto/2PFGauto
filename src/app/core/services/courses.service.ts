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
      id: 1,
      courseName: 'Node JS',
      description: 'Es un entorno controlado por eventos diseñado para crear aplicaciones escalables, permitiéndote establecer y gestionar múltiples conexiones al mismo tiempo. Gracias a esta característica, no tienes que preocuparte con el bloqueo de procesos, pues no hay bloqueos.',
      duration: '3 meses'
    },
    {
      id: 1,
      courseName: 'Ciberseguridad',
      description: 'Gestiona todos los riesgos que pueden presentarse en tu organización. Visualiza de manera clara el número de riegos y toma decisiones oportunas. Conoce Más. Prueba gratis por 15 días. Sin Tarjeta de crédito. Conferencias Virtuales. Escuela Gestión Riesgos.',
      duration: '3 meses'
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
