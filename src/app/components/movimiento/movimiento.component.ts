import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { Movimiento } from '../../modelos/movimiento';
import { Categoria } from '../../modelos/categoria';
import { Concepto } from '../../modelos/concepto';
import { ConceptoService } from '../../services/concepto/concepto.service';
import { CategoriaService } from '../../services/categoria/categoria.service';
import { MovimientoService } from '../../services/movimiento/movimiento.service';
@Component({
  selector: 'app-movimiento',
  templateUrl: './movimiento.component.html',
  styleUrls: ['./movimiento.component.css'],
  providers: [CategoriaService, ConceptoService, MovimientoService]
})
export class MovimientoComponent implements OnInit {
  public movimiento: Movimiento;
  public categoriaSelected: Categoria;
  public conceptoSelected: string;
  public categorias: Array<Categoria>;
  public conceptos: Array<Concepto>;
  constructor(
    private _categoriaService: CategoriaService,
    private _conceptoService: ConceptoService,
    private _movimientoService: MovimientoService,
    private toastr: ToastrService
  ) {
    this.categoriaSelected = null;
  }

  ngOnInit() {
    this.movimiento = new Movimiento("", 0, "", 0, "", "");
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
    let categoriaSelec = this.categorias.find(function(categoria){
        return categoria._id == seleccionada;
    });
    console.log(this.categoriaSelected.nombre);
    /*this._conceptoService.getConceptos({limit: 10000000,  idcategoria: categoriaSelec._id })
    .subscribe(
      response => {
        this.conceptos = response.conceptos.docs;
      }, error => {
          console.log(error);
      }
    );*/
  }

  addMovimiento(){
    console.log(this.conceptoSelected);
    console.log(this.conceptos);
    if(this.conceptos && this.conceptoSelected){
      console.log(this.conceptoSelected);
      let conceptselect = this.conceptoSelected;
      console.log(conceptselect);
      let concepto = this.conceptos.find(function(conceptoCU){
          return conceptoCU._id == conceptselect;
      });
      this.movimiento.concepto_id = concepto._id;
      //this.movimiento.fecha = new Date(this.movimiento.fecha);
      console.log(this.movimiento);
      this._movimientoService.addMovimiento(this.movimiento)
      .subscribe(
          response => {
              var fecha = this.movimiento.fecha;
              this.movimiento = new Movimiento("", 0, "", 0, "", fecha);
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
