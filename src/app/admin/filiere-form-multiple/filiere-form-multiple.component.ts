import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { api as apiConfig } from '../../core/configs/constants';
import { ActivatedRoute } from '@angular/router';
import { ServicesService } from '../../core/services/services.service';
import { read, utils } from 'xlsx';
import { Departement } from '../../core/models/departement';
import { NotificationService } from '../../core/services/notification.service';



@Component({
  selector: 'app-filiere-form-multiple',
  templateUrl: './filiere-form-multiple.component.html',
  styleUrls: ['./filiere-form-multiple.component.css']
})
export class FiliereFormMultipleComponent implements OnInit {
  filiereJson: any = [];
  departements!: Departement[];
  submitted = false;
  file?: File;
  form!: FormGroup;

  constructor(
    private notification:NotificationService,
    private fb: FormBuilder,
    private AdminService: ServicesService,
    private router: Router,
    private route: ActivatedRoute) { }
  ngOnInit(): void {
    this.onForm();
    this.getAllDepartements();
  }

  onForm() {
    this.form = new FormGroup({
      departement: new FormControl('', [Validators.required]),

    })
  }

  getAllDepartements() {
    this.departements = [];
    const url = `${apiConfig.admin.departement.getAll}`;
    this.AdminService.getResources(url).subscribe(
      (data) => {
        this.departements = data.body;
      },
      (err) => {
        console.log('erreur', err.error.message);
      }
    );
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
        this.filiereJson = json;
      };

    }
  }


  uploadFileData(event: MouseEvent) {
    this.submitted = true;

    console.log(this.filiereJson);
    var option: any;
    const propertiesArray = ['code', 'description(fr)', 'description(en)'];

    if (this.form.valid) {
      this.filiereJson.forEach((item: any) => {
        // console.log(Object.keys(item).toString().toLowerCase());
        const keys = Object.keys(item);
        const convertedObject: any = {};
        for (const key of keys) {
          console.log(item[key]);
          convertedObject[key.toLowerCase()] = item[key];
        }
        for (const prop of keys) {
          if (propertiesArray.includes(prop.toLowerCase())) {

            option = {
              descriptionEnglish: convertedObject['description(en)'],
              descriptionFrench: convertedObject['description(fr)'],
              code: convertedObject.code,
              departement: this.findDepartement(Number(this.form.value.departement)),
            }


          }
        }



        // Save datas from files in database

        const url = `${apiConfig.admin.option.create}`;
        this.AdminService.saveResource(url, option).subscribe(
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

  findDepartement(id: Number) {

    return this.departements.find(item => item.id === id)

  }

}
