import { Component } from '@angular/core';
import { InscriptionsService } from '../../../core/services/inscriptions.service';
import { Observable } from 'rxjs';
import { Inscription } from 'src/app/core/models';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dashboard-inscriptions',
  templateUrl: './dashboard-inscriptions.component.html',
  styleUrls: ['./dashboard-inscriptions.component.css']
})
export class DashboardInscriptionsComponent {
  classes: Inscription[] = [];

  constructor(
    private inscriptionsService: InscriptionsService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.inscriptionsService.getInscriptionsList().subscribe((inscriptions) => this.classes = inscriptions);
  }

  addClassForm(): void {
    console.log('añadir');
  }

  detailClass(comnission: number): void {
    this.router.navigate([comnission], {
      relativeTo: this.activatedRoute
    })
  }
}
