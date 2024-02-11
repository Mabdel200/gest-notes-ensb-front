import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AnneeAcademique } from '../../core/models/annee-academique';
import { Cours } from '../../core/models/cours';
import { ServicesService } from '../../core/services/services.service';

import { api as apiConfig } from '../../core/configs/constants';
import { read, utils } from 'xlsx';
import { Module } from '../../core/models/module';
import { Etudiant } from '../../core/models/etudiant';
import { Evaluation } from '../../core/models/evaluation';
import { NotificationService } from '../../core/services/notification.service';

@Component({
  selector: 'app-avec-module',
  templateUrl: './avec-module.component.html',
  styleUrls: ['./avec-module.component.css']
})
export class AvecModuleComponent implements OnInit {

  annees!: AnneeAcademique[];
  cours!: Cours[];
  modules!: Module[];
  evaluations!: Evaluation[];
  etudiant!: Etudiant[];
  noteJson: any = [];

  form!: FormGroup
  public errorMessages = {
    required: 'Ce champ est requis.',
    email: 'Format de l\'email invalide.',
    minlength: 'Ce champ doit contenir au moins {{ requiredLength }} caractères.',
  };

  constructor(
    private fb: FormBuilder,
    private AdminService: ServicesService,
    private notification:NotificationService
    ) { }

  ngOnInit(): void {
    this.onForm();
    this.getAllAnnee();
    this.getAllEvaluation();
    this.getAllEtudiant();
    this.getAllmodule();
    this.getAllcours();
  }

  onForm() {
    this.form = new FormGroup({
      annee: new FormControl('', [Validators.required]),
      module: new FormControl('', [Validators.required]),
    })
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

  getAllEvaluation() {
    this.cours = [];
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


  getAllcours() {
    this.cours = [];
    const url = `${apiConfig.admin.cours.getAll}`;
    this.AdminService.getResources(url).subscribe(
      (data) => {
        this.cours = data.body;
      },
      (err) => {
        console.log('erreur', err.error.message);
      }
    );
  }
  getAllmodule() {
    const url = `${apiConfig.admin.module.getAll}`;
    this.AdminService.getResources(url).subscribe(
      (data) => {
        this.modules = data.body;
      },
      (err) => {
        console.log('erreur', err.error.message);
      }
    );
  }


  getAllAnnee() {
    const url = `${apiConfig.admin.anneeAcademique.getAll}`;
    this.AdminService.getResources(url).subscribe(
      (data) => {
        this.annees = data.body;
      },
      (err) => {
        console.log('erreur', err.error.message);
      }
    );
  }
  findModuleById(id: Number) {
    return this.modules.find(item => id === item.id)
  }


  onSelectFile(events: any) {
    if (events.target.files && events.target.files[0]) {
      const reader = new FileReader();
      reader.readAsArrayBuffer(events.target.files[0]);
      reader.onload = (e) => {
        const data = e?.target?.result;
        const workbook = read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        let json = utils.sheet_to_json(worksheet);
        this.noteJson = json
        //console.log(json);
        //this.json = json;
      };

    }
  }



  uploadFileData(event: MouseEvent) {

    console.log(this.etudiant);

    const propertiesArray = ['matricule', 'noms et prenoms', 'valeur'];
    this.noteJson.forEach((item: any) => {
      // console.log(Object.keys(item).toString().toLowerCase());
      const keys = Object.keys(item);
      const convertedObject: any = {};
      for (const key of keys) {
        convertedObject[key.toLowerCase()] = item[key];
      }

      var notes: any = {
        etudiant: this.findEtudiantByMatricule(convertedObject.matricule.toString()),
        valeur: {},
        anneeAcademique: this.findTypeAnneeById(Number(this.form.value.annee)),
        evaluation: {},
        module: this.findModuleById(Number(this.form.value.module))
      }

      // Save datas from files in database


 
      notes.valeur = convertedObject.cc?convertedObject.cc:null;
      notes.evaluation = this.findTypeEvaluationById('CC')
      this.save(notes);

      notes.valeur = convertedObject.tp?convertedObject.tp:null;
      notes.evaluation = this.findTypeEvaluationById('TP')
      this.save(notes);

      notes.valeur = convertedObject.tpe?convertedObject.tpe:null;
      notes.evaluation = this.findTypeEvaluationById('TPE')
      this.save(notes);

    })

  }



  save(n: any) {

    const url = `${apiConfig.admin.notes.module}`;
    
    console.log(n);
    this.AdminService.saveResource(url, n).subscribe(
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


  findTypeAnneeById(id: Number) {
    return this.annees.find(item => id === item.id)
  }
  findTypeEvaluationById(code: String) {
    return this.evaluations.find(item => code === item.code)
  }
  findcoursById(id: Number) {
    return this.cours.find(item => id === item.coursId)
  }

  findEtudiantByMatricule(matricule: String) {
    return this.etudiant.find(item => matricule === item.matricule)
  }

}
