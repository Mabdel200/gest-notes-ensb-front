import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AvecModuleComponent } from './avec-module/avec-module.component';
import { SansModuleComponent } from './sans-module/sans-module.component';
import { NoteExamenComponent } from './note-examen/note-examen.component';
import { AnonymatFormComponent } from './anonymat-form/anonymat-form.component';
import { ListNoteComponent } from './list-note/list-note.component';
import { FormNoteComponent } from './form-note/form-note.component';
import { FormNoteEcComponent } from './form-note-ec/form-note-ec.component';
import { UpdateNoteEcComponent } from './update-note-ec/update-note-ec.component';
import { UpdateNoteUeComponent } from './update-note-ue/update-note-ue.component';


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
  },
  {
    path: "listenote",
    component: ListNoteComponent
  },
  {
    path: "nouvelle",
    component: FormNoteComponent
  },
  {
    path: "nouvelleec",
    component: FormNoteEcComponent
  },
  {
    path: "updatenoteec/:slug",
    component: UpdateNoteEcComponent
  },
  {
    path: "updatenoteue/:slug",
    component: UpdateNoteUeComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NoteRoutingModule { }
