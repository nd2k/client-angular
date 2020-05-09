import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SidenavService {
  private isSidenavOpenedSource = new BehaviorSubject<boolean>(false);
  isSidenavOpenedCurrent$ = this.isSidenavOpenedSource.asObservable();

  constructor() {}

  toggleSidenav(isSidenavOpened: boolean) {
    this.isSidenavOpenedSource.next(isSidenavOpened);
  }
}
