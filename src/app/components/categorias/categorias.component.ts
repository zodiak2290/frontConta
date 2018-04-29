import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Categoria } from '../../modelos/categoria';
import { CategoriaService } from '../../services/categoria/categoria.service';
@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css'],
  providers: [CategoriaService]
})
export class CategoriasComponent implements OnInit {
  private categorias: Categoria[];
  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _categoriaService: CategoriaService
  ) { }

  ngOnInit() {
    this.getCategorias();
  }

  getCategorias(){
    this._categoriaService.getCategorias()
    .subscribe(
        response => {
            this.categorias = response.categorias;
                        console.log(this.categorias);
        }, error => {
            //var errorMessage = <any>error;
            //console.log(errorMessage);
        })
  }

}
