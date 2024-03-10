import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../../core/services/services.service';
import { NotificationService } from '../../core/notification.service';
import { ActivatedRoute, Router } from '@angular/router';
import { api as apiConfig } from '../../core/configs/constants';
import { FormGroup, FormControl, Validators } from '@angular/forms';
@Component({
  selector: 'app-update-note-ue',
  templateUrl: './update-note-ue.component.html',
  styleUrl: './update-note-ue.component.scss'
})
export class UpdateNoteUeComponent implements OnInit {
  codeUE!: string;
  codeEva!: string;
  anneeAca!: number;
  parcours!: string;
  matricule!: string;
  nom!: string;
  noteId!: number;
  valeur!: number;

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


    this.noteId = Number(str[7])
    this.codeUE = str[0]
    this.codeEva = str[5]
    this.anneeAca = Number(str[2])
    this.parcours = str[1]
    this.nom = str[4]
    this.matricule = str[3]
    this.form.setValue(
      {
        valeur: str[6],
      })
  }

  submit() {
    if (this.form.valid) {
      const url = `${apiConfig.admin.notes.update}`;
      this.adminService.updateResource(url + this.noteId, this.form.value.valeur).subscribe(
        {
          next: res => {
            this.notification.update()
            this.router.navigate(['notes/listenote']);
          },
          error: err => {
            this.notification.error()

          }
        }
      );
    }

  }




}
