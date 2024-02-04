import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ServicesService } from '../../core/services/services.service';
import { api as apiConfig } from '../../core/configs/constants';
import { Cycle } from '../../core/models/cycle';
import { Niveau } from '../../core/models/niveau';

@Component({
  selector: 'app-niveau-form',
  templateUrl: './niveau-form.component.html',
  styleUrls: ['./niveau-form.component.css']
})
export class NiveauFormComponent implements OnInit {
  public errorMessages = {
    required: 'Ce champ est requis.',
    email: 'Format de l\'email invalide.',
    minlength: 'Ce champ doit contenir au moins {{ requiredLength }} caractères.',
  };
  form!: FormGroup
  allCycles!: Cycle[]
  title = "Nouveau niveau"
  btnTitle = "Ajouter"
  name!: string

  submitted = false;
  userId: any;

  constructor(private adminService: ServicesService, private router: Router, private route: ActivatedRoute) { }
  ngOnInit(): void {
    this.getCycles()
    this.onForm()
    this.name = this.route.snapshot.params['slug'];
    if (this.name) {
      this.title = "Mise à  jour niveau"
      this.btnTitle = "Mise à jour"
      var str = decodeURIComponent(this.name).split('%');
      this.form.setValue(
        {
          valeur: str[1],
          cycle: str[2],
          dernierNiveau:str[3] == 'false' ? "1" : "0",
        }
      )
    }
  }

  onForm() {
    this.form = new FormGroup({
      cycle: new FormControl('', [Validators.required],),
      valeur: new FormControl('', [Validators.required],),
      dernierNiveau: new FormControl('', [Validators.required],),

    })
  }
  submit() {
    if (this.form.valid) {
      //insertion's operation
      if (this.name == null) {
        var niveau: Niveau = {
          terminal: this.form.value.dernierNiveau == "1" ? true : false,
          valeur: this.form.value.valeur,
          cycle: this.findCycles(this.form.value.cycle),
        }
        const url = `${apiConfig.admin.niveau.create}`;
        this.adminService.saveResource(url, niveau).subscribe(
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
      //update operation
      else{
        var str = decodeURIComponent(this.name).split('%');
        var niveau: Niveau = {
          terminal: this.form.value.dernierNiveau == "1" ? true : false,
          valeur: this.form.value.valeur,
          cycle: this.findCycles(this.form.value.cycle),
           id: parseInt(str[0])
        }
        const url = `${apiConfig.admin.niveau.update}`;
        this.adminService.updateResource(url + niveau.id, niveau).subscribe(
          {
            next: res => {
              alert("Mise a jour effectuee avec succese")
              this.router.navigate(['administrator/niveau']);
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

  getCycles() {
    const url = `${apiConfig.admin.cycle.getAll}`;
    this.adminService.getResources(url).subscribe(
      (data) => {
        this.allCycles = data.body;
      },
      (err) => {
        console.log('erreur', err.error.message);
      }
    );
  }
  findCycles(id: Number):Cycle {
    return this.allCycles.find(item => item.id === id)!

  }

}
