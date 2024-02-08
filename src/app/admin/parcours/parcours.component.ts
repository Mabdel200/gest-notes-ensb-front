import { Component, OnInit } from '@angular/core';
// Export
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf'
// To Export Image
import html2canvas from 'html2canvas';
import { Workbook } from 'exceljs';
import saveAs from 'file-saver';
import { Router } from '@angular/router';
import { api as apiConfig } from '../../core/configs/constants';
import { Parcours } from '../../core/models/parcours';
import { ServicesService } from '../../core/services/services.service';
import { NotificationService } from '../../core/services/notification.service';


@Component({
  selector: 'app-parcours',
  templateUrl: './parcours.component.html',
  styleUrls: ['./parcours.component.css']
})
export class ParcoursComponent implements OnInit {



  allParcourss!: Parcours[]
  constructor(private notification:NotificationService, private adminService: ServicesService, private router: Router) {

  }

  ngOnInit(): void {
    this.getParcourss();

  }

  getParcourss() {
    const url = `${apiConfig.admin.parcours.getAll}`;
    this.adminService.getResources(url).subscribe(
      (data) => {
        this.allParcourss = data.body;
      },
      (err) => {
        console.log('erreur', err.error.message);
      }
    );
  }
  update(item: Parcours) {
    const encodedId = encodeURIComponent(item.id + "%" + item.label + "%" + item.niveau.id + "%" + item.option.id);
    this.router.navigate(['administrator/parcours/update/', encodedId]);
  }

  remove(arg: Number | undefined) {
    const url = `${apiConfig.admin.parcours.delete}`;
    if (arg) {
      this.adminService.deleteResource(url, arg).subscribe({
        next: res => {
          this.notification.remove()
          this.getParcourss()
        },
        error: err => {
          this.notification.remove()
          this.getParcourss()
          //this.toastr.error("Erreur survenir", 'Error');
 
        }

      })
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
