import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { TYPE_EVALUATION, api as apiConfig } from '../../core/configs/constants';
import { ServicesService } from '../../core/services/services.service';
import { Evaluation } from '../../core/models/evaluation';
import { TypeCours } from '../../core/models/typeCours';

@Component({
  selector: 'app-evaluation-form',
  templateUrl: './evaluation-form.component.html',
  styleUrls: ['./evaluation-form.component.css']
})

export class EvaluationFormComponent {
  public errorMessages = {
    required: 'Ce champ est requis.',
    email: 'Format de l\'email invalide.',
    minlength: 'Ce champ doit contenir au moins {{ requiredLength }} caractères.',
  };

  form!: FormGroup
  cours!:TypeCours[]
  title = "Nouvelle evaluation"
  btnTitle = "Ajouter"
  name! :string



  submitted = false;
  userId: any;
  alltypeEvaluation = TYPE_EVALUATION



  constructor(private adminService: ServicesService, private router: Router, private route: ActivatedRoute) { }
  ngOnInit(): void {
    this.onForm()
    this.name = this.route.snapshot.params['slug'];
    if (this.name) {
      this.title = "Mise à  jour departement"
      this.btnTitle = "Mise à jour"
      var str = decodeURIComponent(this.name).split('%');
      this.form.setValue(
        {
          code : str[1],
          description :  str[2],
         // estExamen : str[3]
        }
      )
    }
  }


  onForm() {
    this.form = new FormGroup({
      code: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required],),

    })
  }
  submit() {
    if (this.form.valid) {
      //insertion
      if (this.name == null) {
        var evaluation: Evaluation = {
          code: this.form.value.code,
          description: this.form.value.description,
          //isExam : this.form.value.estExamen == "1" ? true : false
        }
        const url = `${apiConfig.admin.evaluation.create}`;
        this.adminService.saveResource(url, evaluation).subscribe(
          {
            next: res => {
              alert("cool")
              this.form.reset();
            },
            error: err => {
              console.log(Error)
              alert("error")
            }
          }
        ); 
      }
      //Mise ajour
      else{
        var str = decodeURIComponent(this.name).split('%');
        var evaluation: Evaluation = {
          code: this.form.value.code,
          description: this.form.value.description,
           id: parseInt(str[0])
        }
        const url = `${apiConfig.admin.evaluation.update}`;
        this.adminService.updateResource(url + evaluation.id, evaluation).subscribe(
          {
            next: res => {
              alert("Mise a jour effectuee avec succese")
              this.router.navigate(['administrator/evaluation']);
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
