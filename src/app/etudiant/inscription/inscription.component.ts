import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { api as apiConfig } from '../../core/configs/constants';
import { AnneeAcademique } from '../../core/models/annee-academique';
import { Etudiant } from '../../core/models/etudiant';
import { Parcours } from '../../core/models/parcours';
import { ServicesService } from '../../core/services/services.service';
import { read, utils } from 'xlsx';
import { NotificationService } from '../../core/services/notification.service';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css']
})
export class InscriptionComponent implements OnInit {

  cours: any;
  etudiantJson: any = [];
  annees!: AnneeAcademique[];
  parcours!: Parcours[];
  etudiant!: Etudiant[];

  form!: FormGroup
  public errorMessages = {
    required: 'Ce champ est requis.',
    email: 'Format de l\'email invalide.',
    minlength: 'Ce champ doit contenir au moins {{ requiredLength }} caractères.',
  };

  constructor(
    private AdminService: ServicesService,
    private notification:NotificationService,
    ) { }

  ngOnInit(): void {
    this.onForm();
    this.getAllAnnee();
    this.getAllParcours();
    this.getAllEtudiant();
  }

  onForm() {
    this.form = new FormGroup({
      annee: new FormControl('', [Validators.required]),
      parcours: new FormControl('', [Validators.required]),
    })
  }


  getAllParcours() {
    this.parcours = [];
    const url = `${apiConfig.admin.parcours.getAll}`;
    this.AdminService.getResources(url).subscribe(
      (data) => {
        this.parcours = data.body;
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
        this.etudiantJson = json
        //console.log(json);
        //this.json = json;
      };

    }
  }



  uploadFileData(event: MouseEvent) {

    console.log(this.etudiant);

    const propertiesArray = ['email', 'date de naissance', 'genre', 'lieu de naissance', 'matricule', 'noms et prenoms', 'region', 'numero telephone'];
    this.etudiantJson.forEach((item: any) => {
      // console.log(Object.keys(item).toString().toLowerCase());
      const keys = Object.keys(item);
      const convertedObject: any = {};
      for (const key of keys) {
        convertedObject[key.toLowerCase()] = item[key];
      }
      for (const prop of keys) {
        if (propertiesArray.includes(prop.toLowerCase())) {
          var etudiant: any = {
            etudiant: this.findEtudiantByMatricule(convertedObject.matricule.toString()),
            anneeAcademique: this.findTypeAnneeById(Number(this.form.value.annee)),
            parcours: this.findParcoursById(Number(this.form.value.parcours))
          }

        }
      }
      console.log(etudiant);


      // Save datas from files in database
      const url = `${apiConfig.admin.inscription.create}`;
      this.AdminService.saveResource(url, etudiant).subscribe(
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
    })

  }




  findTypeAnneeById(id: Number) {
    return this.annees.find(item => id === item.id)
  }
  findParcoursById(id: Number) {
    return this.parcours.find(item => id === item.id)
  }

  findEtudiantByMatricule(matricule: String) {
    return this.etudiant.find(item => matricule === item.matricule)
  }



}
