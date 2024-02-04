import { Component, Input } from '@angular/core';
import { SharedService } from './core/services/shared.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ens-front-project';
  @Input() isAdminPage = true

  constructor(private sharedService: SharedService) { }
  dtOptions: any = {};
  ngOnInit() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 3,
      processing: true,
      dom: 'Bfrtip',
      buttons: [
        'copy', 'csv', 'excel', 'print'
      ]
    };

  }
}
