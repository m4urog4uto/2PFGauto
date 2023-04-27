import { Component, OnDestroy } from '@angular/core';
import { Observable, Subject, takeUntil } from 'rxjs';
import { Inscription } from 'src/app/core/models';
import { InscriptionsService } from '../../../core/services/inscriptions.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detail-class',
  templateUrl: './inscriptions-detail.component.html',
  styleUrls: ['./inscriptions-detail.component.css']
})
export class InscriptionsDetailComponent implements OnDestroy {

  inscriptionsDetail: Inscription | undefined;
  destroyed$ = new Subject<void>();

  constructor(
    private inscriptionsService: InscriptionsService,
    private activatedRoute: ActivatedRoute
  ) {

    this.inscriptionsService.getInscriptionDetail(parseInt(this.activatedRoute.snapshot.params['commission']))
      .pipe(takeUntil(this.destroyed$))
      .subscribe((inscriptionDetail) => this.inscriptionsDetail = inscriptionDetail);
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  };

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
