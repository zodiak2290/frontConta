import { Concepto } from './concepto';

export class Categoria {
  constructor(
    public _id: string,
    public nombre: string,
    public usuario_id: string,
    public conceptos: Concepto[]
  ){}
}
