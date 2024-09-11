import { Routes } from '@angular/router';
import { AuthGuard } from './modules/auth/guards/auth.guard';
import { AppLayoutComponent } from './modules/shared/components/app-layout/app-layout.component';

export const routes: Routes = [
    { path: '', redirectTo: 'auth/login', pathMatch: 'full' },

    {
        path: 'auth',
        loadChildren: () =>
            import('./modules/auth/auth.module').then((m) => m.AuthModule),
    },
    {
        path: 'home',
        canActivate: [AuthGuard],
        component: AppLayoutComponent,
        children: [
            { path: '', redirectTo: 'index', pathMatch: 'full' },
            {
                path: 'todo',
                loadChildren: () =>
                    import('./modules/todo/todo.module').then((m) => m.TodoModule),
            },
            {
                path: 'live-todo',
                loadChildren: () =>
                    import('./modules/live-todo/live-todo.module').then((m) => m.LiveTodoModule),
            },
            {
                path: "index",
                loadChildren: () =>
                    import('./modules/shared/shared.module').then((m) => m.SharedModule),
            }
        ]
    },
];
