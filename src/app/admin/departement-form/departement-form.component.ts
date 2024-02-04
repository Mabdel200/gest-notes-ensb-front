import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormsModule, FormBuilder, AbstractControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { api as apiConfig } from '../../core/configs/constants';
import { ServicesService } from '../../core/services/services.service';
import { Departement } from '../../core/models/departement';

@Component({
  selector: 'app-departement-form',
  templateUrl: './departement-form.component.html',
  styleUrls: ['./departement-form.component.css'],
})
export class DepartementFormComponent implements OnInit {
  public errorMessages = {
    required: 'Ce champ est requis.',
    email: 'Format de l\'email invalide.',
    minlength: 'Ce champ doit contenir au moins {{ requiredLength }} caractères.',
  };

  form!: FormGroup
  allDepartements!: Departement[];


  title = "Nouveau departement"
  btnTitle = "Ajouter"
  name!: string

  userId: any;

  constructor(private fb: FormBuilder, private AdminService: ServicesService, private router: Router, private route: ActivatedRoute) { }
  ngOnInit(): void {

    this.onForm();
    this.name = this.route.snapshot.params['slug'];
    if (this.name) {
      this.title = "Mise à  jour departement"
      this.btnTitle = "Mise à jour"
      var str = decodeURIComponent(this.name).split('%');
      this.form.setValue(
        {
          descriptionFr: str[3],
          code: str[1],
          descriptionEn: str[2]
        }
      )
    }
  }

  onForm() {
    this.form = new FormGroup({
      code: new FormControl('', [Validators.required]),
      descriptionFr: new FormControl('', [Validators.required],),
      descriptionEn: new FormControl('', [Validators.required]),

    })
  }
  submit() {
    if (this.form.valid) {
      // operation d'insertion
      if (this.name == null) {
        var departement: Departement = {
          code: this.form.value.code,
          englishDescription: this.form.value.descriptionEn,
          frenchDescription: this.form.value.descriptionFr,
        }
        const url = `${apiConfig.admin.departement.create}`;
        this.AdminService.saveResource(url, departement).subscribe(
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
      // operation de mise ajour
      else {
        var str = decodeURIComponent(this.name).split('%');
        var departement: Departement = {
          code: this.form.value.code,
          englishDescription: this.form.value.descriptionEn,
          frenchDescription: this.form.value.descriptionFr,
          id: parseInt(str[0])
        }
        const url = `${apiConfig.admin.departement.update}`;
        this.AdminService.updateResource(url + departement.id, departement).subscribe(
          {
            next: res => {
              alert("Mise a jour effectuee avec succese")
              this.router.navigate(['administrator/departement']);
            },
            error: err => {
              alert("error")
            }
          }
        );
      }
    }
  }
}
