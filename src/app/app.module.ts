import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
// DataTable Module
import { DataTablesModule } from 'angular-datatables';
// Toast notif
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

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
    ToastrModule.forRoot(), 
    BrowserAnimationsModule
   // provideClientHydration(),
   // SharedService
  ],
  exports: [BrowserModule, ToastrModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
