import { Component, Input, OnInit } from '@angular/core';
import { navAdmin } from '../../inteface/navigation';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  @Input() adminNavigation = navAdmin
  ngOnInit(): void {
    console.log(this.adminNavigation)
  }

}