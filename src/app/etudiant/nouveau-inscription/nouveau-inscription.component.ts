import { Component, OnInit } from '@angular/core';
import { api as apiConfig } from '../../core/configs/constants';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AnneeAcademique } from '../../core/models/annee-academique';
import { Etudiant } from '../../core/models/etudiant';
import { Parcours } from '../../core/models/parcours';
import { NotificationService } from '../../core/notification.service';
import { ServicesService } from '../../core/services/services.service';

@Component({
  selector: 'app-nouveau-inscription',
  templateUrl: './nouveau-inscription.component.html',
  styleUrl: './nouveau-inscription.component.scss'
})
export class NouveauInscriptionComponent implements OnInit {


  cours: any;
  etudiantJson: any = [];
  public annees!: AnneeAcademique[];
  public parcours!: Parcours[];
  public etudiant!: Etudiant[];
  title = "Nouvelle Inscription"
  btnTitle = "Inscrire"
  name!: string

  form!: FormGroup
  public errorMessages = {
    required: 'Ce champ est requis.',
    email: 'Format de l\'email invalide.',
    minlength: 'Ce champ doit contenir au moins {{ requiredLength }} caractères.',
  };

  constructor(  private AdminService: ServicesService,private notification:NotificationService,) { }

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
      etudiant: new FormControl('', [Validators.required]),
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





  findTypeAnneeById(id: Number) {
    return this.annees.find(item => id === item.id)
  }
  findParcoursById(id: Number) {
    return this.parcours.find(item => id === item.id)
  }

  findEtudiantByMatricule(matricule: String) {
    return this.etudiant.find(item => matricule === item.matricule)
  }

  submit() {
    var etudiant: any = {
      etudiant: this.findEtudiantByMatricule(this.form.value.etudiant),
      anneeAcademique: this.findTypeAnneeById(Number(this.form.value.annee)),
      parcours: this.findParcoursById(Number(this.form.value.parcours))
    }

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
      })
    }
}