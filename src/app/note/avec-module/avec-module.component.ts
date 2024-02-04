import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AnneeAcademique } from '../../core/models/annee-academique';
import { Cours } from '../../core/models/cours';
import { ServicesService } from '../../core/services/services.service';

import { api as apiConfig } from '../../core/configs/constants';
import { Module } from '../../core/models/module';
@Component({
  selector: 'app-avec-module',
  templateUrl: './avec-module.component.html',
  styleUrls: ['./avec-module.component.css']
})
export class AvecModuleComponent  implements OnInit {

  annees!: AnneeAcademique[];
  cours!: Cours[];
  modules!: Module[]

  form!: FormGroup
  public errorMessages = {
    required: 'Ce champ est requis.',
    email: 'Format de l\'email invalide.',
    minlength: 'Ce champ doit contenir au moins {{ requiredLength }} caractères.',
  };

  constructor(
    private fb: FormBuilder,
    private AdminService: ServicesService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.onForm();
    this.getAllAnnee();
    this.getAllcours();
    this.getAllmodule();
  }

  onForm() {
    this.form = new FormGroup({
      annee: new FormControl('', [Validators.required]),
      cours: new FormControl('', [Validators.required]),
      module: new FormControl('', [Validators.required]),
    })
  }


  getAllcours() {
    this.cours = [];
    const url = `${apiConfig.admin.cours.getAll}`;
    this.AdminService.getResources(url).subscribe(
      (data) => {
        this.cours = data.body;
      },
      (err) => {
        console.log('erreur', err.error.message);
      }
    );
  }
  getAllmodule() {
    const url = `${apiConfig.admin.module.getAll}`;
    this.AdminService.getResources(url).subscribe(
      (data) => {
        this.modules = data.body;
      },
      (err) => {
        console.log('erreur', err.error.message);
      }
    );
  }


  getAllAnnee() {
    const url = `${apiConfig.admin.departement.getAll}`;
    this.AdminService.getResources(url).subscribe(
      (data) => {
        this.annees = data.body;
      },
      (err) => {
        console.log('erreur', err.error.message);
      }
    );
  }
  findTypeAnneeById(id: Number) {
    return this.annees.find(item => id === item.id)
  }
  findModuleById(id: Number) {
    return this.modules.find(item => id === item.id)
  }
  findcoursById(id: Number) {
    return this.cours.find(item => id === item.coursId)
  }



}
