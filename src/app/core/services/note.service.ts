import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import jwtDecode from 'jwt-decode';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class NoteService {
  token:string = localStorage.getItem('userToken')!
  userData:any = jwtDecode(this.token)
userInfo:object = {
  token:this.token,
  userID:this._AuthService.decodedData.getValue()._id
}
  constructor(private _HttpClient:HttpClient, private _AuthService:AuthService) { }
  addNote(note:any):Observable<any>{
    return this._HttpClient.post(environment.baseUrl+'addNote',note)
  } 
  updateNote(note:any):Observable<any>{
    return this._HttpClient.put(environment.baseUrl+'updateNote',note)
  } 
  getUserNotes():Observable<any>{
    return this._HttpClient.post(environment.baseUrl + 'getUserNotes', this.userInfo)
  }
  deleteNote(NoteForm:any):Observable<any>{
    return this._HttpClient.delete(environment.baseUrl + 'deleteNote', NoteForm)
  }
}
