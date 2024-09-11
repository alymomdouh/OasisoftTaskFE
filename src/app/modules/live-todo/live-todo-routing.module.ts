import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListLiveTodoComponent } from './components/list-live-todo/list-live-todo.component';
import { AuthGuard } from '../auth/guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'list', pathMatch: 'full' },
  {
    path: "list",
    canActivate: [AuthGuard],
    component: ListLiveTodoComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LiveTodoRoutingModule { }
