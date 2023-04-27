import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { Inscription, InscriptionsStudents, Mentor } from '../models';

@Injectable({
  providedIn: 'root'
})
export class InscriptionsService {

  
  private inscriptions$ = new BehaviorSubject<Inscription[]>([
    {
      id: 1,
      commission: 11232,
      courseName: 'Angular',
      mentors: [
        { id: 1, fullName: 'Carlos Garcia' },
        { id: 2, fullName: 'Yamila Gimenez' }
      ],
      students: [
        { id: 1, fullName: 'Carlos Calvo', dni: '41332232'},
        { id: 2, fullName: 'Manuel Perez', dni: '42334622'},
        { id: 3, fullName: 'Lucia Llanos', dni: '43432536'}
      ]
    },
    {
      id: 2,
      commission: 31123,
      courseName: 'Node JS',
      mentors: [
        { id: 1, fullName: 'Juan Lopez' },
        { id: 2, fullName: 'Ricardo Moreno' }
      ],
      students: [
        { id: 1, fullName: 'Maria Flores', dni: '42142532'},
        { id: 2, fullName: 'José Hernández', dni: '40454232'},
        { id: 3, fullName: 'Antonio Torres', dni: '39412576'}
      ]
    },
    {
      id: 3,
      commission: 44344,
      courseName: 'Ciberseguridad',
      mentors: [
        { id: 1, fullName: 'Sonia Gonzales' },
        { id: 2, fullName: 'Nicolas Patrizi' }
      ],
      students: [
        { id: 1, fullName: 'Daniel Díaz', dni: '43355892'},
        { id: 2, fullName: 'Miguel Rodríguez', dni: '37344522'},
        { id: 3, fullName: 'Francisco Ortiz', dni: '44532146'}
      ]
    }
  ])

  private inscriptionsStudents$ = new BehaviorSubject<InscriptionsStudents[]>([
    { id: 1, fullName: 'Carlos Calvo', dni: '41332232'},
    { id: 2, fullName: 'Manuel Perez', dni: '42334622'},
    { id: 3, fullName: 'Lucia Llanos', dni: '43432536'},
    { id: 4, fullName: 'Maria Flores', dni: '42142532'},
    { id: 5, fullName: 'José Hernández', dni: '40454232'},
    { id: 6, fullName: 'Antonio Torres', dni: '39412576'},
    { id: 7, fullName: 'Daniel Díaz', dni: '43355892'},
    { id: 8, fullName: 'Miguel Rodríguez', dni: '37344522'},
    { id: 9, fullName: 'Francisco Ortiz', dni: '44532146'}
  ]);

  private inscriptionsMentors$ = new BehaviorSubject<Mentor[]>([
    { id: 1, fullName: 'Carlos Garcia' },
    { id: 2, fullName: 'Yamila Gimenez' },
    { id: 3, fullName: 'Juan Lopez' },
    { id: 4, fullName: 'Ricardo Moreno' },
    { id: 5, fullName: 'Sonia Gonzales' },
    { id: 6, fullName: 'Nicolas Patrizi' }
  ]);

  constructor() {}

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
    return this.inscriptionsStudents$.asObservable();
  }

  getInscriptionsMentors(): Observable<Mentor[]> {
    return this.inscriptionsMentors$.asObservable();
  }
}
