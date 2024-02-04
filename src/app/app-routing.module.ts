import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './core/pages/auth/auth.component';

const routes: Routes = [
  {
    path: "administrator",
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
  },
  {
    path: "login",
    loadChildren: () => import('./core/core.module').then(m => m.CoreModule)
  },
  {
    path: "etudiant",
    loadChildren: () => import('./etudiant/etudiant.module').then(m => m.EtudiantModule)
  },
  {
    path: "notes",
    loadChildren: () => import('./note/note.module').then(m => m.NoteModule)
  },
  // {
  //   path: "",
  //   component: AuthComponent
  // },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
