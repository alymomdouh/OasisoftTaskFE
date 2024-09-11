import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { LoginDto, RegisterDto, UserResult } from '../components/models/account';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { jwtDecode } from "jwt-decode";
@Injectable({
  providedIn: 'root'
})
export class AccountService {

  apiUrl = environment.baseUrl + 'Account';
  constructor(
    private http: HttpClient,
    private jwtHelper: JwtHelperService,
    private router: Router,
  ) {
  }
  Login(item: LoginDto): Observable<UserResult> {
    return this.http.post<UserResult>(`${this.apiUrl}/Login`, item);
  }
  Register(item: RegisterDto): Observable<UserResult> {
    return this.http.post<UserResult>(`${this.apiUrl}/Register`, item);
  }
  public isAuthenticatedUser(): boolean {
    let expireOn = localStorage.getItem('token_expiresOn');
    const token = localStorage.getItem('token');
    if (expireOn != null && token != null) {
      let expireOnDate = new Date(Number(expireOn) * 1000);
      if (expireOnDate > new Date()) {
        return true;
      }
    }
    return false;
  }
  getAccessToken(): string | null {
    return localStorage.getItem('token');
  }
  decodeToken(token: string): any {
    return this.jwtHelper.decodeToken(token);
  }
  getUserId(): string | null {
    return localStorage.getItem('UserId');
  }
  isTokenExpired(token: string): boolean {
    return this.jwtHelper.isTokenExpired(token);
  }
  logout(): void {
    //localStorage.removeItem('token');
    localStorage.clear();
    this.router.navigate(['auth/login']); // Redirect to login page
  }
  public processToken(user: UserResult): void {
    if (user && user.token && user.token != null) {
      let tokenDecoded: any = this.encrypt(user.token);
      localStorage.setItem("token", user.token);
      localStorage.setItem("token_expiresOn", tokenDecoded.exp);
      localStorage.setItem("UserId", tokenDecoded.sid);
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.clear();
    }
  }
  public encrypt(data: any): string {
    return jwtDecode(data)
  }
}