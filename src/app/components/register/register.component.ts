import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsersService } from '../../core/services/users/users.service';
import { NgClass } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  isLoading:boolean = false;
  errMsg: string = '';
  constructor(private _UsersService: UsersService , private _Router:Router) { }
  registerForm: FormGroup = new FormGroup({
    name: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)]),
    rePassword: new FormControl(null, [Validators.required]),
    dateOfBirth: new FormControl(null, [Validators.required]),
    gender: new FormControl(null, [Validators.required])
  }, this.confirmPassword)



  registerSubmit(): void {
    if (this.registerForm.valid) {
      this.isLoading = true;
      this._UsersService.signUp(this.registerForm.value).subscribe({
        next: (res) => {
          this.isLoading = false
          console.log(res);
          if (res.message == "success") {
            this._Router.navigate(['/login'])
          }
        },
        error: (err) => {
          this.isLoading = false
          this.errMsg = err.error.error
          console.log(err.error.error);
        }
      })
    }else{
      this.registerForm.setErrors({'mismatch': true})
      this.registerForm.markAllAsTouched()
    }
  }

  confirmPassword(g: AbstractControl) {
    if (g.get('password')?.value === g.get('rePassword')?.value) {
      return null
    } else {
      return { mismatch: 'true' }
    }
  }
}
