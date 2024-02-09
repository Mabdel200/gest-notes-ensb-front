
import { Component, AfterViewInit, ElementRef, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js/auto';
import { ServicesService } from '../../core/services/services.service';
Chart.register(...registerables);// Importe la version de Chart.js compatible avec TypeScript
import { api as apiConfig } from "../../core/configs/constants";
import { Departement } from '../../core/models/departement';
// Verfier le canvas
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID, Inject } from '@angular/core';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})


export class DashboardComponent  implements AfterViewInit, OnInit {
  private chart: any; // Stocke l'instance du graphique
  // variables
  anneeAcademiques: any = [];
  allDepartements!: Departement[]
  //Countable
  countAnnee:any ;
  countEtudiant:any ;
  countUE:any ;
  countParcours:any ;
  countDepartement:any ;
  tauxReussite:any ;
  
  constructor(private el: ElementRef, private AdminService: ServicesService, @Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit(): void {
    this.getAllAnneeAca();
    // count elements stats
    this.getCountAnnee();
    this.getCountEtudiant();
    this.getCountUE();
    this.getCountParcours();
    this.getCountDepartement();
    // this.getTauxReussite();
   
  }

  getCountAnnee() {
    this.countAnnee = [];
    const url = `${apiConfig.admin.statistique.countAllYears}`;
    this.AdminService.getResources(url).subscribe(
      (data) => {
        this.countAnnee = data.body;
        console.log(this.countAnnee);
      },
      (err) => {
        console.log('erreur', err.error.message);
      }
    );
  }

  getCountEtudiant() {
    this.countEtudiant = [];
    const url = `${apiConfig.admin.statistique.countAllStudent}`;
    this.AdminService.getResources(url).subscribe(
      (data) => {
        this.countEtudiant = data.body;
        console.log(this.countEtudiant);
      },
      (err) => {
        console.log('erreur', err.error.message);
      }
    );
  }


  getCountUE() {
    this.countUE = [];
    const url = `${apiConfig.admin.statistique.countAllUE}`;
    this.AdminService.getResources(url).subscribe(
      (data) => {
        this.countUE = data.body;
        console.log(this.countUE);
      },
      (err) => {
        console.log('erreur', err.error.message);
      }
    );
  }


  getCountParcours() {
    this.countParcours = [];
    const url = `${apiConfig.admin.statistique.countAllParcours}`;
    this.AdminService.getResources(url).subscribe(
      (data) => {
        this.countParcours = data.body;
        console.log(this.countParcours);
      },
      (err) => {
        console.log('erreur', err.error.message);
      }
    );
  }

  getCountDepartement() {
    this.countDepartement = [];
    const url = `${apiConfig.admin.statistique.countAllDept}`;
    this.AdminService.getResources(url).subscribe(
      (data) => {
        this.countDepartement = data.body;
        console.log(this.countDepartement);
      },
      (err) => {
        console.log('erreur', err.error.message);
      }
    );
  }

  // getTauxReussite() {
  //   this.tauxReussite = [];
  //   const url = `${apiConfig.admin.statistique.countTauxReuste}`;
  //   this.AdminService.getResources(url).subscribe(
  //     (data) => {
  //       this.tauxReussite = data.body;
  //       console.log(this.tauxReussite);
  //     },
  //     (err) => {
  //       console.log('erreur', err.error.message);
  //     }
  //   );
  // }

  // Logic to put data  chart
  getAllAnneeAca() {
    this.anneeAcademiques = [];
    const url = `${apiConfig.admin.anneeAcademique.getAll}`;
    this.AdminService.getResources(url).subscribe(
      (data) => {
        this.anneeAcademiques = data.body;
        console.log(this.anneeAcademiques);
        this.getDepartements();
      
      },
      (err) => {
        console.log('erreur', err.error.message);
      }
    );
  }

  getDepartements() {
    this.allDepartements = [];

    const url = `${apiConfig.admin.departement.getAll}`;
    this.AdminService.getResources(url).subscribe({
      next: data => {
        this.allDepartements = data.body;
        console.log(this.allDepartements);
          // Appel à la création du graphique à l'intérieur de l'abonnement
          this.createLinearChart();
          // this.createPieChart();
      }
    })
  }


  createLinearChart() {
    if (isPlatformBrowser(this.platformId)) {
      const canvas = this.el.nativeElement.querySelector('#myChart') as HTMLCanvasElement;
      console.log(this.allDepartements,"departem")
      if (canvas) {
        const ctx: CanvasRenderingContext2D | null = canvas.getContext('2d');
        if (ctx) {
          this.chart = new Chart(ctx, {
            type: 'bar',
            data: {
              labels: this.anneeAcademiques.map((annee: { code: any }) => annee.code),
              datasets: this.allDepartements.map((departement: { code: any }) => ({
                label: departement.code,
                data: [10], // Mettez ici les données spécifiques au département si nécessaire
                borderWidth: 1,
              })),
            },
            options: {
              scales: {
                y: {
                  beginAtZero: true,
                },
              },
            },
          });
        } else {
          console.error('Unable to get 2D context for the canvas.');
        }
      } else {
        console.error('Canvas element with ID "myChart" not found.');
      }
    }
   
  }

  
  // createPieChart() {
  //   const canvasPie = this.el.nativeElement.querySelector('#myPieChart') as HTMLCanvasElement;
  //   if (canvasPie) {
  //     const ctx: CanvasRenderingContext2D | null = canvasPie.getContext('2d');
  //     if (ctx) {
  //       this.chart = new Chart(ctx, {
  //         type: 'pie',
  //         data: {
  //           labels: this.anneeAcademiques.map((annee: { label: any; }) => annee.label),
  //           datasets: [
  //             {
  //               data: [12, 19, 3, 5, 2, 3],
  //               backgroundColor: ['red', 'blue', 'yellow', 'green', 'purple', 'orange'],
  //             },
  //           ],
  //         },
  //       });
  //     } else {
  //       console.error('Unable to get 2D context for the canvas.');
  //     }
  //   } else {
  //     console.error('Canvas element with ID "myPieChart" not found.');
  //   }
  // }

  ngAfterViewInit(): void {
    //  cette méthode est vide si tout est traité dans ngOnInit
  }

} 
