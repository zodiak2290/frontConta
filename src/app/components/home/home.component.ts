import { Component, OnInit } from '@angular/core';
import { Categoria } from '../../modelos/categoria';
import { Movimiento } from '../../modelos/movimiento';
import { NgbCalendar, NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import { CategoriaService } from '../../services/categoria/categoria.service';
import { ConceptoService } from '../../services/concepto/concepto.service';
import { MovimientoService } from '../../services/movimiento/movimiento.service';
import * as moment from 'moment';

import swal from'sweetalert2';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [CategoriaService, ConceptoService, MovimientoService]
})
export class HomeComponent implements OnInit {

  public movimientos: Movimiento[] = [];
  public total: number;
  private fechaCalendar: NgbDateStruct;
  //public categoriaSelected: Categoria;
  public categorias: Array<Categoria>;
  public categoriaSelected:Array<Categoria>;
  

  constructor(
    private calendar: NgbCalendar,
    private _categoriaService: CategoriaService,
    private _conceptoService: ConceptoService,
    private _movimientoService: MovimientoService,
    private toastr: ToastrService
  ) { 
    
  }

  ngOnInit() {
    this.categoriaSelected = [];
    this.fechaCalendar = this.calendar.getToday();
    this.calculateTotal();
    this.getCategorias();
  }

  getCategorias(){
    this._categoriaService.getCategorias({limit: 10000000})
    .subscribe(
      response => {
        let categorias =  response.categorias.docs;
        //this.categoriaSelected = categorias[0];
        this.categorias = categorias;
      }, error => {
          console.log(error);
      }
    );
  }

  newMovimiento(){
    if ( this.validarMontoMovimientos() ){
      let fecha = new Date( this.fechaCalendar.year, this.fechaCalendar.month - 1 , this.fechaCalendar.day );
      let movimiento = new Movimiento("", 0, "", 0, "", fecha, this.categorias[0], null);
      this.movimientos.push( movimiento );
      this.callConceptos( movimiento );
    } else {
      swal('Ingresar montos', "", 'error');
    }
  }

  validarMontoMovimientos(){
    let montosValidos = true;
    if( this.movimientos.length > 0){
      this.movimientos.forEach( (movimiento) => {
        montosValidos =  montosValidos && movimiento.monto > 0;
      });
    }

    return montosValidos;
  }

  deleteMovimiento( movimiento ) {
    console.log( movimiento );
    this.movimientos =  this.movimientos.filter(x => x != movimiento);
    this.calculateTotal();
  }

  calculateTotal(){
    this.total = 0;
    if(this.movimientos.length > 0){
      this.movimientos.forEach(element => {
          this.total = this.total + element.monto;
      });
    } 
  }

  callConceptos( movimiento ){
    let indice = this.movimientos.indexOf(movimiento);
    console.log( indice )
    let seleccionada = movimiento.categoriaSelected;
    this._conceptoService.getConceptos({limit: 10000000,  idcategoria: seleccionada._id })
    .subscribe(
      response => {
        this.movimientos[ indice ].categoriaSelected.conceptos = response.conceptos.docs;
        this.movimientos[ indice ].conceptoSelected = this.movimientos[ indice ].categoriaSelected.conceptos[0];
      }, error => {
          console.log(error);
      }
    );
  }

  guardar(){
    if ( this.validarMontoMovimientos() ){
      let fecha = new Date( this.fechaCalendar.year, this.fechaCalendar.month - 1 , this.fechaCalendar.day );
      var localLocale = moment(fecha);
      localLocale.locale('es');
      swal({
        title: "Se guardaran los movimeintos para la fecha",
        text: moment( localLocale ).format('LLLL'),
        showCancelButton:true
      })
      .then((willDelete) => {
        if (willDelete.value ) {
          this.guardarMovimiento();
        }
      });
    } else {
      this.toastr.error('Error!', 'Ingresa montos');
    }

  }

  guardarMovimiento(){
    this.movimientos.forEach( (movimiento, indice) => {
      movimiento.concepto_id = movimiento.conceptoSelected._id;
      let fecha = new Date( this.fechaCalendar.year, this.fechaCalendar.month - 1 , this.fechaCalendar.day );
      movimiento.setFecha( fecha ) ;
      $("#fila-" + indice).find('input, select, textarea, button').attr('disabled', true);

      this._movimientoService.addMovimiento( movimiento )
      .subscribe(
        response => {
          $("#delete-" + indice).find('i').removeClass('fa-times').addClass('fa-check');
          $("#delete-" + indice).removeClass('btn-danger ').addClass('btn-success');
            //var fecha = this.movimiento.fecha;
            //this.movimiento = new Movimiento("", 0, "", 0, "", fecha, null);
            //this.toastr.success('OK!', 'Agregado');
        }, error => {
          $("#fila-" + indice).find('input, select, textarea, button').attr('disabled', false);
          this.toastr.error("No fue pisible agregar el movimiento:" + movimiento.categoriaSelected.nombre )
        }
      )
    });
  }

  limpiar(){
    this.movimientos = [];
  }

}
