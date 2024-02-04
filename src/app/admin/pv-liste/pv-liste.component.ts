import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServicesService } from '../../core/services/services.service';
import { api as apiConfig } from "../../core/configs/constants";
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
// To Export Image
import html2canvas from 'html2canvas';
import { Workbook } from 'exceljs';
import saveAs from 'file-saver';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { takeUntil, debounceTime, distinctUntilChanged } from 'rxjs/operators';

export const TYPE_ETUDIANT = [
  "Regulier","Libre",
];

@Component({
  selector: 'app-pv-liste',
  templateUrl: './pv-liste.component.html',
  styleUrls: ['./pv-liste.component.css']
})

export class PvListeComponent implements OnInit{

  public listeEtudiantOfParcours: any;
  public listeDepartements: any;
  public listeAnnees: any;
  public listeParcours: any;
  public listeCoursDept: any;
  public parcoursNivAndOpt: any;
  // Single List
  public singleCours: any;
  public sessionAca:any
  public singleParcours:any;
  public anneeAca:any;

  // parcours datas
  private parcoursSubject = new Subject<any>();

  constructor(private AdminService: ServicesService,  private fb: FormBuilder, private router: Router,  private route: ActivatedRoute ) { }

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
      type_etudiant: new FormControl('', [Validators.required]),
      annee: new FormControl('', [Validators.required]),
      session: new FormControl('', [Validators.required])
    })
  }
  
  submitted = false;
  userId: any;

  //end form control

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

  // Appeler vos fonctions pour mettre à jour la liste des parcours et cours en fonction du département sélectionné
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

  // Single List
  getCoursById(){
    this.singleCours = [];
    
    const formValue = this.form.controls;
    const codeCours: string = formValue['cours'].value || '';
   
    const url = apiConfig.admin.cours.getOneByCode(codeCours);

    // use it here
    this.AdminService.getResourceMany(url, {}).subscribe(
      (data) => {
        this.singleCours = data.body;
        console.log(this.singleCours, data.body);
      },
      (err) => {
        console.log('erreur', err.error.message);
      }
    );
  }

  getSessionAca(){    
    const formValue = this.form.controls;
    const sessionAca: string = formValue['session'].value || '';
    this.sessionAca = sessionAca;
    console.log(sessionAca);

  }

  getAnneeAca(){
    this.anneeAca = [];
    
    const formValue = this.form.controls;
    const anneeAca: number = formValue['annee'].value ? +formValue['annee'].value : 0;
   
    const url = apiConfig.admin.anneeAcademique.getOneById(anneeAca);

    // use it here
    this.AdminService.getResourceMany(url, {}).subscribe(
      (data) => {
        this.anneeAca = data.body;
        // this.getSessionAca();
        console.log(this.anneeAca);
      },
      (err) => {
        console.log('erreur', err.error.message);
      }
    );
  }

  //End Single List

  ngOnInit(): void {
    
    this.onForm();
    // Call List of informations
    this.getAllDepartments();
    this.getAllAnnee();
   
    // Observer les changements dans le contrôle de département
    this.form.controls['departement'].valueChanges
      .pipe(
        takeUntil(this.unsubscribe$),  // Détruire l'abonnement lorsque le composant est détruit
        debounceTime(300),  // Délai de débordement pour éviter des appels excessifs
        distinctUntilChanged()  // Observer uniquement les changements distincts
      )
      .subscribe((selectedDepartementValue) => {
        const selectedDepartementCode = selectedDepartementValue !== null ? selectedDepartementValue : '';
  
        // Appeler vos fonctions pour mettre à jour la liste des parcours et cours en fonction du département sélectionné
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

  public bodyOfPv: any;
  submit() {
    if (this.form.valid) {
      this.submitted = true;
      this.listeEtudiantOfParcours = [];
      const formValue = this.form.controls;
      // console.log(formValue['cours']);

      // variables of forms
     const session: number = formValue['session'].value ? +formValue['session'].value : 0;
     const code: string = formValue['cours'].value || '';
     const type: any = formValue['type_etudiant'].value || '';
     const anneeAca: number = formValue['annee'].value|| '';
     const parcours: string = formValue['parcours'].value || '';

      // List PV of student
      const url = apiConfig.admin.notes.getPVCours(
        session, 
        type,
        anneeAca,
        code,
        parcours
      );
    
      // console.log(url);

      this.AdminService.getResourceMany(url, {}).subscribe(
        (data) => {
          this.listeEtudiantOfParcours = data.body;
          // console.log(this.listeEtudiantOfParcours[0].cours.code);
          console.log(this.listeEtudiantOfParcours);

          // Call single data if form is submitted
          // this.getCoursById();
          // this.getAnneeAca();

        },
        (err) => {
          console.log('erreur', err.error.message);
        }
      );
    } 
  }

  //================== region exportation =================================
  public fileName = 'ExcelSheet.xlsx';
  
 // Export to Excel
  exportexcel() {
    // Create a new workbook
    const workbook = new Workbook();

    // Add a worksheet to the workbook
    const worksheet = workbook.addWorksheet('Students List');

    // Get the header table element by ID
    let dataHeader = document.getElementById('data-header');
    if (dataHeader) {
      // Add rows from the header table
      const wsHeader: XLSX.WorkSheet = XLSX.utils.table_to_sheet(dataHeader);
      const headerArray: any[][] = XLSX.utils.sheet_to_json(wsHeader, { header: 1 });
      headerArray.forEach(row => {
        worksheet.addRow(row);
      });
    }

    // Get the body table element by ID
    let dataBody = document.getElementById('table-data');

    // Check if body is null
    if (!dataBody) {
      console.error('Body element is null.');
      return;
    }

    // Capture the image using html2canvas
    html2canvas(dataBody as any).then((canvas) => {
      const imgData = canvas.toDataURL('image/jpeg');

      // Add the image to the worksheet
      workbook.addImage({
        base64: imgData,
        extension: 'jpeg',
      });

      // Add rows from the body table
      const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(dataBody);
      const dataArray: any[][] = XLSX.utils.sheet_to_json(ws, { header: 1 });
      dataArray.forEach(row => {
        worksheet.addRow(row);
      });

      // Save to file
      workbook.xlsx.writeBuffer().then((buffer) => {
        const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        saveAs(blob, this.fileName);
      });
    });
  }

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
        pdf.save('ListeEtudiants.pdf');
    });
  }


  // end region
}
