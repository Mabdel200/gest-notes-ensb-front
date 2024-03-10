import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { takeUntil, debounceTime, distinctUntilChanged, Subject } from 'rxjs';
import { NotificationService } from '../../core/notification.service';
import { ServicesService } from '../../core/services/services.service';
import { api as apiConfig } from '../../core/configs/constants';

@Component({
  selector: 'app-form-note-ec',
  templateUrl: './form-note-ec.component.html',
  styleUrl: './form-note-ec.component.scss'
})
export class FormNoteEcComponent {

  public listeEtudiantOfParcours: any;
  public evaluations : any;
  public listeAnnees: any;
  public listeParcours: any;
  public listeCoursDept: any;
  public parcoursNivAndOpt: any;
  public listeDepartements: any;
  public  modules : any;
  // Single List
  public singleCours: any;
  public sessionAca:any
  public singleParcours:any;
  public anneeAca:any;
  public etudiant!: any;


  constructor(private AdminService:ServicesService, private notification:NotificationService) { }

  // ======================region search student by filter ================

  // form controls

  public errorMessages = {
    required: 'Ce champ est requis.',
  };

  form!: FormGroup;
  onForm() {
    this.form = new FormGroup({
      departement: new FormControl('', [Validators.required]),
      parcours: new FormControl('', [Validators.required]),
      cours: new FormControl('', [Validators.required]),
      module: new FormControl('', [Validators.required]),
      annee: new FormControl('', [Validators.required]),
      etudiant: new FormControl('', [Validators.required]),
      type: new FormControl('', [Validators.required]),
      valeur: new FormControl('', [Validators.required])
    })
  }

  // departement
getAllDepartments() {
  this.listeDepartements = [];
  const url = `${apiConfig.admin.departement.getAll}`;
  this.AdminService.getResources(url).subscribe(
    (data) => {
      this.listeDepartements = data.body;
      console.log(this.listeDepartements);
    },
    (err) => {
      console.log('erreur', err.error.message);
    }
  );
}
  
 // Gerer l'etat du champs departement
 onDepartementChange(): void {
  const selectedDepartementValue = this.form.controls['departement'].value;
  const selectedDepartementCode = selectedDepartementValue !== null ? selectedDepartementValue : '';

  // Calls functions to updates liste des parcours et cours en fonction du département sélectionné
  this.getAllParcoursDept(selectedDepartementCode);
  this.getAllCoursDept(selectedDepartementCode);
}



getAllEtudiantByParcours(parcoursLabel: string) {
  this.etudiant = [];
  const formValue = this.form.controls;
  const annee: number = formValue['annee'].value ? +formValue['annee'].value : 0;

  const url = apiConfig.admin.etudiant.getAllByCoursAndAnnee(
    annee,
    parcoursLabel
  );
  console.log(url);

  this.AdminService.getResourceMany(url, {}).subscribe(
    (data) => {
      this.etudiant = data.body;
      console.log(this.etudiant);
    },
    (err) => {
      console.log('erreur', err.error.message);
    }
  );
}


  getAllParcoursDept(departementCode: string) {
    this.listeParcours = [];
    const url = apiConfig.admin.parcours.getAllByDept(departementCode);

    // Utilisez directement le départementCode dans l'URL généré
    this.AdminService.getResourceMany(url, {}).subscribe(
      (data) => {
        this.listeParcours = data.body;
        console.log(this.listeParcours);
      },
      (err) => {
        console.log('erreur', err.error.message);
      }
    );
  }

  
  getAllCoursDept(departementCode: string) {
    this.listeCoursDept = [];
    const url = apiConfig.admin.cours.getAllByDepartCode(departementCode);
    // use it here
    this.AdminService.getResourceMany(url, {}).subscribe(
      (data) => {
        this.listeCoursDept = data.body;
        console.log(this.listeCoursDept);
      },
      (err) => {
        console.log('erreur', err.error.message);
      }
    );
  }

    // New function to get EC -> UE
    getAllModulesCours(codeCours: string) {
      this.modules = [];
      const url = apiConfig.admin.module.getAllModsByCours(codeCours);
      // use it here
      this.AdminService.getResourceMany(url, {}).subscribe(
        (data) => {
          this.modules = data.body;
          console.log(this.modules);
        },
        (err) => {
          console.log('erreur', err.error.message);
        }
      );
    }


