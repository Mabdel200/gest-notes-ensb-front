import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NoteRoutingModule } from './note-routing.module';
import { AvecModuleComponent } from './avec-module/avec-module.component';
import { SansModuleComponent } from './sans-module/sans-module.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NoteExamenComponent } from './note-examen/note-examen.component';
import { AnonymatFormComponent } from './anonymat-form/anonymat-form.component';
import { ToastrModule } from 'ngx-toastr';
import { ListNoteComponent } from './list-note/list-note.component';
import { FormNoteComponent } from './form-note/form-note.component';
import { FormNoteEcComponent } from './form-note-ec/form-note-ec.component';
import { UpdateNoteEcComponent } from './update-note-ec/update-note-ec.component';
import { UpdateNoteUeComponent } from './update-note-ue/update-note-ue.component';

@NgModule({
  declarations: [
    AvecModuleComponent,
    SansModuleComponent,
    NoteExamenComponent,
    AnonymatFormComponent,
    ListNoteComponent,
    FormNoteComponent,
    FormNoteEcComponent,
    UpdateNoteUeComponent,
    UpdateNoteEcComponent,
  ],
  imports: [
    CommonModule,
    NoteRoutingModule,
    ReactiveFormsModule,
    ToastrModule.forRoot({ timeOut: 6000 }),
  ]
})
export class NoteModule { }
