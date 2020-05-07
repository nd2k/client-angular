import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
} from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import { CompareFieldsValidator } from '../../utils/compareFields';
import { UserRequestPayload } from '../../dto/userRequestPayload';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

import { Store } from '@ngrx/store';
import * as userActions from '../../state/user.actions';
import * as fromUser from '../../state/user.reducer';
import { Observable } from 'rxjs';
import { User } from 'src/app/model/user.model';
import { ErrorResponsePayload } from '../../dto/errorResponsePayload';

declare var $: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, AfterViewInit {
  registerForm: FormGroup;
  loginForm: FormGroup;
  userRequestPayload: UserRequestPayload;
  user: User;

  faEnvelope = faEnvelope;
  faLock = faLock;

  isActive$: Observable<boolean>;
  isSignup$: Observable<boolean>;
  isAuthenticated$: Observable<boolean>;
  user$: Observable<User>;
  error$: Observable<ErrorResponsePayload>;
  isActive: boolean;
  isSignup: boolean;
  isAuthenticated: boolean;
  error: ErrorResponsePayload;

  @ViewChild('signupTab') signupTab: ElementRef;
  @ViewChild('signinTab') signinTab: ElementRef;
  @ViewChild('signupForm') signupForm: ElementRef;
  @ViewChild('signinForm') signinForm: ElementRef;

  @ViewChild('modal') modal: ElementRef;

  constructor(
    private toastr: ToastrService,
    private router: Router,
    private store: Store
  ) {
    this.userRequestPayload = {
      email: '',
      password: '',
    };
  }

  ngOnInit(): void {
    this.registerForm = new FormGroup(
      {
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [
          Validators.required,
          Validators.minLength(4),
        ]),
        confirmedPassword: new FormControl('', Validators.required),
      },
      {
        validators: CompareFieldsValidator('password', 'confirmedPassword'),
      }
    );

    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
      ]),
    });

    this.user$ = this.store.select(fromUser.getUser);
    this.isAuthenticated$ = this.store.select(fromUser.getIsAuthenticated);
    this.isActive$ = this.store.select(fromUser.getIsActive);
    this.isSignup$ = this.store.select(fromUser.getIsSignup);
    this.error$ = this.store.select(fromUser.getError);

    this.user$.subscribe((user) => {
      this.user = user;
      return user;
    });

    this.isAuthenticated$.subscribe((isAuthenticated) => {
      if (isAuthenticated) {
        this.toastr.success(this.user.message);
      }
      return isAuthenticated;
    });

    this.isSignup$.subscribe((isSignup) => {
      if (isSignup) {
        this.toastr.success(this.user.message);
      }
    });

    this.error$.subscribe((error) => {
      if (error) {
        this.toastr.error(error.errorMessage);
      }
    });
  }

  ngAfterViewInit(): void {}

  signUp() {
    this.userRequestPayload.email = this.registerForm.get('email').value;
    this.userRequestPayload.password = this.registerForm.get('password').value;
    this.store.dispatch(new userActions.UserSignup(this.userRequestPayload));
    this.registerForm.reset();
    this.signupTab.nativeElement.classList.remove('active');
    this.signupForm.nativeElement.classList.remove('active', 'show');
    this.signinTab.nativeElement.classList.add('active');
    this.signinForm.nativeElement.classList.add('active', 'show');
  }

  signIn() {
    this.userRequestPayload.email = this.loginForm.get('email').value;
    this.userRequestPayload.password = this.loginForm.get('password').value;
    this.store.dispatch(new userActions.UserSignin(this.userRequestPayload));
    this.loginForm.reset();
    $(this.modal.nativeElement).modal('hide');
    this.router.navigate(['/dashboard']);
  }

  signOut() {
    this.store.dispatch(new userActions.UserSignout(this.userRequestPayload));
  }
}
