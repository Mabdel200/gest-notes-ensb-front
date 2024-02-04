import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EvaluationComponent } from './evaluation/evaluation.component';
import { EvaluationFormComponent } from './evaluation-form/evaluation-form.component';
import { NiveauComponent } from './niveau/niveau.component';
import { NiveauFormComponent } from './niveau-form/niveau-form.component';
import { ParcoursComponent } from './parcours/parcours.component';
import { ParcoursFormComponent } from './parcours-form/parcours-form.component';
import { SemestreComponent } from './semestre/semestre.component';
import { SemestreFormComponent } from './semestre-form/semestre-form.component';
import { CoursComponent } from './cours/cours.component';
import { CoursFormComponent } from './cours-form/cours-form.component';
import { CreditComponent } from './credit/credit.component';
import { CreditFormComponent } from './credit-form/credit-form.component';
import { ModuleComponent } from './module/module.component';
import { ModuleFormComponent } from './module-form/module-form.component';
import { CoursFormMultipleComponent } from './cours-form-multiple/cours-form-multiple.component';
import { DepartementFormMultipleComponent } from './departement-form-multiple/departement-form-multiple.component';
import { FiliereFormMultipleComponent } from './filiere-form-multiple/filiere-form-multiple.component';
import { CycleFormMultipleComponent } from './cycle-form-multiple/cycle-form-multiple.component';
import { EvaluationFormMultipleComponent } from './evaluation-form-multiple/evaluation-form-multiple.component';
import { NiveauFormMultipleComponent } from './niveau-form-multiple/niveau-form-multiple.component';
import { TypeCoursFormMultipleComponent } from './type-cours-form-multiple/type-cours-form-multiple.component';
import { ParcoursFormMultipleComponent } from './parcours-form-multiple/parcours-form-multiple.component';
import { SemestreFormMultipleComponent } from './semestre-form-multiple/semestre-form-multiple.component';
import { ModuleFormMultipleComponent } from './module-form-multiple/module-form-multiple.component';
import { EtudiantListeComponent } from './etudiant-liste/etudiant-liste.component';
import { PvListeComponent } from './pv-liste/pv-liste.component';
import { NotesListeComponent } from './notes-liste/notes-liste.component';
import { AnneeAcademiqueFormComponent } from './annee-academique-form/annee-academique-form.component';
import { AnneeAcademiqueComponent } from './annee-academique/annee-academique.component';
import { CycleFormComponent } from './cycle-form/cycle-form.component';
import { CycleComponent } from './cycle/cycle.component';
import { DepartementFormComponent } from './departement-form/departement-form.component';
import { DepartementComponent } from './departement/departement.component';
import { FiliereFormComponent } from './filiere-form/filiere-form.component';
import { FiliereComponent } from './filiere/filiere.component';
import { TypeCoursFormComponent } from './type-cours-form/type-cours-form.component';
import { TypeCoursComponent } from './type-cours/type-cours.component';

const routes: Routes = [
  {
    path: "dashboard",
    component: DashboardComponent
  },
  {
    path: "departement",
    children: [
      {
        path: "",
        component: DepartementComponent
      },
      {
        path: "nouveau",
        component: DepartementFormComponent
      },
      {
        path: "enregisrement/multiple",
        component: DepartementFormMultipleComponent
      }
    ]
  },
  {
    path: "anneeacademique",
    children: [
      {
        path: "",
        component: AnneeAcademiqueComponent
      },
      {
        path: "nouveau",
        component: AnneeAcademiqueFormComponent
      }
    ]
  },
  {
    path: "typecours",
    children: [
      {
        path: "",
        component: TypeCoursComponent
      },
      {
        path: "nouveau",
        component: TypeCoursFormComponent
      },
      {
        path: "enregisrement/multiple",
        component: TypeCoursFormMultipleComponent
      }
    ]
  },
  {
    path: "filiere",
    children: [
      {
        path: "",
        component: FiliereComponent
      },
      {
        path: "nouveau",
        component: FiliereFormComponent
      },
      {
        path: "enregisrement/multiple",
        component: FiliereFormMultipleComponent
      }
    ]
  },
  {
    path: "cycle",
    children: [
      {
        path: "",
        component: CycleComponent
      },
      {
        path: "nouveau",
        component: CycleFormComponent
      },
      {
        path: "enregisrement/multiple",
        component: CycleFormMultipleComponent
      }
    ]
  },
  {
    path: "evaluation",
    children: [
      {
        path: "",
        component: EvaluationComponent
      },
      {
        path: "nouveau",
        component: EvaluationFormComponent
      },
      {
        path: "enregisrement/multiple",
        component: EvaluationFormMultipleComponent
      }
    ]
  },
  {
    path: "niveau",
    children: [
      {
        path: "",
        component: NiveauComponent
      },
      {
        path: "nouveau",
        component: NiveauFormComponent
      }
      ,
      {
        path: "enregisrement/multiple",
        component: NiveauFormMultipleComponent
      }
    ]
  },
  {
    path: "parcours",
    children: [
      {
        path: "",
        component: ParcoursComponent
      },
      {
        path: "nouveau",
        component: ParcoursFormComponent
      },
      {
        path: "enregisrement/multiple",
        component: ParcoursFormMultipleComponent
      }
    ]
  },
  {
    path: "semestre",
    children: [
      {
        path: "",
        component: SemestreComponent
      },
      {
        path: "nouveau",
        component: SemestreFormComponent
      },
      {
        path: "enregisrement/multiple",
        component: SemestreFormMultipleComponent
      }
    ]
  },
  {
    path: "cours",
    children: [
      {
        path: "",
        component: CoursComponent
      },
      {
        path: "nouveau",
        component: CoursFormComponent
      },
      {
        path: "enregisrement/multiple",
        component: CoursFormMultipleComponent
      }
    ]
  },
  {
    path: "credit",
    children: [
      {
        path: "",
        component: CreditComponent
      },
      {
        path: "nouveau",
        component: CreditFormComponent
      }
    ]
  },
  {
    path: "module",
    children: [
      {
        path: "",
        component: ModuleComponent
      },
      {
        path: "nouveau",
        component: ModuleFormComponent
      },
      {
        path: "enregisrement/multiple",
        component: ModuleFormMultipleComponent
      }
    ]
  },
  // region abdel
  {
    path: "etudiant",
    children: [
      {
        path: "liste",
        component: EtudiantListeComponent
      },
      
    ]
  },
  {
    path: "pv",
    children: [
      {
        path: "",
        component: PvListeComponent
      },
      {
        path: "liste",
        component: PvListeComponent
      },
      
    ]
  },
  {
    path: "notes",
    children: [
      {
        path: "",
        component: NotesListeComponent
      },
      {
        path: "liste",
        component: NotesListeComponent
      },
      
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
