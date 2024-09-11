import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from '../../services/account.service';
import { LoginDto, UserResult } from '../models/account';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { DialogModule } from 'primeng/dialog';
import { PasswordModule } from 'primeng/password';
import { CommonModule } from '@angular/common';
import { JwtHelperService } from '@auth0/angular-jwt';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ButtonModule,
    CommonModule,
    InputTextModule,
    FormsModule,
    ReactiveFormsModule,
    ToastModule,
    PasswordModule,
    DialogModule
  ],
  providers: [
    AccountService, MessageService,
    JwtHelperService
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  constructor(
    private accountService: AccountService,
    private _router: Router,
    private messageService: MessageService,
  ) {
  }
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
  });
  get loginFormControls() {
    return this.loginForm.controls;
  }
  submited = false;
  submit() {
    this.submited = true;
    if (this.loginForm.invalid) {
      return;
    }

    const loginMode: LoginDto = {
      email: this.loginForm.value.email ?? '',
      password: this.loginForm.value.password ?? ''
    };
    this.accountService.Login(loginMode)
      .subscribe({
        next: (res: UserResult) => {
          debugger
          if (res && res.id) {
            this.accountService.processToken(res);
            this._router.navigate(['/home/index']);
          }
        },
        error: (err) => {
          this.messageService.add({ severity: 'warn', summary: 'Error', detail: err.error, life: 3000 });
        }
      });
  }
  register() {
    this._router.navigate(["/auth/register"]);
  }
}
