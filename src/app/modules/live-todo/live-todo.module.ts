import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LiveTodoRoutingModule } from './live-todo-routing.module';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SharedModule,
    LiveTodoRoutingModule
  ]
})
export class LiveTodoModule { }
