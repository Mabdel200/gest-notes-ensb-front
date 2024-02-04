import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ServicesService } from '../../core/services/services.service';
import { api as apiConfig } from '../../core/configs/constants';
import { Niveau } from '../../core/models/niveau';
import { Semestre } from '../../core/models/semestre';

@Component({
  selector: 'app-semestre-form',
  templateUrl: './semestre-form.component.html',
  styleUrls: ['./semestre-form.component.css']
})
export class SemestreFormComponent implements OnInit {
  public errorMessages = {
    required: 'Ce champ est requis.',
    email: 'Format de l\'email invalide.',
    minlength: 'Ce champ doit contenir au moins {{ requiredLength }} caractères.',
  };

  form!: FormGroup
  title = "Nouveau semestre"
  btnTitle = "Ajouter"
  name!: string
  allNiveaux!: Niveau[]

  onForm() {
    this.form = new FormGroup({
      valeur: new FormControl('', [Validators.required]),
      niveau: new FormControl('', [Validators.required],),
    })
  }
  submitted = false;
  userId: any;

  constructor(private adminService: ServicesService, private router: Router, private route: ActivatedRoute) { }
  ngOnInit(): void {
    this.onForm()
    this.getNiveaux()
    this.name = this.route.snapshot.params['slug'];
    if (this.name) {
      this.title = "Mise à  jour semestre"
      this.btnTitle = "Mise à jour"
      var str = decodeURIComponent(this.name).split('%');
      this.form.setValue(
        {
          valeur: str[1],
          niveau: str[2]
        }
      )
    }
  }

  submit() {


    if (this.form.valid) {
      if (this.name == null) {

        var semestre: Semestre = {
          valeur: this.form.value.valeur,
          niveau: this.findNiveauById(this.form.value.niveau),
        }
        const url = `${apiConfig.admin.semestre.create}`;
        this.adminService.saveResource(url, semestre).subscribe(
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
      } else {

        var str = decodeURIComponent(this.name).split('%');
        var semestre: Semestre = {
          valeur: this.form.value.valeur,
          niveau: this.findNiveauById(this.form.value.niveau),
          id: parseInt(str[0])
        }
        const url = `${apiConfig.admin.semestre.update}`;
        this.adminService.updateResource(url + semestre.id, semestre).subscribe(
          {
            next: res => {
              alert("Mise a jour effectuee avec succese")
              this.router.navigate(['administrator/semestre']);
            },
            error: err => {

              console.log(err)
              alert("error")
            }
          }
        );
      }



    }
  }
  getNiveaux() {
    const url = `${apiConfig.admin.niveau.getAll}`;
    this.adminService.getResources(url).subscribe(
      (data) => {
        this.allNiveaux = data.body;
      },
      (err) => {
        console.log('erreur', err.error.message);
      }
    );
  }

  findNiveauById(id: Number):Niveau {
    return this.allNiveaux.find(item => id === item.id)!

  }



}

