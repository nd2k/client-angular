import { Component, OnInit } from '@angular/core';
import { SidenavService } from 'src/app/shared/services/sidenav/sidenav.service';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromUserReducer from '../../shared/state/user.reducer';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss'],
  animations: [
    trigger('openCloseSidenav', [
      state('true', style({ transform: 'translateX(0)' })),
      state('false', style({ transform: 'translateX(-14rem)' })),
      transition('false <=> true', animate(300)),
    ]),
    trigger('resizeBody', [
      state('true', style({ transform: 'translateX(0)' })),
      state('false', style({ transform: 'translateX(-14rem)' })),
      transition('false <=> true', animate(300)),
    ]),
  ],
})
export class DefaultComponent implements OnInit {
  isSidenavOpened: boolean;
  isAuthenticated: boolean;

  isAuthenticated$: Observable<boolean>;

  constructor(private sidenavService: SidenavService, private store: Store) {}

  ngOnInit(): void {
    this.sidenavService.isSidenavOpenedCurrent$.subscribe(
      (isSidenavOpened) => (this.isSidenavOpened = isSidenavOpened)
    );

    this.isAuthenticated$ = this.store.select(
      fromUserReducer.getIsAuthenticated
    );
  }
}
