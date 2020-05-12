import { Component, OnInit } from '@angular/core';
import { SidenavService } from '../../services/sidenav/sidenav.service';

declare var $: any;

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
})
export class SidenavComponent implements OnInit {
  isSidenavOpened: boolean;

  constructor(private sidenavService: SidenavService) {}

  ngOnInit(): void {
    this.sidenavService.isSidenavOpenedCurrent$.subscribe((isSidenavOpened) => {
      this.isSidenavOpened = isSidenavOpened;
    });
  }

  closeSidenav(event: Event) {
    if (this.isSidenavOpened && !event.target) {
      console.log('close outside sidenav');
      this.sidenavService.toggleSidenav(false);
    }
  }
}
