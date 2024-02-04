import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { api as apiConfig } from '../../core/configs/constants';
import { read, utils } from 'xlsx';
import { AnneeAcademique } from '../../core/models/annee-academique';
import { Cours } from '../../core/models/cours';
import { Etudiant } from '../../core/models/etudiant';
import { Evaluation } from '../../core/models/evaluation';
import { ServicesService } from '../../core/services/services.service';
@Component({
  selector: 'app-sans-module',
  templateUrl: './sans-module.component.html',
  styleUrls: ['./sans-module.component.css']
})
export class SansModuleComponent implements OnInit {

  annees!: AnneeAcademique[];
  cours!: Cours[];
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
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.onForm();
    this.getAllAnnee();
    this.getAllcours();
    this.getAllEvalation();
    this.getAllEtudiant();
  }

  onForm() {
    this.form = new FormGroup({
      annee: new FormControl('', [Validators.required]),
      cours: new FormControl('', [Validators.required]),
      evaluation: new FormControl('', [Validators.required]),
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

  getAllEvalation() {
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
      for (const prop of keys) {
        if (propertiesArray.includes(prop.toLowerCase())) {
          var notes: any = {
            etudiant: this.findEtudiantByMatricule(convertedObject.matricule.toString()),
            valeur: convertedObject.valeur,
            anneeAcademique: this.findTypeAnneeById(Number(this.form.value.annee)),
            evaluation: this.findTypeEvaluationById(Number(this.form.value.evaluation)),
            cours: this.findcoursById(Number(this.form.value.cours))
          }

        }
      }
      console.log(notes);


      // Save datas from files in database
      const url = `${apiConfig.admin.inscription.create}`;
    /*   this.AdminService.saveResource(url, notes).subscribe(
        {
          next: res => {
            alert("cool")
            this.form.reset();
          },
          error: err => {
            alert("error")

          }
        }
      ); */
    })

  }





  findTypeAnneeById(id: Number) {
    return this.annees.find(item => id === item.id)
  }
  findTypeEvaluationById(id: Number) {
    return this.evaluations.find(item => id === item.id)
  }
  findcoursById(id: Number) {
    return this.cours.find(item => id === item.coursId)
  }

  findEtudiantByMatricule(matricule: String) {
    return this.etudiant.find(item => matricule === item.matricule)
  }

}