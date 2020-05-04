import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserRequestPayload } from 'src/app/dto/userRequestPayload';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private httpClient: HttpClient) {}

  signup(userRequestPayload: UserRequestPayload): Observable<any> {
    return this.httpClient.post(
      'http://localhost:3000/api/v1/auth/register',
      userRequestPayload
    );
  }

  signin(userRequestPayload: UserRequestPayload): Observable<any> {
    return this.httpClient.post(
      'http://localhost:3000/api/v1/auth/login',
      userRequestPayload
    );
  }
}
