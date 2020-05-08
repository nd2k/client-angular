import { Component, OnInit } from '@angular/core';
import { SidenavService } from 'src/app/shared/services/sidenav/sidenav.service';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss'],
})
export class DefaultComponent implements OnInit {
  isSidenavOpened: boolean;

  constructor(private sidenavService: SidenavService) {}

  ngOnInit(): void {
    this.sidenavService.isSidenavOpenedCurrent.subscribe(
      (isSidenavOpened) => (this.isSidenavOpened = isSidenavOpened)
    );
  }
}
