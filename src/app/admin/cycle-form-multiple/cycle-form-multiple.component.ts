import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { api as apiConfig } from '../../core/configs/constants';
import { ActivatedRoute } from '@angular/router';
import { ServicesService } from '../../core/services/services.service';
import { read, utils } from 'xlsx';


@Component({
  selector: 'app-cycle-form-multiple',
  templateUrl: './cycle-form-multiple.component.html',
  styleUrls: ['./cycle-form-multiple.component.css']
})
export class CycleFormMultipleComponent {
  cycleJson: any = [];
  submitted = false;
  file?: File;

  constructor(
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
        this.cycleJson = json;
      };

    }
  }


  uploadFileData(event: MouseEvent) {
    this.submitted = true;
    const formData = new FormData();

    console.log(this.cycleJson);

    const propertiesArray = ['nom', 'diplomeEn', 'diplomeFr'];
    this.cycleJson.forEach((item: any) => {
      // console.log(Object.keys(item).toString().toLowerCase());
      for (const prop of Object.keys(item)) {
        if (propertiesArray.includes(prop.toLowerCase())) {

          formData.append('diplomeEn', item.diplomeEn);
          formData.append('diplomeFr', item.diplomeFr);
          formData.append('nom', item.nom);

          // console.log(formData.getAll);
        }
      }
      // Save datas from files in database
      const url = `${apiConfig.admin.cycle.create}`;
      this.AdminService.saveResource(url, formData).subscribe(
        (data) => {
          const res: any = data;
          console.log('response: ', res);
          console.log('ID: ', res.body.id);
          if (res.status === 201) {
          } else {
            this.submitted = false;
            console.log('echec');

          }
        },
        (err) => {
          // this.notify.error(Errors(err.error.message), 'Major Error');
          console.log('erreur', err.error.message);
          // console.log(Errors(err.error.message));
        }
      );
    })

  }
}
