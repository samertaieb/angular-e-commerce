import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user';
import { environment } from 'src/environments/environment'
@Injectable({
  providedIn: 'root',
})
export class AuthentificationService {
baseUrl="http://localhost:3000/"
  constructor(private http:HttpClient) { }
  register(user:User):Observable<User>{
    return this.http.post<User>(this.baseUrl+"auth/register",user)
  }
  login(user:User):Observable<User>{
    return this.http.post<User>(this.baseUrl+"auth/login",user )
  }
} 
