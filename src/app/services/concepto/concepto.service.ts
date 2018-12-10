import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { GLOBAL } from '../global/global.service';
import { Concepto } from '../../modelos/concepto';

@Injectable()
export class ConceptoService {
  public url:string;
  private headers: HttpHeaders;
  constructor(public _http: HttpClient) {
      this.url = GLOBAL.url;
      this.headers = new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('Authorization', this.getToken());
  }

  getConceptos(params: any): Observable<any>{
    return this._http.get(this.url + 'conceptos', {headers: this.headers, params: params});
  }

  addCategoria(concepto: Concepto): Observable<any>{
    //categoria.usuario_id = this.getIdentity()._id;
    let params = JSON.stringify(concepto);
    return this._http.post(this.url + 'categoria/'+ concepto.categoria_id +'/concepto', params,
    { headers: this.headers });
  }

  editConcepto(concepto: Concepto) : Observable<any>{console.log(concepto);
    let params = JSON.stringify(concepto);
    return this._http.put(this.url + 'concepto/' + concepto._id, params, { headers: this.headers });
  }

  eliminarConcepto(concepto: Concepto): Observable<any>{
    return this._http.delete(this.url + 'concepto/' + concepto._id, { headers: this.headers });
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
