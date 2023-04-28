import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Student } from 'src/app/core/models';
import { ModalFormStudentComponent } from '../../components/ModalFormStudent/modal-form-student.component';
import { StudentService } from '../../../core/services/student.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-dashboard-students',
  templateUrl: './dashboard-students.component.html',
  styleUrls: ['./dashboard-students.component.css']
})
export class DashboardStudentsComponent {
  students: Student[] = [];
  destroyed$ = new Subject<void>();

  constructor(
    private dialogService: MatDialog,
    private studentService: StudentService
  ) {
    studentService.getStudentList()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((students) => this.students = students)
  }


  addStudentForm(): void {
    const dialogo = this.dialogService.open(ModalFormStudentComponent, {
      data: {
        alumno: {
          name: '',
          surname: '',
          dni: '',
          email: '',
          phone: '',
          courseSelected: ''
        }
      }
    });

    dialogo.afterClosed().subscribe(result => {
      if (result.dni) {
        const newStudent = { ...result, id: this.students.length + 1 }
        this.students = [ ...this.students, newStudent ];
        this.studentService.updateStudentList(this.students);
      }
    });
  }

  removeStudent(ev: number): void {
    const studentId = this.students.findIndex((obj) => obj.id === ev);
    if (studentId > -1) {
      this.students.splice(studentId, 1);
    };

    this.students = [ ...this.students ];
    this.studentService.updateStudentList(this.students);
  }

  editStudent(ev: number): void {
    const studentId = this.students.find((obj) => obj.id === ev);
    if (studentId) {
      const { id, name, surname, dni, email, phone, courseSelected } = studentId;
      const dialogo = this.dialogService.open(ModalFormStudentComponent, {
        data: {
          alumno: {
            id,
            name,
            surname,
            dni,
            email,
            phone,
            courseSelected
          }
        }
      });

      dialogo.afterClosed().subscribe((result: Student) => {
        if (result) {
          const newAlumnosList = this.students.map(obj => {
            if (obj.id === result.id) {
              return { ...obj, ...result }
            }
            return obj;
          })
          this.students = [ ...newAlumnosList ];
          this.studentService.updateStudentList(this.students);
        }
      });

    }
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  };
}
