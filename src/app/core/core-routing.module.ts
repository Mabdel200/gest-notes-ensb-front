import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './pages/auth/auth.component';

const routes: Routes = [
  {
    path : "authenticate",
    component : AuthComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoreRoutingModule { }
