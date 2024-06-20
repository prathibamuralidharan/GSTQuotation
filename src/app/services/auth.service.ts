import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { endPoint } from '../../environments/environment.apiEndPoint';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}
  signIn(email: any) {
    let emailPamas = new HttpParams();
    emailPamas = emailPamas.append('email', email);
    return this.http.post(endPoint.login, email, { params: emailPamas });
  }
  otpVerify(otp: any, email: any) {
    let otpParams = new HttpParams();
    otpParams = otpParams.append('otp', otp);
    return this.http.post(endPoint.otpVerify, email, { params: otpParams });
  }
}
