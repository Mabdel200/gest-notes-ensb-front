import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AvecModuleComponent } from './avec-module/avec-module.component';
import { SansModuleComponent } from './sans-module/sans-module.component';

const routes: Routes = [
  {
    path: "avecmodule",
    component: AvecModuleComponent
  },
  {
    path: "module",
    component: SansModuleComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NoteRoutingModule { }
