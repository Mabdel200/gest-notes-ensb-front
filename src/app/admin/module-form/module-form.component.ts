import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ServicesService } from '../../core/services/services.service';
import { NatureUe, api as apiConfig } from '../../core/configs/constants';
import { Cours } from '../../core/models/cours';
import { Credit } from '../../core/models/credit';
import { Module } from '../../core/models/module';
import { NotificationService } from '../../core/services/notification.service';


@Component({
  selector: 'app-module-form',
  templateUrl: './module-form.component.html',
  styleUrls: ['./module-form.component.css']
})
export class ModuleFormComponent implements OnInit {

  public errorMessages = {
    required: 'Ce champ est requis.',
    email: 'Format de l\'email invalide.',
    minlength: 'Ce champ doit contenir au moins {{ requiredLength }} caractères.',
  };

  form!: FormGroup
  allCredit!: Credit[]
  allCours!: Cours[]
  title = "Nouveau EC"
  btnTitle = "Ajouter"
  name!: string
  submitted = false;
  userId: any;
  allNature: String[] = NatureUe
  constructor(private notification:NotificationService, private adminService: ServicesService, private router: Router, private route: ActivatedRoute) { }
  ngOnInit(): void {
    this.getCredit()
    this.getCours()
    this.onForm()

    this.name = this.route.snapshot.params['slug'];
    if (this.name) {
      this.title = "Mise à  jour EC"
      this.btnTitle = "Mise à jour"
      var str = decodeURIComponent(this.name).split('%');
      this.form.setValue(
        {
          code: str[1],
          intitule: str[4],
          cours: str[2],
          credit: str[3],
        }
      )
    }
  }

  onForm() {
    this.form = new FormGroup({
      intitule: new FormControl('', [Validators.required]),
      cours: new FormControl('', [Validators.required],),
      credit: new FormControl('', [Validators.required],),
    })
  }
  getCours() {
    const url = `${apiConfig.admin.cours.getAll}`;
    this.adminService.getResources(url).subscribe(
      (data) => {
        this.allCours = data.body;
      },
      (err) => {
        console.log('erreur', err.error.message);
      }
    );
  }

  findCoursById(id: Number): Cours {
    return this.allCours.find(item => id === item.coursId)!
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

  submit() {

    if (this.form.valid) {

      //insertion
      if (this.name == null) {
        var module: Module = {
          intitule: this.form.value.intitule,
          cours: this.findCoursById(this.form.value.cours),
          credit: this.findCreditById(this.form.value.credit),
        }

        const url = `${apiConfig.admin.module.create}`;
        this.adminService.saveResource(url, module).subscribe(
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
        var module: Module = {
          code: this.form.value.code,
          intitule: this.form.value.intitule,
          cours: this.findCoursById(this.form.value.cours),
          credit: this.findCreditById(this.form.value.credit),
          id: parseInt(str[0])
        }
        const url = `${apiConfig.admin.module.update}`;
        this.adminService.updateResource(url + module.id, module).subscribe(
          {
            next: res => {
              this.notification.update()
              this.router.navigate(['administrator/module']);
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
