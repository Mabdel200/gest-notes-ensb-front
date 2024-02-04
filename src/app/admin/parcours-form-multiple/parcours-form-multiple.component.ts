import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ServicesService } from '../../core/services/services.service';
import { read, utils } from 'xlsx';
import { api as apiConfig } from '../../core/configs/constants';

@Component({
  selector: 'app-parcours-form-multiple',
  templateUrl: './parcours-form-multiple.component.html',
  styleUrls: ['./parcours-form-multiple.component.css']
})
export class ParcoursFormMultipleComponent implements OnInit {
  parcoursJson: any = [];
  cycles: any = [];
  niveaux: any = [];
  submitted = false;
  file?: File;

  constructor(
    private fb: FormBuilder,
    private AdminService: ServicesService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getAllCycles();
    this.getAllNiveaux();
  }


  getAllCycles() {
    this.cycles = [];
    const url = `${apiConfig.admin.cycle.getAll}`;
    this.AdminService.getResources(url).subscribe(
      (data) => {
        this.cycles = data.body;
      },
      (err) => {
        console.log('erreur', err.error.message);
      }
    );
  }



  getAllNiveaux() {
    this.niveaux = [];
    const url = `${apiConfig.admin.niveau.getAll}`;
    this.AdminService.getResources(url).subscribe(
      (data) => {
        this.niveaux = data.body;
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
        this.parcoursJson = json;
      };

    }
  }


  uploadFileData(event: MouseEvent) {
    this.submitted = true;
    const formData = new FormData();

    console.log(this.parcoursJson);

    const propertiesArray = ['niveau', 'cycle'];
    this.parcoursJson.forEach((item: any) => {
      // console.log(Object.keys(item).toString().toLowerCase());
      for (const prop of Object.keys(item)) {
        if (propertiesArray.includes(prop.toLowerCase())) {
          this.cycles.forEach((i: any) => {
            if (i.nom === item.cycle) {
              formData.append('cycle_id', i.id);
            }
          });

           this.niveaux.forEach((i: any) => {
            if (i.nom === item.niveau) {
              formData.append('niveau_id', i.id);
            }
          });
          
          // console.log(formData.getAll);

        }
      }


      // Save datas from files in database
      const url = `${apiConfig.admin.parcours.create}`;
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
