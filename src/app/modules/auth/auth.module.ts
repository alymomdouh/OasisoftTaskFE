import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { SharedModule } from '../shared/shared.module';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AccountService } from './services/account.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SharedModule,
    AuthRoutingModule
  ],
  providers: [
    JwtHelperService,
    AccountService
  ],
})
export class AuthModule { }
