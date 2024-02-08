import { NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DepartementComponent } from './departement/departement.component';
import { AnneeAcademiqueComponent } from './annee-academique/annee-academique.component';
import { DepartementFormComponent } from './departement-form/departement-form.component';
import { AnneeAcademiqueFormComponent } from './annee-academique-form/annee-academique-form.component';
import { TypeCoursFormComponent } from './type-cours-form/type-cours-form.component';
import { TypeCoursComponent } from './type-cours/type-cours.component';
import { FiliereComponent } from './filiere/filiere.component';
import { FiliereFormComponent } from './filiere-form/filiere-form.component';
import { CycleComponent } from './cycle/cycle.component';
import { EvaluationComponent } from './evaluation/evaluation.component';
import { EvaluationFormComponent } from './evaluation-form/evaluation-form.component';
import { NiveauComponent } from './niveau/niveau.component';
import { NiveauFormComponent } from './niveau-form/niveau-form.component';
import { ParcoursComponent } from './parcours/parcours.component';
import { ParcoursFormComponent } from './parcours-form/parcours-form.component';
import { SemestreComponent } from './semestre/semestre.component';
import { SemestreFormComponent } from './semestre-form/semestre-form.component';
import { CoursComponent } from './cours/cours.component';
import { CoursFormComponent } from './cours-form/cours-form.component';
import { CoursFormMultipleComponent } from './cours-form-multiple/cours-form-multiple.component';
import { CreditComponent } from './credit/credit.component';
import { CreditFormComponent } from './credit-form/credit-form.component';
import { ModuleComponent } from './module/module.component';
import { ModuleFormComponent } from './module-form/module-form.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { DepartementFormMultipleComponent } from './departement-form-multiple/departement-form-multiple.component';
import { FiliereFormMultipleComponent } from './filiere-form-multiple/filiere-form-multiple.component';
import { ModuleFormMultipleComponent } from './module-form-multiple/module-form-multiple.component';
import { SharedService } from '../core/services/shared.service';
import { CycleFormComponent } from './cycle-form/cycle-form.component';
import { EtudiantListeComponent } from './etudiant-liste/etudiant-liste.component';
import { PvListeComponent } from './pv-liste/pv-liste.component';
// Add Module DataTable 
import { DataTablesModule } from 'angular-datatables';

@NgModule({
  declarations: [
    DashboardComponent,
    DepartementComponent,
    AnneeAcademiqueComponent,
    DepartementFormComponent,
    AnneeAcademiqueFormComponent,
    TypeCoursFormComponent,
    TypeCoursComponent,
    FiliereComponent,
    FiliereFormComponent,
    CycleComponent,
    EvaluationComponent,
    EvaluationFormComponent,
    NiveauComponent,
    NiveauFormComponent,
    ParcoursComponent,
    ParcoursFormComponent,
    SemestreComponent,
    SemestreFormComponent,
    CoursComponent,
    CoursFormComponent,
    CreditComponent,
    CreditFormComponent,
    ModuleComponent,
    CycleFormComponent,
    ModuleFormComponent,
    CoursFormMultipleComponent,
    DepartementFormMultipleComponent,
    FiliereFormMultipleComponent,
    ModuleFormMultipleComponent,
    EtudiantListeComponent,
    PvListeComponent,
    
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    // For DataTable Module
    DataTablesModule,
    ToastrModule.forRoot({ timeOut: 6000 }),
   

  ],
  providers: [
    SharedService
  ]
})

export class AdminModule implements OnInit {
  constructor(private sharedService: SharedService) {
    sharedService.updateDisplayPage(false)


  }

  ngOnInit(): void {
    this.sharedService.updateDisplayPage(true)

  }
}
