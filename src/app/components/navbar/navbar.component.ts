import { APP_BASE_HREF } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UsersService } from '../../core/services/users/users.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  constructor(private _UsersService: UsersService) { }
  signOut():void{
    this._UsersService.signOut()
  }
}
