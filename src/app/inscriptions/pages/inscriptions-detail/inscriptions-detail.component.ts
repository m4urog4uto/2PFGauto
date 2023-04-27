import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Inscription } from 'src/app/core/models';
import { InscriptionsService } from '../../../core/services/inscriptions.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detail-class',
  templateUrl: './inscriptions-detail.component.html',
  styleUrls: ['./inscriptions-detail.component.css']
})
export class InscriptionsDetailComponent {

  inscriptionsDetail: Inscription | undefined;

  constructor(
    private inscriptionsService: InscriptionsService,
    private activatedRoute: ActivatedRoute
  ) {
    // TODO: cuando quiero visualizar una comision que cree mediante formulario, no lo encuentra
    this.inscriptionsService.getInscriptionDetail(parseInt(this.activatedRoute.snapshot.params['commission']))
      .subscribe((inscriptionDetail) => this.inscriptionsDetail = inscriptionDetail);
  }

  removeInscriptionStudent(ev: number): void {
    if (ev && this.inscriptionsDetail) {
      const studentId = this.inscriptionsDetail.students.findIndex((obj) => obj.id === ev);
      if (studentId > -1) {
        this.inscriptionsDetail?.students.splice(studentId, 1);
      };
  
      this.inscriptionsDetail.students = [ ...this.inscriptionsDetail?.students ];
    }
  }

}
