import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ServicesService } from '../../core/services/services.service';
import { api as apiConfig } from '../../core/configs/constants';
import { TypeCours } from '../../core/models/typeCours';
import { NotificationService } from '../../core/services/notification.service';


@Component({
  selector: 'app-type-cours-form',
  templateUrl: './type-cours-form.component.html',
  styleUrls: ['./type-cours-form.component.css']
})
export class TypeCoursFormComponent implements OnInit {

  public errorMessages = {
    required: 'Ce champ est requis.',
    email: 'Format de l\'email invalide.',
    minlength: 'Ce champ doit contenir au moins {{ requiredLength }} caractères.',
  };

  title = "Nouveau Evaluations attendues"
  btnTitle = "Ajouter"

  form!: FormGroup
  userId: any;
  name!: string

  constructor(private notification:NotificationService,private AdminService: ServicesService, private router: Router, private route: ActivatedRoute) { }
  ngOnInit(): void {
    this.onForm()
    this.name = this.route.snapshot.params['slug'];
    if (this.name) {
      this.title = "Mise à  jour Evaluations attendues"
      this.btnTitle = "Mise à jour"
      var str = decodeURIComponent(this.name).split('%');
      this.form.setValue(
        {
          nom: str[1]
        }
      )
    }

  }

  onForm() {
    this.form = new FormGroup({
      nom: new FormControl('', [Validators.required]),
    })
  }
  submit() {

    if (this.form.valid) {
      // operation d'insertion
      if (this.name == null) {
        var typeCours: TypeCours = {
          nom: this.form.value.nom
        }
        const url = `${apiConfig.admin.typeCours.create}`;
        this.AdminService.saveResource(url, typeCours).subscribe(
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
      // opertion de de mise a jour
      else {
        var str = decodeURIComponent(this.name).split('%');
        var typeCours: TypeCours = {
          nom: this.form.value.nom,
          id: parseInt(str[0])
        }
        const url = `${apiConfig.admin.typeCours.update}`;
        this.AdminService.updateResource(url + typeCours.id, typeCours).subscribe(
          {
            next: res => {
              this.notification.update()
              this.router.navigate(['administrator/typecours']);
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
