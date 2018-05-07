export class Movimiento {
  constructor(
    public _id: string,
    public monto: number,
    public motivo: string,
    public tipo: number,//0 Gasto 1Ingreso
    public concepto_id: string,
    public fecha: string
  ){}
}
