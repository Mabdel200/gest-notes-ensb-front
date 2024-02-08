import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { read, utils } from 'xlsx';
import { api as apiConfig } from '../../core/configs/constants';
import { ServicesService } from '../../core/services/services.service';
import { NotificationService } from '../../core/services/notification.service';
@Component({
  selector: 'app-note-examen',
  templateUrl: './note-examen.component.html',
  styleUrls: ['./note-examen.component.scss']
})
export class NoteExamenComponent implements OnInit {

  noteJson: any = [];
  constructor(
    private AdminService: ServicesService,
    private notification:NotificationService
  ) { }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
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
        this.noteJson = json
        //console.log(json);
        //this.json = json;
      };

    }
  }

  uploadFileData(event: MouseEvent) {

    console.log(this.noteJson);

    const propertiesArray = ['anonymat', 'valeur'];
    this.noteJson.forEach((item: any) => {
      // console.log(Object.keys(item).toString().toLowerCase());
      const keys = Object.keys(item);
      const convertedObject: any = {};
      for (const key of keys) {
        convertedObject[key.toLowerCase()] = item[key];
      }

      // Save datas from files in database
      const url = `${apiConfig.admin.notes.examen}`;

      var notes: any = {
        etudiant: convertedObject.anonymat,
        valeur: convertedObject.valeur,
      }

      console.log('cc', notes);
      this.AdminService.saveResource(url + convertedObject.anonymat + '/note?note=' + convertedObject.valeur,notes).subscribe(
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
