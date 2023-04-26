import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Inscription, InscriptionsStudents, Mentor } from '../../../core/models/inscriptions.model';


interface DialogData {
  inscription: Inscription;
}

interface MentorOptions {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-modal',
  templateUrl: './modal-form-inscriptions.component.html',
  styleUrls: ['./modal-form-inscriptions.component.css']
})
export class ModalFormInscriptionComponent {

  inscriptionForm: FormGroup;

  commissionCtrl: FormControl<number | null>;
  courseNameCtrl: FormControl<string | null>;
  mentorsCtrl: FormControl<Mentor[] | null>;
  studentsCtrl: FormControl<InscriptionsStudents[] | null>;

  mentorsList: MentorOptions[] = [
    {value: 'Carlos Garcia', viewValue: 'Carlos Garcia'},
    {value: 'Yamila Gimenez', viewValue: 'Yamila Gimenez'},
    {value: 'Juan Lopez', viewValue: 'Juan Lopez'},
    {value: 'Ricardo Moreno', viewValue: 'Ricardo Moreno'},
    {value: 'Nicolas Patrizi', viewValue: 'Nicolas Patrizi'},
    {value: 'Sonia Gonzales', viewValue: 'Sonia Gonzales'}
  ];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private dialogRef: MatDialogRef<ModalFormInscriptionComponent>,
    public formBuilder: FormBuilder
  ) {
    const { id, commission, courseName, mentors, students } = data.inscription;
    
    this.commissionCtrl = new FormControl(commission, [ Validators.required ]);
    this.courseNameCtrl = new FormControl(courseName, [ Validators.required ]);
    this.mentorsCtrl = new FormControl(mentors, [ Validators.required, Validators.email ]);
    this.studentsCtrl = new FormControl(students, [ Validators.required ]);

    this.inscriptionForm = this.formBuilder.group({
      id: new FormControl(id, []),
      commission: this.commissionCtrl,
      courseName: this.courseNameCtrl,
      mentorsCtrl: this.mentorsCtrl,
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
