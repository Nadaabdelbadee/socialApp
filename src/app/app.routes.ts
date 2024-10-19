import { authGuard } from './core/guards/auth.guard';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import path from 'path';
import { BlankLayoutComponent } from './layouts/blank-layout/blank-layout.component';
import { loggedGuard } from './core/guards/logged.guard';

export const routes: Routes = [
    {path:'' ,component:AuthLayoutComponent , canActivate:[loggedGuard] , children:[
        {path:'' , redirectTo:'login' ,pathMatch:'full'},
        {path:'login' ,component:LoginComponent},
        {path:'register' , component:RegisterComponent}
    ]    
    },
    {path:'' ,component:BlankLayoutComponent ,canActivate:[authGuard] , children:[
        {path:'', redirectTo:'home' , pathMatch:'full'},
        {path:'home' , component:HomeComponent},
        {path:'changePass' ,component:ChangePasswordComponent}
    ]},
    {path:'**' , component:NotFoundComponent}
];
