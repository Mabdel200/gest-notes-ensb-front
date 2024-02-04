import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { api as apiConfig } from '../../core/configs/constants';
import { Departement } from '../../core/models/departement';
import { ServicesService } from '../../core/services/services.service';

@Component({
  selector: 'app-filiere-form',
  templateUrl: './filiere-form.component.html',
  styleUrls: ['./filiere-form.component.css']
})
export class FiliereFormComponent implements OnInit {
  public errorMessages = {
    required: 'Ce champ est requis.',
    email: 'Format de l\'email invalide.',
    minlength: 'Ce champ doit contenir au moins {{ requiredLength }} caractères.',
  };

  form!: FormGroup
  title = "Nouvelle filiere"
  btnTitle = "Ajouter"
  name!: string

  allDepartements!: Departement[]


  submitted = false;
  userId: any;

  constructor(private adminService: ServicesService, private router: Router, private route: ActivatedRoute) { }
  ngOnInit(): void {
    this.onForm()
    this.getDepartemnt()
    this.name = this.route.snapshot.params['slug'];
    if (this.name) {
      this.title = "Mise à  jour filiere"
      this.btnTitle = "Mise à jour"
      var str = decodeURIComponent(this.name).split('%');
      this.form.setValue(
        {
          description: str[2],
          code: str[3],
          descriptionEn: str[1],
          departement: str[4],
        }
      )
    }
  }


  onForm() {
    this.form = new FormGroup({
      code: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required],),
      descriptionEn: new FormControl('', [Validators.required]),
      departement: new FormControl('', [Validators.required]),

    })
  }
  submit() {
    if (this.form.valid) {
      // operation d'insertion
      if (this.name == null) {
        var option: any = {
          descriptionEnglish: this.form.value.descriptionEn,
          descriptionFrench: this.form.value.description,
          code: this.form.value.code,
          departement: this.findDepartement(this.form.value.departement),
        }
        const url = `${apiConfig.admin.option.create}`;
        this.adminService.saveResource(url, option).subscribe(
          {
            next: res => {
              alert("cool")
              this.form.reset();
            },
            error: err => {
              alert("error")

            }
          }
        );
      }
      //opertation de mise a jour
      else {
        var str = decodeURIComponent(this.name).split('%');
        var option: any = {
          descriptionEnglish: this.form.value.descriptionEn,
          descriptionFrench: this.form.value.description,
          code: this.form.value.code,
          departement: this.findDepartement(this.form.value.departement),
          id: parseInt(str[0])
        }
        const url = `${apiConfig.admin.option.update}`;
        this.adminService.updateResource(url + option.id, option).subscribe(
          {
            next: res => {
              alert("Mise a jour effectuee avec succese")
              this.router.navigate(['administrator/filiere']);
            },
            error: err => {
              alert("error")
            }
          }
        );
      }



    }
  }

  getDepartemnt() {
    const url = `${apiConfig.admin.departement.getAll}`;
    this.adminService.getResources(url).subscribe(
      (data) => {
        this.allDepartements = data.body;
      },
      (err) => {
        console.log('erreur', err.error.message);
      }
    );
  }

  findDepartement(id: Number) {
    return this.allDepartements.find(item => item.id === id)

  }

}
