import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreRoutingModule } from './core-routing.module';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { AuthComponent } from './pages/auth/auth.component';


@NgModule({
  declarations: [
    SidebarComponent,
    HeaderComponent,
    FooterComponent,
    AuthComponent
  ],
  imports: [
    CommonModule,
    CoreRoutingModule
  ],
  exports : [
    SidebarComponent,
    HeaderComponent,
    FooterComponent,
  ],
})
export class CoreModule { }
