import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as userActions from '../../../shared/state/user.actions';
import { EmailValidationRequestPayload } from 'src/app/shared/dto/emailValidationRequestPayload';
import * as fromUserReducer from '../../../shared/state/user.reducer';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/shared/services/auth/auth.service';

@Component({
  selector: 'app-account-validation',
  templateUrl: './account-validation.component.html',
  styleUrls: ['./account-validation.component.scss'],
})
export class AccountValidationComponent implements OnInit {
  isActive$: Observable<boolean>;
  isActive: boolean;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private store: Store,
    private toastService: ToastrService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {}
}
