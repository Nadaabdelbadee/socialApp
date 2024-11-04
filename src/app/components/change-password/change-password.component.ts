import { Component } from '@angular/core';
import { UsersService } from '../../core/services/users/users.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.scss'
})
export class ChangePasswordComponent {
  isLoading:boolean = false
chnagePasswordForm:FormGroup = new FormGroup({
  password:new FormControl(null , [Validators.required]),
  newPassword:new FormControl(null , [Validators.required , Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)]),
})
  constructor(private _UsersService:UsersService , private _Router:Router){}
  reset():void{
    this.isLoading = true
    this._UsersService.changePassword(this.chnagePasswordForm.value).subscribe({
      next:(res)=>{
        this.isLoading = false
        console.log(res.token);
        localStorage.setItem("userToken" , res.token);
        this._Router.navigate(['/home'])
      },error:(err)=>{
        console.log(err);
        this.isLoading = false
      }
    })
  }
}
