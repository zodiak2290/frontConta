import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { Movimiento } from '../../modelos/movimiento';
import { Categoria } from '../../modelos/categoria';
import { Concepto } from '../../modelos/concepto';
import { ConceptoService } from '../../services/concepto/concepto.service';
import { CategoriaService } from '../../services/categoria/categoria.service';
import { MovimientoService } from '../../services/movimiento/movimiento.service';
import {NgbDateStruct, NgbCalendar} from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-movimiento',
  templateUrl: './movimiento.component.html',
  styleUrls: ['./movimiento.component.css'],
  providers: [CategoriaService, ConceptoService, MovimientoService]
})
export class MovimientoComponent implements OnInit {
  public movimiento: Movimiento;
  public categoriaSelected: Categoria;
  public conceptoSelected: Concepto;
  public categorias: Array<Categoria>;
  public conceptos: Array<Concepto>;
  private fechaCalendar: NgbDateStruct;
  constructor(
    private _categoriaService: CategoriaService,
    private _conceptoService: ConceptoService,
    private _movimientoService: MovimientoService,
    private toastr: ToastrService,
    private calendar: NgbCalendar
  ) {
    this.categoriaSelected = null;
  }

  ngOnInit() {
    this.fechaCalendar = this.calendar.getToday();
    let fecha = new Date( this.fechaCalendar.year, this.fechaCalendar.month - 1 , this.fechaCalendar.day );
    //this.movimiento = new Movimiento("", 0, "", 0, "", fecha,null);
    
    this._categoriaService.getCategorias({limit: 10000000})
    .subscribe(
      response => {
        let categorias =  response.categorias.docs;
        this.categoriaSelected = categorias[0];
        this.categorias = categorias;
      }, error => {
          console.log(error);
      }
    );
  }
  callConceptos(){
    let seleccionada = this.categoriaSelected;
    this._conceptoService.getConceptos({limit: 10000000,  idcategoria: seleccionada._id })
    .subscribe(
      response => {
        this.conceptos = response.conceptos.docs;
        this.conceptoSelected = this.conceptos[0];
      }, error => {
          console.log(error);
      }
    );
  }

  addMovimiento(){
    if(this.conceptos && this.conceptoSelected){
      let conceptselect = this.conceptoSelected;
      this.movimiento.concepto_id = conceptselect._id;
      let fecha = new Date( this.fechaCalendar.year, this.fechaCalendar.month - 1  , this.fechaCalendar.day );
      this.movimiento.setFecha( fecha );
      console.log( this.movimiento );
      
      this._movimientoService.addMovimiento(this.movimiento)
      .subscribe(
          response => {
              var fecha = this.movimiento.fecha;
              //this.movimiento = new Movimiento("", 0, "", 0, "", fecha, null);
              this.toastr.success('OK!', 'Agregado');
          }, error => {
              console.log(error);
          }
      )
    } else {
        this.toastr.error('Alerta!', 'No se ha seleccionado ningun concepto');
    }
  }

}