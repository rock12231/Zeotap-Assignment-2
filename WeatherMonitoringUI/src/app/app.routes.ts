import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './shared/guard/auth.guard';
import { NgModule } from '@angular/core';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { BaseComponent } from './components/base/base.component';
import { RegisterComponent } from './components/register/register.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    {
        path: '', component: BaseComponent,
        children: [
        { path: 'home', component: HomeComponent },
        ]
    },
    { path: '**', component: BaseComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }