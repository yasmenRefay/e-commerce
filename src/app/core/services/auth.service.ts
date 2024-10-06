import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { Observable } from 'rxjs';
import { Environment } from '../environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userData:any;
  private readonly _Router=inject(Router)


  constructor(private _HttpClient:HttpClient) { }

  setRegisterForm(data:object):Observable<any>
  {
    return this._HttpClient.post(`${Environment.baseUrl}/api/v1/auth/signup`, data);
  }


  setloginForm(data:object):Observable<any>
  {
    return this._HttpClient.post(`${Environment.baseUrl}/api/v1/auth/signin`, data);
  }


  saveUserData():void
  {
    if(localStorage.getItem('userToken') !== null)
      {
        this.userData = jwtDecode(localStorage.getItem('userToken')!)
      }
  }


  logOut():void
  {
    //1- Remove token
    localStorage.removeItem('userToken');
    // 2- property null
    this.userData= null;
    // 3- navigate login
    this._Router.navigate([ '/login' ])
  }





  setVerifyEmail(data:object):Observable<any>
  {
    return this._HttpClient.post(`${Environment.baseUrl}/api/v1/auth/forgotPasswords`, data)
  }

  setVerifyCode(data:object):Observable<any>
  {
    return this._HttpClient.post(`${Environment.baseUrl}/api/v1/auth/verifyResetCode`, data)
  }

  setResetPassword(data:object):Observable<any>
  {
    return this._HttpClient.put(`${Environment.baseUrl}/api/v1/auth/resetPassword`, data)
  }



}


