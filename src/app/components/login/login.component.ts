import { Component } from '@angular/core';
import { UsersService } from '../../core/services/users/users.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule , RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  isLoading:boolean = false
  errMsg:string = ''
constructor( private _UsersService:UsersService  , private _Router:Router){}


loginForm:FormGroup = new FormGroup({
  email:new FormControl(null , [Validators.required]),
  password:new FormControl(null , [Validators.required])
})

loginSubmit(){
  
  if (this.loginForm.valid) {
    this.isLoading = true
    this._UsersService.signIn(this.loginForm.value).subscribe({
      next:(res)=>{
        this.isLoading = false
        if (res.message == 'success') {
          localStorage.setItem('userToken' , res.token)
          this._UsersService.userDataToken()
        this._Router.navigate(['/home'])
        }
        console.log(res);
      },
      error:(err)=>{
        this.isLoading = false;
        this.errMsg = err.error.error;
        console.log(err);  
      }
     })
  } else{
    this.loginForm.markAllAsTouched()
  }
}
}


