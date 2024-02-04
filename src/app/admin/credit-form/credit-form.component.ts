import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { api as apiConfig } from '../../core/configs/constants';
import { ServicesService } from '../../core/services/services.service';
import { Credit } from '../../core/models/credit';

@Component({
  selector: 'app-credit-form',
  templateUrl: './credit-form.component.html',
  styleUrls: ['./credit-form.component.css']
})
export class CreditFormComponent implements OnInit {

  public errorMessages = {
    required: 'Ce champ est requis.',
    email: 'Format de l\'email invalide.',
    minlength: 'Ce champ doit contenir au moins {{ requiredLength }} caractères.',
  };

  form!: FormGroup
  title = "Nouveau credit"
  btnTitle = "Ajouter"
  name!: string


  submitted = false;
  userId: any;

  constructor(private fb: FormBuilder, private adminService: ServicesService, private router: Router, private route: ActivatedRoute) { }
  ngOnInit(): void {
    this.onForm();
    this.name = this.route.snapshot.params['slug'];
    if (this.name) {
      var str = decodeURIComponent(this.name).split('%');
      this.title = "Mise à  jour credit"
      this.btnTitle = "Mise à jour"
      this.form.setValue(
        {
          valeur: str[1],
        }
      )
    }
  }

  onForm() {
    this.form = new FormGroup({
      valeur: new FormControl('', [Validators.required]),

    })
  }
  submit() {
    if (this.form.valid) {
      var credit: Credit = {
        valeur: this.form.value.valeur,
      }

      // Save datas create user in database
      if (this.name == null) {
        const url = `${apiConfig.admin.credit.create}`;
        this.adminService.saveResource(url, credit).subscribe(
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
      else {
        var str = decodeURIComponent(this.name).split('%');
        var credit: Credit = {
          valeur: this.form.value.valeur, id: parseInt(str[0])
        }
        const url = `${apiConfig.admin.credit.update}`;
        this.adminService.updateResource(url + credit.id, credit).subscribe(
          {
            next: res => {
              alert("Mise a jour effectuee avec succese")
              this.router.navigate(['administrator/credit']);
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


}
