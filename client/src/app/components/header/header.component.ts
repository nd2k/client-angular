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
import { AuthService } from '../../services/auth/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

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
  isAuthenticated: Boolean;

  faEnvelope = faEnvelope;
  faLock = faLock;

  @ViewChild('signupTab') signupTab: ElementRef;
  @ViewChild('signinTab') signinTab: ElementRef;
  @ViewChild('signupForm') signupForm: ElementRef;
  @ViewChild('signinForm') signinForm: ElementRef;

  @ViewChild('modal') modal: ElementRef;

  constructor(
    private authService: AuthService,
    private toastr: ToastrService,
    private router: Router
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
    this.isAuthenticated = this.authService.isAuthenticated();
  }

  ngAfterViewInit(): void {}

  signUp() {
    this.userRequestPayload.email = this.registerForm.get('email').value;
    this.userRequestPayload.password = this.registerForm.get('password').value;

    this.authService.signup(this.userRequestPayload).subscribe(
      (data) => {
        console.log(data);
        this.registerForm.reset();
        this.toastr.success(data.message);
        this.signupTab.nativeElement.classList.remove('active');
        this.signupForm.nativeElement.classList.remove('active', 'show');
        this.signinTab.nativeElement.classList.add('active');
        this.signinForm.nativeElement.classList.add('active', 'show');
      },
      (error) => {
        console.log(error);
      }
    );
  }

  signIn() {
    this.userRequestPayload.email = this.loginForm.get('email').value;
    this.userRequestPayload.password = this.loginForm.get('password').value;

    this.authService.signin(this.userRequestPayload).subscribe(
      (data) => {
        console.log(data);
        this.registerForm.reset();
        this.toastr.success(data.message);
        $(this.modal.nativeElement).modal('hide');
        this.router.navigate(['/dashboard']);
      },
      (error) => {
        console.log(error);
        this.toastr.error(error.error.errorMessage);
      }
    );
  }
}
