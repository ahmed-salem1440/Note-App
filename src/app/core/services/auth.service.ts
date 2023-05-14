import  jwtDecode from 'jwt-decode';
import { Observable,BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private _HttpClient:HttpClient,private _Router:Router) { 
    this.decodeUserData()
  }
  decodedData:BehaviorSubject<any> = new BehaviorSubject(null);
  decodeUserData():void{
    const Token = localStorage.getItem('userToken')
    if(Token){      
      this.decodedData.next(jwtDecode(Token))
      this._Router.navigate(['/home'])
    }
  }
  
  
  register(userData:any):Observable<any>{
    return this._HttpClient.post(environment.baseUrl+'signup',userData)
  }
  login(userData:any):Observable<any>{
    return this._HttpClient.post(environment.baseUrl+'signin',userData)
  }
  logout(){
    localStorage.removeItem('userToken')
    this.decodedData.next(null)
    this._Router.navigate(['/login'])
  }
}
