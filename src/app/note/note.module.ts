import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NoteRoutingModule } from './note-routing.module';
import { AvecModuleComponent } from './avec-module/avec-module.component';
import { SansModuleComponent } from './sans-module/sans-module.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AvecModuleComponent,
    SansModuleComponent
  ],
  imports: [
    CommonModule,
    NoteRoutingModule,
    ReactiveFormsModule,
  ]
})
export class NoteModule { }
