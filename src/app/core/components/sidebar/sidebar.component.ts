import { Component, Input, OnInit } from '@angular/core';
import { navAdmin } from '../../inteface/navigation';
import { MenuState } from '../../inteface/menu';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  @Input() adminNavigation = navAdmin
  @Input() menuState: MenuState = new MenuState();

    ngOnInit(): void {
      console.log(this.adminNavigation)
      console.log(this.menuState)
    }

}