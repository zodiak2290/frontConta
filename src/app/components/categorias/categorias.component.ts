import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Categoria } from '../../modelos/categoria';
import { CategoriaService } from '../../services/categoria/categoria.service';
import { SweetAlert2Module } from '@toverux/ngx-sweetalert2';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
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
    private toastr: ToastrService,
  ) {
      this.page = 1;
   }

  ngOnInit() {
    this.getCategorias(this.page);
  }

  getCategorias(page){
    if(page > 0){
      this.page = page;
      let params = { page: page };
      this._categoriaService.getCategorias(params)
      .subscribe(
          response => {
              this.categorias = response.categorias.docs;
              this.pages = response.categorias.pages;
              this.numbers = Array.from(Array(this.pages).keys());
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
