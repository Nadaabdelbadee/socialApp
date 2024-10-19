import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environments';
import { Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  UserToken:any = "";

  constructor(private _HttpClient:HttpClient , private _Router:Router) { }


  signUp(data:object):Observable<any>{
    return this._HttpClient.post(`${environment.baseUrl}users/signup` , data) 
  }
  signIn(data:object):Observable<any>{
    return this._HttpClient.post(`${environment.baseUrl}users/signin` , data) 
  }
  changePassword(data:object):Observable<any>{
    return this._HttpClient.patch(`${environment.baseUrl}users/change-password` , data) 
  }

  uploadProfilePhoto(data:object):Observable<any>{
    return this._HttpClient.put(`${environment.baseUrl}users/upload-photo` , data) 
  }
  getLoggedUserData():Observable<any>{
    return this._HttpClient.get(`${environment.baseUrl}users/profile-data`) 
  }


  userDataToken():void{
    if (localStorage.getItem('userToken') !==null) {
      this.UserToken = jwtDecode(localStorage.getItem('userToken')!)
      console.log(this.UserToken)
    }
  }

  signOut():void{
    localStorage.removeItem('userToken');
    this.UserToken = null;
    this._Router.navigate(['/login'])
  }
}
