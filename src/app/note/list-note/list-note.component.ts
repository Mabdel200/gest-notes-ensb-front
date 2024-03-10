import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ServicesService } from '../../core/services/services.service';
import { api as apiConfig } from '../../core/configs/constants';
import { Etudiant } from '../../core/models/etudiant';
import { Observable, Subject } from 'rxjs';
import { takeUntil, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { NotificationService } from '../../core/notification.service';
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
// To Export Image
import html2canvas from 'html2canvas';
import { Workbook } from 'exceljs';
import saveAs from 'file-saver';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-note',
  templateUrl: './list-note.component.html',
  styleUrl: './list-note.component.scss'
})
export class ListNoteComponent implements OnInit{

  public listeEtudiantOfParcours: any;
  public evaluations : any;
  public listeAnnees: any;
  public listeParcours: any;
  public listeCoursDept: any;
  public parcoursNivAndOpt: any;
  public listeDepartements: any;
  // Single List
  public singleCours: any;
  public singleParcours:any;
  public singleEva:any;



  constructor(private AdminService:ServicesService, private notification:NotificationService, private router: Router) { }

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
      annee: new FormControl('', [Validators.required]),
      type: new FormControl('', [Validators.required]),
    })
  }
  submitted = false;
  userId: any;
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

    getSingleUEAndCours(){
      var formValue = this.form.controls;
      this.singleCours = formValue['cours'].value || '';
      this.singleParcours = formValue['parcours'].value || ''; 
      this.singleEva = formValue['type'].value || ''; 
    }
  
    //End Single List
  
    ngOnInit(): void {
      
      this.onForm();
      this.getAllAnnee();
      this.getAllDepartments();
      this.getAllEvalation() ;
     
       
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

  
  
   
    }
  
     // Detruit les observables
     private unsubscribe$ = new Subject<void>();
  
     ngOnDestroy(): void {
       this.unsubscribe$.next();
       this.unsubscribe$.complete();
     }
    
  


  submit() {
    if (this.form.valid) {
      this.submitted = true;
      this.listeEtudiantOfParcours = [];
      const formValue = this.form.controls;
      // console.log(formValue['cours']);
      
      this.getSingleUEAndCours();

      // variables of forms
     const codeUE: string = formValue['cours'].value || '';
     const codeEva: number = formValue['type'].value || '';
     //  const type: any = formValue['type_etudiant'].value || '';
     const anneeAca: number = formValue['annee'].value|| '';
     const parcours: string = formValue['parcours'].value || '';

      // List PV of student
      const url = apiConfig.admin.notes.getListNotesUE(
        anneeAca,
        codeEva,
        codeUE,
        parcours
      );
    
      console.log(url);

      this.AdminService.getResourceMany(url, {}).subscribe(
        (data) => {
          this.listeEtudiantOfParcours = data.body;
          // console.log(this.listeEtudiantOfParcours[0].cours.code);
          console.log(this.listeEtudiantOfParcours);

        },
        (err) => {
          console.log('erreur', err.error.message);
        }
      );
    } 
  }

 

  // ========================================================
   // Export to PDF 
   public captureScreen() {
    let dataToExport = document.getElementById('contentToConvert');

    // Check if body is null
    if (!dataToExport) {
        console.error('Body element is null.');
        return;
    }

    html2canvas(dataToExport, { scale: 2 }).then(canvas => {
        let imgWidth = 100 * 2; // Multiplier par un facteur pour une meilleure résolution
        let pageHeight = 100 * 2; // Multiplier par un facteur pour une meilleure résolution
        var imgHeight = canvas.height * imgWidth / canvas.width;
        var heightLeft = imgHeight;

         // Ajuster les marges pour obtenir une symétrie
         let marginLeft = (210 - imgWidth) / 2; // Ajuster selon la largeur de la page A4 (210 mm)
         let marginRight = marginLeft;

        const contentDataURL = canvas.toDataURL('image/png', 1.0); // Ajouter une résolution DPI de 1.0

        let pdf = new jsPDF('p', 'mm', 'a4');
        pdf.addImage(contentDataURL, 'PNG', marginLeft, 0, imgWidth, imgHeight);
        pdf.save('PvUE.pdf');
    });
  }

  update(item:any) {

    console.log(item);
    
    const formValue = this.form.controls;  
     this.getSingleUEAndCours();
     const codeUE: string = formValue['cours'].value || '';
     const codeEva: number = formValue['type'].value || '';
     const anneeAca: number = formValue['annee'].value|| '';
     const parcours: string = formValue['parcours'].value || '';
    if(codeUE!= null &&  codeEva !=null &&  anneeAca != null &&  parcours != null ){
      const encodedId = encodeURIComponent(codeUE+"%"+parcours+"%"+anneeAca+"%"+item.matricule+"%"+item.nom+"%"+codeEva+"%"+item.valeur+"%"+item.id);
    
      this.router.navigate(['notes/updatenoteue/', encodedId]);
    }
   
  }

}
