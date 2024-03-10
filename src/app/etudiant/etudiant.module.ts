import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EtudiantRoutingModule } from './etudiant-routing.module';
import { PreinscriptionComponent } from './preinscription/preinscription.component';
import { InscriptionComponent } from './inscription/inscription.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { NouveauPreinscriptionComponent } from './nouveau-preinscription/nouveau-preinscription.component';
import { NouveauInscriptionComponent } from './nouveau-inscription/nouveau-inscription.component';
import { ListesInscriptionComponent } from './listes-inscription/listes-inscription.component';
import { ListesPreinscriptionComponent } from './listes-preinscription/listes-preinscription.component';

@NgModule({
  declarations: [
    PreinscriptionComponent,
    InscriptionComponent,
    NouveauPreinscriptionComponent,
    NouveauInscriptionComponent,
    ListesInscriptionComponent,
    ListesPreinscriptionComponent,
 
  ], 
  imports: [
    CommonModule,
    EtudiantRoutingModule,
    ReactiveFormsModule,
    ToastrModule.forRoot({ timeOut: 6000 }),
  ]
})
export class EtudiantModule { }
