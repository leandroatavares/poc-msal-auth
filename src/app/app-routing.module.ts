import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { MsalGuard } from './msal.guard';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login-page' },
  { path: 'login-page', component: LoginPageComponent },
  { path: 'home-page', component: HomePageComponent, canActivate:[ MsalGuard ] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
