import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AvecModuleComponent } from './avec-module/avec-module.component';
import { SansModuleComponent } from './sans-module/sans-module.component';
import { NoteExamenComponent } from './note-examen/note-examen.component';
import { AnonymatFormComponent } from './anonymat-form/anonymat-form.component';

const routes: Routes = [
  {
    path: "avecmodule",
    component: AvecModuleComponent
  },
  {
    path: "module",
    component: SansModuleComponent
  },
  {
    path: "anonymat",
    component: AnonymatFormComponent
  },
  {
    path: "examen",
    component: NoteExamenComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NoteRoutingModule { }
