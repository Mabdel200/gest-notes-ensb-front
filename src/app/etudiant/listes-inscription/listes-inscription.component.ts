import { Component, OnInit } from '@angular/core';

import { api as apiConfig } from '../../core/configs/constants';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AnneeAcademique } from '../../core/models/annee-academique';
import { Etudiant } from '../../core/models/etudiant';
import { Parcours } from '../../core/models/parcours';
import { NotificationService } from '../../core/notification.service';
import { ServicesService } from '../../core/services/services.service';
@Component({
  selector: 'app-listes-inscription',
  templateUrl: './listes-inscription.component.html',
  styleUrl: './listes-inscription.component.scss'
})
export class ListesInscriptionComponent implements OnInit{
update(_t114: Etudiant) {
throw new Error('Method not implemented.');
}

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
  public etudiant!: Etudiant[];


  constructor(private AdminService:ServicesService) { }

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
      // type_etudiant: new FormControl('', [Validators.required]),
      annee: new FormControl('', [Validators.required]),
      session: new FormControl('', [Validators.required])
    })
  }
  

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
    this.getAllEtudiant();
   
    
  }
  
  getAllEtudiant() {
    this.etudiant = [];
    const url = `${apiConfig.admin.etudiant.getAll}`;
    this.AdminService.getResources(url).subscribe(
      (data) => {
        this.etudiant = data.body;
        console.log(this.etudiant);
      },
      (err) => {
        console.log('erreur', err.error.message);
      }
    );
  }

  submit() {
    if (this.form.valid) {
     
      
    } 
  }

}
