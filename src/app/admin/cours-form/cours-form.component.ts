import { Cours } from './../../core/models/cours';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NatureUe, api as apiConfig } from '../../core/configs/constants';
import { Credit } from '../../core/models/credit';
import { Departement } from '../../core/models/departement';
import { Semestre } from '../../core/models/semestre';
import { TypeCours } from '../../core/models/typeCours';
import { ServicesService } from '../../core/services/services.service';
import { NotificationService } from '../../core/services/notification.service';


@Component({
  selector: 'app-cours-form',
  templateUrl: './cours-form.component.html',
  styleUrls: ['./cours-form.component.css']
})
export class CoursFormComponent implements OnInit {

  public errorMessages = {
    required: 'Ce champ est requis.',
    email: 'Format de l\'email invalide.',
    minlength: 'Ce champ doit contenir au moins {{ requiredLength }} caractères.',
  };

  form!: FormGroup
  allTypeCours !: TypeCours[]
  allDepartement!: Departement[]
  allCredit!: Credit[]
  allSemestre !: Semestre[]

  title = "Nouvelle UE"
  btnTitle = "Ajouter"
  name!: string

  submitted = false;
  userId: any;
  allNature: String[] = NatureUe
  constructor(private notification:NotificationService, private adminService: ServicesService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getCredit()
    this.getTypeCours()
    this.getDepartement()
    this.getSemestres()
    this.onForm()
    this.name = this.route.snapshot.params['slug'];
    if (this.name) {
      this.title = "Mise à  jour UE"
      this.btnTitle = "Mise à jour"
      var str = decodeURIComponent(this.name).split('%');
      this.form.setValue(
        {
          code: str[1],
          natureUe: str[5],
          intitule: str[4],
          departement: str[3],
          credit: str[2],
          typeCours: str[7],
          semestre: str[6],
        }
      )
    }
  }

  onForm() {
    this.form = new FormGroup({
      intitule: new FormControl('', [Validators.required],),
      natureUe: new FormControl('', [Validators.required]),
      departement: new FormControl('', [Validators.required]),
      credit: new FormControl('', [Validators.required]),
      typeCours: new FormControl('', [Validators.required]),
      semestre: new FormControl('', [Validators.required]),

    })
  }

  getSemestres() {
    const url = `${apiConfig.admin.semestre.getAll}`;
    this.adminService.getResources(url).subscribe(
      (data) => {
        this.allSemestre = data.body;
      },
      (err) => {
        console.log('erreur', err.error.message);
      }
    );
  }

  findSemestreById(id: Number): Semestre {
    return this.allSemestre.find(item => id === item.id)!
  }
  getCredit() {
    const url = `${apiConfig.admin.credit.getAll}`;
    this.adminService.getResources(url).subscribe(
      (data) => {
        this.allCredit = data.body;
      },
      (err) => {
        console.log('erreur', err.error.message);
      }
    );
  }

  findCreditById(id: Number): Credit {
    return this.allCredit.find(item => id === item.id)!
  }
  getDepartement() {
    const url = `${apiConfig.admin.departement.getAll}`;
    this.adminService.getResources(url).subscribe(
      (data) => {
        this.allDepartement = data.body;
      },
      (err) => {
        console.log('erreur', err.error.message);
      }
    );
  }

  findDepartementById(id: Number): Departement {
    return this.allDepartement.find(item => id === item.id)!
  }
  getTypeCours() {
    const url = `${apiConfig.admin.typeCours.getAll}`;
    this.adminService.getResources(url).subscribe(
      (data) => {
        this.allTypeCours = data.body;
      },
      (err) => {
        console.log('erreur', err.error.message);
      }
    );
  }

  findTypeCoursById(id: Number): TypeCours {
    return this.allTypeCours.find(item => id === item.id)!
  }
  submit() {

    if (this.form.valid) {

      // Save datas create user in database
      if (this.name == null) {

        var cours: Cours = {
          natureUE: this.form.value.natureUe,
          intitule: this.form.value.intitule,
          departement: this.findDepartementById(this.form.value.departement),
          credit: this.findCreditById(this.form.value.credit),
          typecours: this.findTypeCoursById(this.form.value.typeCours),
          semestre: this.findSemestreById(this.form.value.semestre),
        }

        const url = `${apiConfig.admin.cours.create}`;
        this.adminService.saveResource(url, cours).subscribe(
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
      //mise a jour
      else {

        var str = decodeURIComponent(this.name).split('%');
        var cours: Cours = {
          natureUE: this.form.value.natureUe,
          intitule: this.form.value.intitule,
          departement: this.findDepartementById(this.form.value.departement),
          credit: this.findCreditById(this.form.value.credit),
          typecours: this.findTypeCoursById(this.form.value.typeCours),
          semestre: this.findSemestreById(this.form.value.semestre),
          coursId: parseInt(str[0])
        }
        const url = `${apiConfig.admin.cours.update}`;
        this.adminService.updateResource(url + cours.coursId, cours).subscribe(
          {
            next: res => {
              this.notification.update()
              this.router.navigate(['administrator/cours']);
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
