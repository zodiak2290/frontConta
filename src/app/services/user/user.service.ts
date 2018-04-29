import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Obserbable } from 'rxjs/Obserbable';
import { GLOBAL } from '../global/global.service';
import { User } from '../../modelos/user';

@Injectable()
export class UserService {
  public url:string;
  constructor(public _http: HttpClient) {
    this.url = GLOBAL.url;
  }
  register(user: User): Obserbable<any>{
    let params = JSON.stringify(user);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.post(this.url + 'registrar', params, { headers: headers });
  }
}
