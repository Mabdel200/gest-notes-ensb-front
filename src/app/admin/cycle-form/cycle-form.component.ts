import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { api as apiConfig } from '../../core/configs/constants';
import { Cycle } from '../../core/models/cycle';
import { ServicesService } from '../../core/services/services.service';
import { NotificationService } from '../../core/services/notification.service';


@Component({
  selector: 'app-cycle-form',
  templateUrl: './cycle-form.component.html',
  styleUrls: ['./cycle-form.component.css']
})
export class CycleFormComponent implements OnInit {
  public errorMessages = {
    required: 'Ce champ est requis.',
    email: 'Format de l\'email invalide.',
    minlength: 'Ce champ doit contenir au moins {{ requiredLength }} caractères.',
  };



  form!: FormGroup
  title = "Nouveau cycle"
  btnTitle = "Ajouter"
  name!: string

  submitted = false;
  userId: any;

  constructor(
    private notification:NotificationService,
    private fb: FormBuilder,
    private AdminService: ServicesService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      valeur: new FormControl('', [Validators.required]),
      estAffichable: new FormControl('', [Validators.required]),

    })
    this.name = this.route.snapshot.params['slug'];
    if (this.name) {
      var str = decodeURIComponent(this.name).split('%');
      this.title = "Mise à  jour cycle"
      this.btnTitle = "Mise à jour"

      this.form.setValue(
        {
          valeur: str[2],
          estAffichable: str[1]
        }
      )
    }
  }

  submit() {

    if (this.form.valid) {
      this.submitted = true;
      var cycle: Cycle = {
        valeur: this.form.value.valeur,
        estAffichable: this.form.value.estAffichable,
      }

      // operation d'insertion
      if (this.name == null) {
        const url = `${apiConfig.admin.cycle.create}`;
        this.AdminService.saveResource(url, cycle).subscribe(
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
      //opertion de mise ajour
      else {
        var str = decodeURIComponent(this.name).split('%');
        var cycle: Cycle = {
          valeur: this.form.value.valeur,
          estAffichable: this.form.value.estAffichable,
          id: parseInt(str[0])
        }
        const url = `${apiConfig.admin.cycle.update}`;
        this.AdminService.updateResource(url + cycle.id, cycle).subscribe(
          {
            next: res => {
              this.notification.update()
              this.router.navigate(['administrator/cycle']);
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
