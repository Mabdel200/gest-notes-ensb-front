import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ServicesService } from '../../core/services/services.service';
import { api as apiConfig } from '../../core/configs/constants';
import { Filere } from '../../core/models/filiere';
import { Niveau } from '../../core/models/niveau';

@Component({
  selector: 'app-parcours-form',
  templateUrl: './parcours-form.component.html',
  styleUrls: ['./parcours-form.component.css']
})
export class ParcoursFormComponent implements OnInit {
  public errorMessages = {
    required: 'Ce champ est requis.',
    email: 'Format de l\'email invalide.',
    minlength: 'Ce champ doit contenir au moins {{ requiredLength }} caractères.',
  };

  form!: FormGroup

  allNiveaux!: Niveau[]
  allOptions!: Filere[]
  niveau!: Niveau
  submitted = false;
  userId: any;
  title = "Nouveau parcours"
  btnTitle = "Ajouter"
  name!: string

  constructor(private adminService: ServicesService, private router: Router, private route: ActivatedRoute) { }
  ngOnInit(): void {
    this.onForm()
    this.getNiveaux()
    this.getOptions()
    this.name = this.route.snapshot.params['slug'];
    if (this.name) {
      this.title = "Mise à  jour parcours"
      this.btnTitle = "Mise à jour"
      var str = decodeURIComponent(this.name).split('%');
      this.form.setValue(
        {
          niveau: str[1],
          option:  str[2],
        }
      )
    }
  }

  onForm() {
    this.form = new FormGroup({
      niveau: new FormControl([], [Validators.required]),
      option: new FormControl([], [Validators.required],),

    })
  }

  submit() {

    if (this.form.valid) {
      //insertion
      if (this.name == null) {
        var parcours: any = {
          // label?: String,
          niveau: this.findNiveauById(Number(this.form.value.niveau)),
          option: this.findOptionById(Number(this.form.value.option))

        }
        console.log(parcours)
        const url = `${apiConfig.admin.parcours.create}`;
        this.adminService.saveResource(url, parcours).subscribe(
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
      //mise a jour
      else{
        var str = decodeURIComponent(this.name).split('%');
        var parcours: any = {
          // label?: String,
          niveau: this.findNiveauById(Number(this.form.value.niveau)),
          option: this.findOptionById(Number(this.form.value.option)),
           id: parseInt(str[0])
        }
        /*const url = `${apiConfig.admin.parcours.update}`;
        this.adminService.updateResource(url + parcours.id, parcours).subscribe(
          {
            next: res => {
              alert("Mise a jour effectuee avec succese")
              this.router.navigate(['administrator/niveau']);
            },
            error: err => {
              console.log(err)
              alert("error")
            }
          }*/

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

  getOptions() {
    const url = `${apiConfig.admin.option.getAll}`;
    this.adminService.getResources(url).subscribe(
      (data) => {
        this.allOptions = data.body;
      },
      (err) => {
        console.log('erreur', err.error.message);
      }
    );
  }

  findNiveauById(id: Number) {
    return this.allNiveaux.find(item => id === item.id)

  }
  findOptionById(id: Number) {
    return this.allOptions.find(item => id === item.id)
  }

}
