import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EtudiantRoutingModule } from './etudiant-routing.module';
import { PreinscriptionComponent } from './preinscription/preinscription.component';
import { InscriptionComponent } from './inscription/inscription.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    PreinscriptionComponent,
    InscriptionComponent
  ],
  imports: [
    CommonModule,
    EtudiantRoutingModule,
    ReactiveFormsModule,
  ]
})
export class EtudiantModule { }