  getAllEvalation() {
    //this.cours = [];
    const url = `${apiConfig.admin.evaluation.getAll}`;
    this.AdminService.getResources(url).subscribe(
      (data) => {
        this.evaluations = data.body;
      },
      (err) => {
        console.log('erreur', err.error.message);
      }
    );
  }
  
  getAllAnnee() {
    this.listeAnnees = [];
    const url = `${apiConfig.admin.anneeAcademique.getAll}`;
    this.AdminService.getResources(url).subscribe(
      (data) => {
        this.listeAnnees = data.body;
        console.log(this.listeAnnees);
      },
      (err) => {
        console.log('erreur', err.error.message);
      }
    );
  }


  //End Single List

  ngOnInit(): void {
    
    this.onForm();
    this.getAllAnnee();
    this.getAllDepartments();
    this.getAllEvalation() ;
    // this.getAllmodule();
     
    // Observ state of control of département
     this.form.controls['departement'].valueChanges
     .pipe(
       takeUntil(this.unsubscribe$),  // Détruire l'abonnement lorsque le composant est détruit
       debounceTime(300),  // Délai de débordement pour éviter des appels excessifs
       distinctUntilChanged()  // Observer uniquement les changements distincts
     )
     .subscribe((selectedDepartementValue) => {
       const selectedDepartementCode = selectedDepartementValue !== null ? selectedDepartementValue : '';
      //Call functions concerned
       this.getAllParcoursDept(selectedDepartementCode);
       this.getAllCoursDept(selectedDepartementCode);
     });

     //Pour parcours
      this.form.controls['parcours'].valueChanges
      .pipe(
        takeUntil(this.unsubscribe$), 
        debounceTime(300),  
        distinctUntilChanged()
      )
      .subscribe((selectedParcoursValue) => {
        const selectedParcoursLabel = selectedParcoursValue !== null ? selectedParcoursValue : '';
  
        // Call function 
        this.getAllEtudiantByParcours(selectedParcoursLabel);
      });

       // Pour un EC
       this.form.controls['cours'].valueChanges
       .pipe(
         takeUntil(this.unsubscribe$),  
         debounceTime(100),  
         distinctUntilChanged()  
       )
       .subscribe((selectedCoursValue) => {
         const selectedCoursCode = selectedCoursValue !== null ? selectedCoursValue : '';
         //Call back
         this.getAllModulesCours(selectedCoursCode);
       
       });


 
  }

   // Detruit les observables
   private unsubscribe$ = new Subject<void>();

   ngOnDestroy(): void {
     this.unsubscribe$.next();
     this.unsubscribe$.complete();
   }
  


  submit() {
    if (this.form.valid) {
      var notes: any = {
        etudiant: this.findEtudiantByMatricule(this.form.value.etudiant),
        valeur: this.form.value.valeur,
        anneeAcademique: this.findTypeAnneeById(Number(this.form.value.annee)),
        // cours:this.findcoursById(this.form.value.cours),
        module: this.findModuleById(Number(this.form.value.module)),
        evaluation: this.findTypeEvaluationById( this.form.value.type)
      }

      console.log(notes);
      
     

      const url = `${apiConfig.admin.notes.module}`;
      this.AdminService.saveResource(url, notes).subscribe(
      {
        next: res => {
          this.notification.record()
          this.form.reset();
        },
        error: err => {
          this.notification.error()

        }
      }
    );

    } 
  }

  // getAllmodule() {
  //   const url = `${apiConfig.admin.module.getAll}`;
  //   this.AdminService.getResources(url).subscribe(
  //     (data) => {
  //       this.modules = data.body;
  //     },
  //     (err) => {
  //       console.log('erreur', err.error.message);
  //     }
  //   );
  // }
  findModuleById(id: Number) {
    return this.modules.find((item: { id: Number; }) => id === item.id)
  }

  findTypeAnneeById(arg: Number) {
    return this.listeAnnees.find((item: { numeroDebut: any; })  => arg === item.numeroDebut)
  }
  
  findcoursById(arg: string) {
    return this.listeCoursDept.find((item: { code: string; }) => arg === item.code)
  }

  findEtudiantByMatricule(matricule: string) {
    return this.etudiant.find((item: { matricule: string; }) => matricule === item.matricule)
  }
  findTypeEvaluationById(code: String) {
    return this.evaluations.find((item: { code: String; }) => code === item.code)
  }

}

