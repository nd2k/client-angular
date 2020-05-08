import { Component, OnInit } from '@angular/core';
import { SidenavService } from 'src/app/shared/services/sidenav/sidenav.service';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss'],
  animations: [
    trigger('openClose', [
      state('true', style({ transform: 'translateX(0)' })),
      state('false', style({ transform: 'translateX(-20%)' })),
      transition('false <=> true', animate(500)),
    ]),
  ],
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
