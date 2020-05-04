import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SignUpRequestPayload } from 'src/app/dto/signUpRequestPayload';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private httpClient: HttpClient) {}

  signup(signUpRequestPayload: SignUpRequestPayload): Observable<any> {
    return this.httpClient.post(
      'http://localhost:3000/api/v1/auth/register',
      signUpRequestPayload
    );
  }
}
