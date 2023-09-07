import { Injectable } from '@angular/core';
import { User } from '../interface/user';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public user: User = {
    email: '',
    password: '',
    name: ''
  }

  constructor(private httpClient: HttpClient) { }

  public getUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>(`${environment.API_PATH}/user`);
  }

  public getUserEmailFromLocalStorage(): string {
    let email: string = '';

    if (typeof localStorage.getItem('user') == 'string') {
      email = JSON.parse(localStorage.getItem('user') || '').email;
    }
    return email;
  }

}
