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

@Component({
  selector: 'app-etudiant-liste',
  templateUrl: './etudiant-liste.component.html',
  styleUrls: ['./etudiant-liste.component.css'],
  // standalone: true
})
export class EtudiantListeComponent implements OnInit {

  public listeEtudiant: any;
  public listeEtudiantOfParcours: any;
  public listeDepartements: any;
  public listeOptions: any;
  public listeNiveaux: any;
  public listeAnnees: any;
  public parcoursDept: any;
  public parcoursNivAndOpt: any;

  public dtOptions: DataTables.Settings = {};
  //parcours datas
  private parcoursSubject = new Subject<any>();

  constructor(private AdminService: ServicesService,  private fb: FormBuilder, private router: Router,  private route: ActivatedRoute ) { }

// ======================region search student by filter ================

public errorMessages = {
  required: 'Ce champ est requis.',
};

form!: FormGroup
onForm() {
  this.form = new FormGroup({
    departement: new FormControl('', [Validators.required]),
    option: new FormControl('', [Validators.required]),
    niveau: new FormControl('', [Validators.required]),
    annee: new FormControl('', [Validators.required])
  })
}


submitted = false;
userId: any;

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

getAllOptions() {
  this.listeOptions = [];
  const url = `${apiConfig.admin.option.getAll}`;
  this.AdminService.getResources(url).subscribe(
    (data) => {
      this.listeOptions = data.body;
      console.log(this.listeOptions);
    },
    (err) => {
      console.log('erreur', err.error.message);
    }
  );
}

getAllNiveaux() {
  this.listeNiveaux = [];
  const url = `${apiConfig.admin.niveau.getAll}`;
  this.AdminService.getResources(url).subscribe(
    (data) => {
      this.listeNiveaux = data.body;
      console.log(this.listeOptions);
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

getParcoursDept() {
  this.parcoursDept = [];
  const formValue = this.form.controls;
  const url = `${apiConfig.admin.parcours.getAllByDept}`;
  
  this.AdminService.getResource(url, formValue['departement'].value).subscribe(
    (data) => {
      this.parcoursDept = data.body;
      console.log(this.listeAnnees);
    },
    (err) => {
      console.log('erreur', err.error.message);
    }
  );
}

getParcoursByNivAndOpt(): void {
  const formValue = this.form.controls;

  const niveau: number = formValue['niveau'].value ? +formValue['niveau'].value : 0;
  const option: string = formValue['option'].value || '';

  const url = apiConfig.admin.parcours.getAllByNivAndOpt(
    niveau,
    option
  );

  // Appel de la fonction et émission du résultat à travers le sujet
  this.AdminService.getResourceMany(url, {}).subscribe(
    (parcoursData) => {
      this.parcoursSubject.next(parcoursData);
      console.log(parcoursData.body);
    },
    (err) => {
      console.log('Erreur lors de la récupération du parcours :', err.error.message);
    }
  );
}


getParcoursObservable(): Observable<any> {
  return this.parcoursSubject.asObservable();
}

submit() {
  if (this.form.valid) {
    this.submitted = true;
    this.listeEtudiantOfParcours = [];

    // Appel de la fonction parcours et souscription à l'observable
    this.getParcoursByNivAndOpt();

    // Attendez un court instant pour vous assurer que l'émission a eu lieu
    setTimeout(() => {
      // Utilisation de l'observable
      this.getParcoursObservable().subscribe(
        (parcoursData) => {
          console.log("parcours :", parcoursData.body.id);
          const idParcour = parcoursData.body.id || 0;
          console.log(idParcour, " = idParcours");

          const url = `${apiConfig.admin.etudiant.getAllByCours}`;

          this.AdminService.getResource(url, idParcour).subscribe(
            (data) => {
              this.listeEtudiantOfParcours = data.body;
              console.log(this.listeEtudiantOfParcours);
            },
            (err) => {
              console.log('Erreur lors de la récupération des étudiants :', err.error.message);
            }
          );
        }
      );
    }, 100); // Ajoutez un délai pour vous assurer que l'émission a eu lieu
  }
}  // end region


  ngOnInit(): void {

    this.onForm();
    //List
    this.getAllDepartments();
    this.getAllOptions();
    this.getAllNiveaux();
    this.getAllAnnee();

    // List of student
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
