import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { GLOBAL } from '../global/global.service';
import { Categoria } from '../../modelos/categoria';

@Injectable()
export class CategoriaService {
  public url:string;
  private headers: HttpHeaders;
  constructor(public _http: HttpClient) {
    this.url = GLOBAL.url;
    this.headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', this.getToken());
  }

  getCategorias(params: any): Observable<any>{
    params.limit = 12;
    return this._http.get(this.url + 'categoria', {headers: this.headers, params: params});
  }

  addCategoria(categoria: Categoria): Observable<any>{
    categoria.usuario_id = this.getIdentity()._id;
    let params = JSON.stringify(categoria);
    return this._http.post(this.url + 'categoria', params, { headers: this.headers });
  }

  editCategoria(categoria: Categoria) : Observable<any>{
    let params = JSON.stringify(categoria);
    return this._http.put(this.url + 'categoria/' + categoria._id, params, { headers: this.headers });
  }

  eliminarCategoria(categoria: Categoria): Observable<any>{
    return this._http.delete(this.url + 'categoria/' + categoria._id, { headers: this.headers });
  }


  getToken() {
    let token = localStorage.getItem('token');
    let response = null;
    if(token != 'undefined'){
      response = token;
    }
    return response;
  }

  getIdentity(){
    let identity = JSON.parse(localStorage.getItem('identity'));
    if(identity != 'undefined'){
      return identity;
    } else {
      return false;
    }
  }
}
