import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as fromUserReducer from '../state/user.reducer';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss'],
})
export class SpinnerComponent implements OnInit {
  isLoading$: Observable<boolean>;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.isLoading$ = this.store.select(fromUserReducer.getIsLoading);
    this.isLoading$.subscribe((isLoading) => {
      return isLoading;
    });
  }
}
