import { Component, OnInit, Input, DoCheck } from '@angular/core';
import { Categoria } from '../../../modelos/categoria';
import { CategoriaService } from '../../../services/categoria/categoria.service';

@Component({
  selector: 'app-add-categoria',
  templateUrl: './add-categoria.component.html',
  styleUrls: ['./add-categoria.component.css'],
  providers: [CategoriaService]
})
export class AddCategoriaComponent implements OnInit, DoCheck {
  public categoria: Categoria;
  private title:string;
  @Input() categoriaEdit: Categoria;
  constructor(
    private _categoriaService: CategoriaService
  ) {
    this.title = "Agregar";
    this.categoria = new Categoria("", "", "");
  }

  ngOnInit() {
    if(this.categoriaEdit){
      this.categoria = this.categoriaEdit;
      this.title = "Editar";
    }
  }

  addCategoria(){
    if(!this.categoriaEdit){
      this._categoriaService.addCategoria(this.categoria)
      .subscribe(
        response => {
            $("#myModal").modal('toggle');
        }, error => {
            console.log(error);
        }
      );
    } else {
      this._categoriaService.editCategoria(this.categoria)
      .subscribe(
        response => {
            $("#myModal").modal('toggle');
        }, error => {
            console.log(error);
        }
      );
    }
  }

  ngDoCheck() {
    if(this.categoriaEdit){
      this.categoria = this.categoriaEdit;
      this.title = "Editar";
    } else {
      this.title = "Agregar";
      this.categoria = new Categoria("", "", "");
    }
  }

}
