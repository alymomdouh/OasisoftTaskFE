import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { AccountService } from '../../services/account.service';
import { RegisterDto } from '../models/account';
import { ReactiveFormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CardModule,
    CommonModule,
    InputTextModule,
    ButtonModule,
    ToastModule,
  ],
  providers: [MessageService],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
  registrationForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private _router: Router,
    private accountService: AccountService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.registrationForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      userName: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }
  onSubmit(): void {
    if (this.registrationForm.valid) {
      const registerData: RegisterDto = this.registrationForm.value;
      this.accountService.Register(registerData).subscribe({
        next: (response) => {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'User registered successfully' });
          this.registrationForm.reset();  // Reset the form on success
        },
        error: (err) => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: err.message });
        }
      });
    }
  }
  backToLogin() {
    this._router.navigate(["/auth/login"]);
  }
}
