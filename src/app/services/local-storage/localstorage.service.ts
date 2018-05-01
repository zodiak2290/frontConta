import { Injectable } from '@angular/core';

@Injectable()
export class LocalstorageService {

  constructor() { }

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
      return null;
    }
  }
}
