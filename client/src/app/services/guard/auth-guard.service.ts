import { Injectable } from '@angular/core';
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromUser from '../../state/user.reducer';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate {
  isAuthenticated$: Observable<boolean>;
  isAuthenticated: boolean;

  constructor(private router: Router, private store: Store) {
    this.isAuthenticated$ = this.store.select(fromUser.getIsAuthenticated);
    this.isAuthenticated$.subscribe((isAuthenticated) => {
      this.isAuthenticated = isAuthenticated;
      return isAuthenticated;
    });
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (this.isAuthenticated) {
      return this.isAuthenticated;
    }

    this.router.navigate(['']);
    return false;
  }
}
