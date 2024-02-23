import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ServicesService } from '../../core/services/services.service';
import { read, utils } from 'xlsx';
import { api as apiConfig } from '../../core/configs/constants';

@Component({
  selector: 'app-type-cours-form-multiple',
  templateUrl: './type-cours-form-multiple.component.html',
  styleUrls: ['./type-cours-form-multiple.component.css']
})
export class TypeCoursFormMultipleComponent {

  typeCoursJson: any = [];
  submitted = false;
  file?: File;

  constructor(
    private fb: FormBuilder,
    private AdminService: ServicesService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
  }



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
        this.typeCoursJson = json;
      };

    }
  }


  uploadFileData(event: MouseEvent) {
    this.submitted = true;
    const formData = new FormData();

    console.log(this.typeCoursJson);

    const propertiesArray = ['abreviation'];
    this.typeCoursJson.forEach((item: any) => {
      // console.log(Object.keys(item).toString().toLowerCase());
      for (const prop of Object.keys(item)) {
        if (propertiesArray.includes(prop.toLowerCase())) {

          formData.append('abreviation', item.abreviation);
          // console.log(formData.getAll);

        }
      }


      // Save datas from files in database
      const url = `${apiConfig.admin.typeCours.create}`;
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



