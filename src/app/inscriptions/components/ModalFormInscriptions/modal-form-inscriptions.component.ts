import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Inscription, InscriptionsStudents, Mentor } from '../../../core/models/inscriptions.model';
import { InscriptionsService } from '../../../core/services/inscriptions.service';
import { Observable, take, takeUntil } from 'rxjs';
import { Course } from 'src/app/core/models';


interface DialogData {
  inscription: Inscription;
}

@Component({
  selector: 'app-modal',
  templateUrl: './modal-form-inscriptions.component.html',
  styleUrls: ['./modal-form-inscriptions.component.css']
})
export class ModalFormInscriptionComponent {

  inscriptionForm: FormGroup;

  commissionCtrl: FormControl<number | null>;
  courseSelectedCtrl: FormControl<Course | null>;
  mentorsCtrl: FormControl<Mentor[] | null>;
  studentsCtrl: FormControl<InscriptionsStudents[] | null>;

  mentorsList$: Observable<Mentor[]>;
  studentsList$: Observable<InscriptionsStudents[]>;
  coursesList$: Observable<Course[]>;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private dialogRef: MatDialogRef<ModalFormInscriptionComponent>,
    public formBuilder: FormBuilder,
    private inscriptionsService: InscriptionsService
  ) {
    this.studentsList$ = this.inscriptionsService.getInscriptionsStudents();
    this.mentorsList$ = this.inscriptionsService.getInscriptionsMentors();
    this.coursesList$ = this.inscriptionsService.getListOfCourses();

    const { id, commission, courseSelected, mentors, students } = data.inscription;

    this.commissionCtrl = new FormControl(commission, [ Validators.required ]);
    this.courseSelectedCtrl = new FormControl(courseSelected, [ Validators.required ]);
    this.mentorsCtrl = new FormControl(mentors, [ Validators.required ]);
    this.studentsCtrl = new FormControl(students, [ Validators.required ]);

    this.inscriptionForm = this.formBuilder.group({
      id: new FormControl(id, []),
      commission: this.commissionCtrl,
      courseSelected: this.courseSelectedCtrl,
      mentors: this.mentorsCtrl,
      students: this.studentsCtrl
    });
  }

  onSubmit(): void {
    this.dialogRef.close(this.inscriptionForm.value);
  }

  onClose(): void {
    this.dialogRef.close();
  }
}
