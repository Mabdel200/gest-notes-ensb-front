import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ServicesService } from '../../core/services/services.service';
import { read, utils } from 'xlsx';
import { api as apiConfig } from '../../core/configs/constants';
import { NotificationService } from '../../core/services/notification.service';

@Component({
  selector: 'app-preinscription',
  templateUrl: './preinscription.component.html',
  styleUrls: ['./preinscription.component.css']
})
export class PreinscriptionComponent {
submit() {
  //alert('cool')
}

  preinscriptionJson: any = [];
  submitted = false;
  userId: any;
  file?: File;

  form!: FormGroup
  public errorMessages = {
    required: 'Ce champ est requis.',
    email: 'Format de l\'email invalide.',
    minlength: 'Ce champ doit contenir au moins {{ requiredLength }} caractères.',
  };

  constructor(
    private fb: FormBuilder,
    private AdminService: ServicesService,
    private notification:NotificationService,) { }

  onSelectFile(events: any) {
    if (events.target.files && events.target.files[0]) {
      const reader = new FileReader();
      reader.readAsArrayBuffer(events.target.files[0]);
      reader.onload = (e) => {
        const data = e?.target?.result;
        const workbook = read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        let json = utils.sheet_to_json(worksheet);
        this.preinscriptionJson = json
        //console.log(json);
        //this.json = json;
      };

    }
  }


  uploadFileData(event: MouseEvent) {
    this.submitted = true;

    console.log(this.preinscriptionJson);

    const propertiesArray = ['email', 'date de naissance', 'genre', 'lieu de naissance', 'matricule', 'noms et prenoms', 'region','nationalite', 'type', 'numero telephone'];
    this.preinscriptionJson.forEach((item: any) => {
      // console.log(Object.keys(item).toString().toLowerCase());
      const keys = Object.keys(item);
      const convertedObject: any = {};
      for (const key of keys) {
        convertedObject[key.toLowerCase()] = item[key];
      }
      for (const prop of keys) {
        if (propertiesArray.includes(prop.toLowerCase())) {
          var etudiant: any = {
            email: convertedObject.email,
            dateDeNaissance: convertedObject['date de naissance'],
            genre: convertedObject.genre === 'F' ? 0 : 1,
            type: convertedObject.type === 'regulier' ? 'ER' : convertedObject.type === 'etranger' ? 'ET' : 'AL',
            lieuDeNaissance: convertedObject['lieu de naissance'],
            matricule: convertedObject.matricule,
            nom: convertedObject['noms et prenoms'],
            region: convertedObject.region,
            nationalite: convertedObject.nationalite,
            numeroTelephone: convertedObject['numero telephone']
          }

        }
      }
      console.log(etudiant);


      // Save datas from files in database
      const url = `${apiConfig.admin.etudiant.create}`;
      this.AdminService.saveResource(url, etudiant).subscribe(
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
    })

  }

}
