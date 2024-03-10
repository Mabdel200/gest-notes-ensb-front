import { Component, OnInit } from '@angular/core';
import { api as apiConfig } from '../../core/configs/constants';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { NotificationService } from '../../core/notification.service';
import { ServicesService } from '../../core/services/services.service';
import { Etudiant } from '../../core/models/etudiant';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-nouveau-preinscription',
  templateUrl: './nouveau-preinscription.component.html',
  styleUrl: './nouveau-preinscription.component.scss'
})
export class NouveauPreinscriptionComponent implements OnInit {
  public errorMessages = {
    required: 'Ce champ est requis.',
    email: 'Format de l\'email invalide.',
    minlength: 'Ce champ doit contenir au moins {{ requiredLength }} caractères.',
  };

  form!: FormGroup

  title = "Nouvelle Preinscription"
  btnTitle = "Preinscrire"
  name!: string

  constructor(private notification: NotificationService, private AdminService: ServicesService, private router: Router, private route: ActivatedRoute) { }
  ngOnInit(): void {
    this.onForm();
    this.name = this.route.snapshot.params['slug'];
    if (this.name) {
      this.title = "Mise à  jour preinscription"
      this.btnTitle = "Mise à jour"
      var str = decodeURIComponent(this.name).split('%');
      this.form.setValue(
        {

          nom: str[7],
          dateDeNaissance: str[0],
          lieuDeNaissance: str[4],
          email: str[1],
          region: str[9],
          numeroTelephone: str[8],
          genre: str[2],
          type: str[10],
          nationalite: str[6]
        }
      )
    }
  }

  onForm() {
    this.form = new FormGroup({
      nom: new FormControl('', [Validators.required]),
      dateDeNaissance: new FormControl([Validators.required]),
      lieuDeNaissance: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      region: new FormControl('', [Validators.required]),
      numeroTelephone: new FormControl('', [Validators.required]),
      genre: new FormControl('', [Validators.required]),
      type: new FormControl('', [Validators.required]),
      nationalite: new FormControl('', [Validators.required])

    })
  }
  submit() {
    if (this.form.valid) {
      // operation d'insertion

      if (this.name) {
        var str = decodeURIComponent(this.name).split('%');

        var etudiant: Etudiant = {
          nom: this.form.value.nom,
          dateDeNaissance: this.form.value.dateDeNaissance,
          lieuDeNaissance: this.form.value.lieuDeNaissance,
          email: this.form.value.email,
          region: this.form.value.region,
          numeroTelephone: this.form.value.numeroTelephone,
          genre: this.form.value.genre,
          type: this.form.value.type,
          nationalite: this.form.value.nationalite,
          id: parseInt(str[3]),
          matricule: str[5]
        }
        const url = `${apiConfig.admin.etudiant.update}`;
        this.AdminService.updateResource(url + etudiant.id, etudiant).subscribe(
          {
            next: res => {
              this.notification.update()
              this.form.reset();

            },
            error: err => {
              this.notification.error()
            }
          }
        );
      }
      else {
        var etudiant: Etudiant = {
          nom: this.form.value.nom,
          dateDeNaissance: this.form.value.dateDeNaissance,
          lieuDeNaissance: this.form.value.lieuDeNaissance,
          email: this.form.value.email,
          region: this.form.value.region,
          numeroTelephone: this.form.value.numeroTelephone,
          genre: this.form.value.genre,
          type: this.form.value.type,
          nationalite: this.form.value.nationalite
        }
        const url = `${apiConfig.admin.etudiant.create}`;
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
      }


    }
  }
}
