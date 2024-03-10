import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PreinscriptionComponent } from './preinscription/preinscription.component';
import { InscriptionComponent } from './inscription/inscription.component';
import { NouveauPreinscriptionComponent } from './nouveau-preinscription/nouveau-preinscription.component';
import { NouveauInscriptionComponent } from './nouveau-inscription/nouveau-inscription.component';
import { ListesPreinscriptionComponent } from './listes-preinscription/listes-preinscription.component';
import { ListesInscriptionComponent } from './listes-inscription/listes-inscription.component';

const routes: Routes = [
  {
    path : "preinscription",
    component : PreinscriptionComponent
  },
  {
    path : "inscription",
    component : InscriptionComponent
  }, 
  {
    path : "nouveaupreinscription",
    component : NouveauPreinscriptionComponent
  }, 
  {
    path : "updatepreinscription/:slug",
    component : NouveauPreinscriptionComponent
  },
  {
    path : "nouveauinscription",
    component : NouveauInscriptionComponent
  }, 
  {
    path : "updateinscription/:slug",
    component : NouveauInscriptionComponent
  }, 
  {
    path : "listepreinscription",
    component : ListesPreinscriptionComponent
  }, 
  {
    path : "listeinscription",
    component : ListesInscriptionComponent
  }, 
  
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EtudiantRoutingModule { }
