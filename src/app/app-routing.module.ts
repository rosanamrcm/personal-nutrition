import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { authenticationGuard } from './guard/authentication.guard';
import { userResolver } from './resolver/user.resolver';

const routes: Routes = [
  { 
    path: '', 
    component: LoginComponent
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [authenticationGuard]
  },
  {
    path: 'register',
    component: RegisterComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
