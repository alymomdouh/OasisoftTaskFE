import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { TieredMenuModule } from 'primeng/tieredmenu';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { AvatarModule } from 'primeng/avatar'; import { ButtonModule } from 'primeng/button';
import { AccountService } from '../../../auth/services/account.service';
@Component({
  selector: 'app-app-layout',
  standalone: true,
  imports: [TieredMenuModule, ToastModule, ToolbarModule, AvatarModule, ButtonModule],
  providers: [MessageService],
  templateUrl: './app-layout.component.html',
  styleUrl: './app-layout.component.css'
})
export class AppLayoutComponent implements OnInit {

  items: MenuItem[] | undefined;
  logoutitems: MenuItem[] | undefined;
  constructor(
    public accountService: AccountService,
    private messageService: MessageService) { }
  ngOnInit() {
    this.logoutitems = [
      {
        label: 'settings',
        icon: 'bi bi-gear-wide'
      },
      {
        label: 'userPage',
        icon: 'bi bi-file-earmark-fill'
      },
      {
        label: 'termsOfUsage',
        icon: 'bi bi-file-earmark-fill'
      },
      {
        label: 'logout',
        icon: 'bi bi-power',
        command: () => {
          this.Logout();
        }
      },
      {
        label: 'Register New User',
        icon: 'bi bi-power',
        routerLink: '/auth/register'
      }

    ];
    this.items = [
      {
        label: 'To Do',
        icon: 'pi pi-file',
        routerLink: '/home/todo/list'
      },
      {
        label: 'Live To Do',
        icon: 'pi pi-file',
        routerLink: '/home/live-todo/list'
      }
    ];
  }
  Logout() {
    this.accountService.logout();
  }
} 
