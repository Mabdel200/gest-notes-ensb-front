import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from '../../core/notification.service';
import { ServicesService } from '../../core/services/services.service';
import { api as apiConfig } from '../../core/configs/constants';

@Component({
  selector: 'app-update-note-ec',
  templateUrl: './update-note-ec.component.html',
  styleUrl: './update-note-ec.component.scss'
})
export class UpdateNoteEcComponent implements OnInit {
  codeUE!: string;
  codeEC!: string;
  codeEva!: string;
  anneeAca!: number;
  parcours!: string;
  matricule!: string;
  nom!: string;
  noteId!: number;

  public errorMessages = {
    required: 'Ce champ est requis.',
  };

  constructor(private notification: NotificationService, private adminService: ServicesService, private router: Router, private route: ActivatedRoute) {

  }
  form!: FormGroup;
  onForm() {
    this.form = new FormGroup({
      valeur: new FormControl('', [Validators.required])
    })
  }
  ngOnInit(): void {
    this.onForm();
    var slug = this.route.snapshot.params['slug'];
    var str = decodeURIComponent(slug).split('%');
    console.log(str);


    this.noteId = Number(str[8])
    this.codeUE = str[1]
    this.codeEC = str[0]
    this.codeEva = str[6]
    this.anneeAca = Number(str[3])
    this.parcours = str[2]
    this.nom = str[5]
    this.matricule = str[4]
    this.form.setValue(
      {
        valeur: str[7],
      })
  }


  submit() {
    if (this.form.valid) {
      const url = `${apiConfig.admin.notes.update}`;
      this.adminService.updateResource(url + this.noteId, this.form.value.valeur).subscribe(
        {
          next: res => {
            this.notification.update()
            this.router.navigate(['administrator/notes/listenotesec']);
          },
          error: err => {
            this.notification.error()

          }
        }
      );
    }

  }


}
