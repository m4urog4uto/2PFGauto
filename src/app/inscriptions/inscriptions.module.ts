import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardInscriptionsComponent } from './pages/inscriptions/dashboard-inscriptions.component';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../shared/material/material.module';
import { InscriptionsDetailComponent } from './pages/inscriptions-detail/inscriptions-detail.component';
import { ModalFormInscriptionComponent } from './components/ModalFormInscriptions/modal-form-inscriptions.component';
import { TableInscriptionComponent } from './components/TableInscriptions/table-inscriptions.component';
import { DirectivesModule } from '../shared/directives/directives.module';
import { PipesModule } from '../shared/pipes/pipes.module';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    DashboardInscriptionsComponent,
    InscriptionsDetailComponent,
    TableInscriptionComponent,
    ModalFormInscriptionComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule,
    DirectivesModule,
    PipesModule,
    ReactiveFormsModule,
  ]
})
export class InscriptionsModule { }
