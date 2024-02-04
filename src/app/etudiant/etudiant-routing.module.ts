import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PreinscriptionComponent } from './preinscription/preinscription.component';
import { InscriptionComponent } from './inscription/inscription.component';

const routes: Routes = [
  {
    path : "preinscription",
    component : PreinscriptionComponent
  },
  {
    path : "inscription",
    component : InscriptionComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EtudiantRoutingModule { }
