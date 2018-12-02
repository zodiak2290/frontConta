import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Categoria } from '../../modelos/categoria';
import { CategoriaService } from '../../services/categoria/categoria.service';
import { SweetAlert2Module } from '@toverux/ngx-sweetalert2';
import { ToastrService } from 'ngx-toastr';
import {trigger, transition, style, animate, query, stagger} from '@angular/animations';
@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  animations: [
    trigger('listAnimation', [
     transition('* => *', [
        query(':enter', [
          style({ bottom: -60, left:-20, opacity:0 }),
          stagger(100, [
            animate('0.19999s', style({ bottom: 0, left:0, opacity: 1 }))
          ])
        ])
      ])
    ])
  ],
  styleUrls: ['./categorias.component.css'],
  providers: [CategoriaService],
})
export class CategoriasComponent implements OnInit {
  private categoriaEdit: Categoria;
  private categorias: Categoria[];
  private categoriaVisualizar: Categoria;
  private showModal = false;
  private page: number;
  private pages: number;
  private numbers: number[];
  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _categoriaService: CategoriaService,
    private toastr: ToastrService
  ) {
      this.page = 1;
      this.numbers = [];
   }

  ngOnInit() {
    this.getCategorias(this.page);
  }

  getCategorias(page){
    if( page > 0  ){
      this.page = page;
      let params = { page: page, limit: 12 };
      this._categoriaService.getCategorias(params)
      .subscribe(
          response => {
            console.log(response)
              this.categorias = response.categorias.docs;
              this.pages = response.categorias.pages;
              this.numbers = this.pages ? Array.from(Array(this.pages).keys()): [];
              console.log(this.numbers)
          }, error => {
              console.log(error);
          });
    }
  }

  paginate(page){
    this.getCategorias(page);
  }

  editar(categoria){
    //this.showModal = false;
      if(categoria){
        this.categoriaEdit = categoria;
      } else {
        this.categoriaEdit = new Categoria("", "", "");
      }
      $("#myModal").modal('toggle');
      this.showModal = true;
  }

  eliminar(categoria) {
    this._categoriaService.eliminarCategoria(categoria)
    .subscribe(
      response => {
        this.toastr.success('Categoria!', 'Se elimino: ' + categoria.nombre);
        this.getCategorias(this.page);
      }, error => {
          console.log(error);
      });
  }

  ubdateTable(ev){
    this.getCategorias(this.page);
  }

  addConcepts(categoria){
    this.categoriaVisualizar = categoria;
    $("#myModalConceptos").modal('toggle');
  }

}
