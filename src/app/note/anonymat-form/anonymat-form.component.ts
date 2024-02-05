import { Component, OnInit } from '@angular/core';
import { SESSION } from '../../core/configs/constants';
import { ActivatedRoute, Router } from '@angular/router';
import { AnneeAcademique } from '../../core/models/annee-academique';
import { Cours } from '../../core/models/cours';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { read, utils } from 'xlsx';
import { ServicesService } from '../../core/services/services.service';
import { api as apiConfig } from '../../core/configs/constants';
import { Etudiant } from '../../core/models/etudiant';

@Component({
  selector: 'app-anonymat-form',
  templateUrl: './anonymat-form.component.html',
  styleUrl: './anonymat-form.component.scss'
})
export class AnonymatFormComponent implements OnInit {

  annees!: AnneeAcademique[];
  cours!: Cours[];
  form!: FormGroup
  sessions = SESSION
  etudiant!: Etudiant[];
  public errorMessages = {
    required: 'Ce champ est requis.',
    email: 'Format de l\'email invalide.',
    minlength: 'Ce champ doit contenir au moins {{ requiredLength }} caractères.',
  };
  noteJson: any = [];
  constructor(private AdminService: ServicesService, private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.onForm();
    this.getAllAnnee();
    this.getAllcours();
    this.getAllEtudiant()
  }

  onForm() {
    this.form = new FormGroup({
      session: new FormControl('', [Validators.required]),
      annee: new FormControl('', [Validators.required]),
      cours: new FormControl('', [Validators.required]),
    })
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
  findcoursById(id: Number) {
    return this.cours.find(item => id === item.coursId)
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
  findTypeAnneeById(id: Number) {
    return this.annees.find(item => id === item.id)
  }
  findEtudiantByMatricule(matricule: String) {
    return this.etudiant.find(item => matricule === item.matricule)
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

    console.log(this.noteJson);

    const propertiesArray = ['noms et prenoms', 'matricule'];
    
    var count = 0;
    this.noteJson.forEach((item: any) => {
      // console.log(Object.keys(item).toString().toLowerCase());
      const keys = Object.keys(item);
      const convertedObject: any = {};
      for (const key of keys) {
        convertedObject[key.toLowerCase()] = item[key];
      }

      // Save datas from files in database
      const url = `${apiConfig.admin.anonymat.create}`;

      var notes: any = {
        etudiant: this.findEtudiantByMatricule(convertedObject.matricule.toString()),
        anneeAcademique: this.findTypeAnneeById(Number(this.form.value.annee)),
        cours: this.findcoursById(Number(this.form.value.cours)),
        sessions: this.form.value.session
      }

            
      count++
      console.log('cc', notes);
      this.AdminService.saveResource(url + count, notes).subscribe(
        {
          next: res => {
            //   alert("cool")
          },
          error: err => {
            alert("error")

          }
        }
      );
      
    })

  }


}
