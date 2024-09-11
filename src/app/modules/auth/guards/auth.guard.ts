import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AccountService } from '../services/account.service';
@Injectable
    ({
        providedIn: 'root'
    })
export class AuthGuard implements CanActivate {
    constructor(private accountService: AccountService, private router: Router) {
    }
    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): boolean {
        if (this.accountService.isAuthenticatedUser()) {
            return true;
        } else {
            this.router.navigate(['/auth/login']);
            return false;
        }
    }
} 