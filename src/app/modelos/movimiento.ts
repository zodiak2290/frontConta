import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
export class Movimiento {
  constructor(
    public _id: string,
    public monto: number,
    public motivo: string,
    public tipo: number,//0 Gasto 1Ingreso
    public concepto_id: string,
    public fecha: Date
  ){}

  setFecha( fecha:Date ){
    this.fecha = fecha;
  }
}
