import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NoteRoutingModule } from './note-routing.module';
import { AvecModuleComponent } from './avec-module/avec-module.component';
import { SansModuleComponent } from './sans-module/sans-module.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NoteExamenComponent } from './note-examen/note-examen.component';
import { AnonymatFormComponent } from './anonymat-form/anonymat-form.component';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    AvecModuleComponent,
    SansModuleComponent,
    NoteExamenComponent,
    AnonymatFormComponent,
  ],
  imports: [
    CommonModule,
    NoteRoutingModule,
    ReactiveFormsModule,
    ToastrModule.forRoot({ timeOut: 6000 }),
  ]
})
export class NoteModule { }
