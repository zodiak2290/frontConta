import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Categoria } from '../../../modelos/categoria';
import { Concepto } from '../../../modelos/concepto';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ConceptoService } from '../../../services/concepto/concepto.service';
import { SweetAlert2Module } from '@toverux/ngx-sweetalert2';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-modal-conceptos',
  templateUrl: './modal-conceptos.component.html',
  styleUrls: ['./modal-conceptos.component.css'],
  providers: [ConceptoService],
})
export class ModalConceptosComponent implements OnInit, OnChanges {
  @Input() categoria: Categoria;

  private conceptoEdit: Concepto;
  private conceptos: Concepto[];

  private page: number;
  private pages: number;
  private numbers: number[];

  constructor(
      private _route: ActivatedRoute,
      private _router: Router,
      private _conceptoService: ConceptoService,
      private toastr: ToastrService
    ) {
      this.page = 1;
  }

  ngOnInit() {
    this.getConceptos(this.page);
  }

  getConceptos(page){
    if(page > 0){
      this.page = page;
      let params = { page: page, idcategoria: this.categoria._id };
      console.log(params);
      this._conceptoService.getConceptos(params)
      .subscribe(
          response => {console.log(response);
              this.conceptos = response.conceptos.docs;
              //this.pages = response.categorias.pages;
              //this.numbers = Array.from(Array(this.pages).keys());
          }, error => {
              console.log(error);
          });
    }
  }

  eliminar(concepto){
    this._conceptoService.eliminarConcepto(concepto)
    .subscribe(
      response => {console.log(response);
        this.toastr.success('Concepto!', 'Eliminado: ' + concepto.nombre);
        this.getConceptos(this.page);
      }, error => {
          console.log(error);
      });
  }

  ngOnChanges(changes: SimpleChanges) {
    if(changes.categoria){
      this.getConceptos(this.page);
    }
  }

}
