import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { api as apiConfig } from '../../core/configs/constants';
import { ActivatedRoute } from '@angular/router';
import { ServicesService } from '../../core/services/services.service';
import { read, utils } from 'xlsx';

@Component({
  selector: 'app-evaluation-form-multiple',
  templateUrl: './evaluation-form-multiple.component.html',
  styleUrls: ['./evaluation-form-multiple.component.css']
})
export class EvaluationFormMultipleComponent implements OnInit {
  evaluationJson: any = [];
  typeCours: any = [];
  submitted = false;
  file?: File;

  
  constructor(
    private fb: FormBuilder,
    private AdminService: ServicesService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getAllTypesCours();
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
        this.evaluationJson = json;
      };

    }
  }

  getAllTypesCours() {
    this.typeCours = [];
    const url = `${apiConfig.admin.cours.getAll}`;
    this.AdminService.getResources(url).subscribe(
      (data) => {
        this.typeCours = data.body;
      },
      (err) => {
        console.log('erreur', err.error.message);
      }
    );
  }



  uploadFileData(event: MouseEvent) {
    this.submitted = true;
    const formData = new FormData();

    console.log(this.evaluationJson);

    const propertiesArray = ['code', 'description', 'estUnExamen', 'pourcentage', 'typeCours'];
    this.evaluationJson.forEach((item: any) => {
      // console.log(Object.keys(item).toString().toLowerCase());
      for (const prop of Object.keys(item)) {
        if (propertiesArray.includes(prop.toLowerCase())) {
          this.typeCours.forEach((i: any) => {
            if (i.nom === item.typeCours) {
              formData.append('typeCours_id', i.id);
            }
          });

          formData.append('isExam', item.estUnExamen);
          formData.append('code', item.code);
          formData.append('description', item.description);
          formData.append('pourcentage', item.pourcentage);

          // console.log(formData.getAll);

        }
      }


      // Save datas from files in database
      const url = `${apiConfig.admin.evaluation.create}`;
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
