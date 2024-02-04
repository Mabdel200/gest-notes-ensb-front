import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { api as apiConfig } from '../../core/configs/constants';
import { ActivatedRoute } from '@angular/router';
import { ServicesService } from '../../core/services/services.service';
import { AnneeAcademique } from '../../core/models/annee-academique';

@Component({
  selector: 'app-annee-academique-form',
  templateUrl: './annee-academique-form.component.html',
  styleUrls: ['./annee-academique-form.component.css']
})
export class AnneeAcademiqueFormComponent implements OnInit {

  anneeAcademique!: AnneeAcademique;
  formAnneeAcademique!: FormGroup;
  submitted = false;
  userId: any;
  file?: File;

  constructor(
    private fb: FormBuilder,
    private AdminService: ServicesService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.createForm();
    this.userId = sessionStorage.getItem('userId');
  }

  createForm() {
    this.formAnneeAcademique = new FormGroup({
      debut: new FormControl( Validators.required),
      fin: new FormControl( Validators.required),
    });
  }


  onSubmit(event: MouseEvent) {
    this.submitted = true;
    if (this.formAnneeAcademique.valid) {

      var annee : AnneeAcademique= {
        debut: this.formAnneeAcademique.value.debut,
        fin: this.formAnneeAcademique.value.fin
      }
      // Save datas create user in database
      const url = `${apiConfig.admin.anneeAcademique.create}`;
      this.AdminService.saveResource(url, annee).subscribe(
        {
          next: res => {
            alert("cool")
          },
          error: err => {
            alert("error")

          }
        }
      );
    }
  }






}
