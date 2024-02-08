import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { read, utils } from 'xlsx';
import { api as apiConfig } from '../../core/configs/constants';
import { ServicesService } from '../../core/services/services.service';
import { Departement } from '../../core/models/departement';

import { NotificationService } from '../../core/services/notification.service';


@Component({
  selector: 'app-departement-form-multiple',
  templateUrl: './departement-form-multiple.component.html',
  styleUrls: ['./departement-form-multiple.component.css']
})
export class DepartementFormMultipleComponent {
  departementJson: any = [];
  submitted = false;
  file?: File;

  constructor(
    private notification:NotificationService,
    private fb: FormBuilder,
    private AdminService: ServicesService,
    private router: Router,
    private route: ActivatedRoute) { }



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
        this.departementJson = json;
      };

    }
  }


  uploadFileData(event: MouseEvent) {
    this.submitted = true;
    const formData = new FormData();

    console.log(this.departementJson);

    var departement: Departement;
    const propertiesArray = ['code', 'description(fr)', 'description(en)'];
    this.departementJson.forEach((item: any) => {
      // console.log(Object.keys(item).toString().toLowerCase());
      const keys = Object.keys(item);
      const convertedObject: any = {};
      for (const key of keys) {
        convertedObject[key.toLowerCase()] = item[key];
      }
      for (const prop of keys) {
        if (propertiesArray.includes(prop.toLowerCase())) {
          departement = {
            code: convertedObject.code,
            englishDescription: convertedObject['description(en)'],
            frenchDescription: convertedObject['description(fr)'],
          }

          // console.log(formData.getAll);
        }
      }
      // Save datas from files in database
      const url = `${apiConfig.admin.departement.create}`;
      this.AdminService.saveResource(url, departement).subscribe(
        {
          next: res => {

            this.notification.record()


          },
          error: err => {

            this.notification.error()
  

          }
        }
      );
    })

  }


}
