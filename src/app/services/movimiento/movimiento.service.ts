import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { GLOBAL } from '../global/global.service';
import { Movimiento } from '../../modelos/movimiento';

@Injectable()
export class MovimientoService {
  public url:string;
  private headers: HttpHeaders;
  constructor(public _http: HttpClient) {
    this.url = GLOBAL.url;
    this.headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', this.getToken());
  }

  addMovimiento(movimiento: Movimiento): Observable<any>{
    //categoria.usuario_id = this.getIdentity()._id;
    let params = JSON.stringify(movimiento);
    return this._http.post(this.url + 'movimiento', params, { headers: this.headers });
  }

  getToken() {
    let token = localStorage.getItem('token');
    let response = null;
    if(token != 'undefined'){
      response = token;
    }
    return response;
  }

  getGastos(params: any): Observable<any> {
    return this._http.get(this.url + 'gastos', 
      {headers: this.headers, params});
  }

}
