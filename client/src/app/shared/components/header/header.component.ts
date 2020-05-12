import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
} from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import {
  faEnvelope,
  faLock,
  faBars,
  faCog,
  faSignOutAlt,
} from '@fortawesome/free-solid-svg-icons';
import { CompareFieldsValidator } from '../../utils/compareFields';
import { UserRequestPayload } from '../../dto/userRequestPayload';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

import { Store } from '@ngrx/store';
import * as userActions from '../../state/user.actions';
import * as fromUser from '../../state/user.reducer';
import { Observable } from 'rxjs';
import { User } from '../../model/user.model';
import { ErrorResponsePayload } from '../../dto/errorResponsePayload';
import { LocalStorageService } from 'ngx-webstorage';
import { LogoutUserRequestPayload } from '../../dto/logoutUserRequestPayload';
import { SidenavService } from '../../services/sidenav/sidenav.service';
import { RegisterUserRequestPayload } from '../../dto/registerUserRequestPayload';
import { LoginUserRequestPayload } from '../../dto/loginUserRequestPayload';
import { HtmlElService } from '../../services/htmlEl/html-el.service';

declare var $: any;
/**
 * @HeaderComponent
 * Header component of the app
 */
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, AfterViewInit {
  isSidenavOpened: boolean;

  registerForm: FormGroup;
  loginForm: FormGroup;
  userRequestPayload: UserRequestPayload;
  registerUserRequestPayload: RegisterUserRequestPayload;
  loginUserRequestPayload: LoginUserRequestPayload;
  user: User;
  logoutUserRequestPayload: LogoutUserRequestPayload;

  faEnvelope = faEnvelope;
  faLock = faLock;
  faBars = faBars;
  faCog = faCog;
  faSignOutAlt = faSignOutAlt;

  isActive$: Observable<boolean>;
  isAuthenticated$: Observable<boolean>;
  isSignup$: Observable<boolean>;
  isSignin$: Observable<boolean>;
  isTokenRefreshed$: Observable<boolean>;
  user$: Observable<User>;
  error$: Observable<ErrorResponsePayload>;
  isActive: boolean;
  isSignup: boolean;
  isSignin: boolean;
  isTokenRefreshed: boolean;
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
    private store: Store,
    private localStorageService: LocalStorageService,
    private sidenavService: SidenavService,
    private htmlElService: HtmlElService
  ) {
    this.registerUserRequestPayload = {
      email: '',
      password: '',
    };
    this.loginUserRequestPayload = {
      email: '',
      password: '',
    };
    this.logoutUserRequestPayload = {
      refreshToken: '',
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
    this.isSignin$ = this.store.select(fromUser.getIsSignin);
    this.isActive$ = this.store.select(fromUser.getIsActive);
    this.isSignup$ = this.store.select(fromUser.getIsSignup);
    this.isTokenRefreshed$ = this.store.select(fromUser.getTokenRefreshed);
    this.error$ = this.store.select(fromUser.getError);

    this.user$.subscribe((user) => {
      this.user = user;
      return user;
    });

    this.isTokenRefreshed$.subscribe((isTokenRefreshed) => {
      this.isTokenRefreshed = isTokenRefreshed;
      return isTokenRefreshed;
    });

    this.isSignin$.subscribe((isSignin) => {
      if (isSignin) {
        this.toastr.success(this.user.message);
      }
      return isSignin;
    });

    this.isSignup$.subscribe((isSignup) => {
      if (isSignup) {
        this.toastr.success(this.user.message);
      }
    });

    this.error$.subscribe((error) => {
      if (error && !this.isTokenRefreshed) {
        this.toastr.error(error.errorMessage);
      }
    });

    this.sidenavService.isSidenavOpenedCurrent$.subscribe((isSidenavOpened) => {
      this.isSidenavOpened = isSidenavOpened;
    });
  }

  toggleSidenav() {
    this.sidenavService.toggleSidenav(
      (this.isSidenavOpened = !this.isSidenavOpened)
    );
  }

  closeSidenav(event: Event) {
    this.sidenavService.toggleSidenav(false);
  }

  ngAfterViewInit(): void {
    this.htmlElService.modalElement = this.modal.nativeElement;
  }

  /**
   * @SignUp method
   * Method used to sign up the user
   * Data are coming from the registerForm
   */
  public signUp(): void {
    this.registerUserRequestPayload.email = this.registerForm.get(
      'email'
    ).value;
    this.registerUserRequestPayload.password = this.registerForm.get(
      'password'
    ).value;
    this.store.dispatch(
      new userActions.UserSignup(this.registerUserRequestPayload)
    );
    this.registerForm.reset();
    this.signupTab.nativeElement.classList.remove('active');
    this.signupForm.nativeElement.classList.remove('active', 'show');
    this.signinTab.nativeElement.classList.add('active');
    this.signinForm.nativeElement.classList.add('active', 'show');
  }

  /**
   * @SignIn method
   * Method used to sign in the user
   * Data are coming from loginForm
   */
  public signIn(): void {
    this.loginUserRequestPayload.email = this.loginForm.get('email').value;
    this.loginUserRequestPayload.password = this.loginForm.get(
      'password'
    ).value;
    this.store.dispatch(
      new userActions.UserSignin(this.loginUserRequestPayload)
    );
    this.loginForm.reset();
    $(this.modal.nativeElement).modal('hide');
    if (this.isAuthenticated) {
      this.router.navigate(['/dashboard']);
    } else {
      this.router.navigate(['/']);
    }
  }

  /**
   * @SignOut method
   * Method used to sign out the user
   */
  public signOut(): void {
    this.logoutUserRequestPayload.refreshToken = this.localStorageService.retrieve(
      'refreshToken'
    );
    this.store.dispatch(
      new userActions.UserSignout(this.logoutUserRequestPayload)
    );
  }
}
