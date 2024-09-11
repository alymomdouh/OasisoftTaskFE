import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenubarModule } from 'primeng/menubar';
import { SharedRoutingModule } from './shared-routing.module';
import { TieredMenuModule } from 'primeng/tieredmenu';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MenubarModule,
    TieredMenuModule,
    SharedRoutingModule
  ]
})
export class SharedModule { }
