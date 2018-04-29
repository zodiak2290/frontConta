import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { GLOBAL } from '../global/global.service';
import { User } from '../../modelos/user';

@Injectable()
export class UserService {
  public url:string;
  private headers: HttpHeaders;
  constructor(public _http: HttpClient) {
    this.url = GLOBAL.url;
    this.headers = new HttpHeaders().set('Content-Type', 'application/json');
  }
  register(user: User): Observable<any>{
    return this.postUser('registrar', user);
  }

  signUp(user:User, token = null): Observable<any> {
    if(token != null){
      user.token = token;
    }
    return this.postUser('login', user);
  }

  postUser(ruta: string, user){
    let params = JSON.stringify(user);
    return this._http.post(this.url + ruta, params, { headers: this.headers });
  }

  getIdentity(){
    let identity = JSON.parse(localStorage.getItem('identity'));
    if(identity != 'undefined'){
      return identity;
    } else {
      return false;
    }
  }

  getToken() {
    let token = localStorage.getItem('token');
    if(token != 'undefined'){
      return token;
    } else {
      return false;
    }
  }
}
