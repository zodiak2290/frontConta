import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import { Categoria } from './categoria';
import { Concepto } from './concepto';
export class Movimiento {
  constructor(
    public _id: string,
    public monto: number,
    public motivo: string,
    public tipo: number,//0 Gasto 1Ingreso
    public concepto_id: string,
    public fecha: Date,
    public categoriaSelected:Categoria,
    public conceptoSelected: Concepto
  ){}

  setFecha( fecha:Date ){
    this.fecha = fecha;
  }
}
