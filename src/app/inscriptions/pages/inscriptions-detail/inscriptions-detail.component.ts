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

  inscriptionsDetail$: Observable<Inscription | undefined>;

  constructor(
    private inscriptionsService: InscriptionsService,
    private activatedRoute: ActivatedRoute
  ) {
    this.inscriptionsDetail$ = this.inscriptionsService.getInscriptionDetail(parseInt(this.activatedRoute.snapshot.params['commission']));
  }

}
