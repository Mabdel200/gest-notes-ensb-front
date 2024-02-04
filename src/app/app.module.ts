import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
// DataTable Module
import { DataTablesModule } from 'angular-datatables';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CoreModule,
    ReactiveFormsModule,
    FormsModule,
    DataTablesModule,
   // provideClientHydration(),
   // SharedService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
