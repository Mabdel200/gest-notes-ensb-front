import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { api as apiConfig } from '../../core/configs/constants';
import { ActivatedRoute } from '@angular/router';
import { ServicesService } from '../../core/services/services.service';
import { read, utils } from 'xlsx';
import { NotificationService } from '../../core/services/notification.service';


@Component({
  selector: 'app-niveau-form-multiple',
  templateUrl: './niveau-form-multiple.component.html',
  styleUrls: ['./niveau-form-multiple.component.css']
})
export class NiveauFormMultipleComponent implements OnInit {
  niveauJson: any = [];
  cycles: any = [];
  submitted = false;
  file?: File;

  constructor(
    private notification:NotificationService,
    private fb: FormBuilder,
    private AdminService: ServicesService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getAllCycles();
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
        this.niveauJson = json;
      };

    }
  }


  uploadFileData(event: MouseEvent) {
    this.submitted = true;
    const formData = new FormData();

    console.log(this.niveauJson);

    const propertiesArray = ['valeur', 'estTerminal', 'cycle'];
    this.niveauJson.forEach((item: any) => {
      // console.log(Object.keys(item).toString().toLowerCase());
      for (const prop of Object.keys(item)) {
        if (propertiesArray.includes(prop.toLowerCase())) {
          this.cycles.forEach((i: any) => {
            if (i.nom === item.cycle) {
              formData.append('cycle_id', i.id);
            }
          });
          formData.append('terminal', item.estTerminal);
          formData.append('valeur', item.valeur);

          // console.log(formData.getAll);

        }
      }


      // Save datas from files in database
      const url = `${apiConfig.admin.niveau.create}`;
      this.AdminService.saveResource(url, formData).subscribe(
        (data) => {
          const res: any = data;
          console.log('response: ', res);
          console.log('ID: ', res.body.id);
          if (res.status === 201) {
            this.notification.record()
          } else {
            this.submitted = false;
            console.log('echec');
            this.notification.error()

          }
        },
        (err) => {
          this.notification.error()
        }
      );
    })

  }

}
