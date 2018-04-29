import { Component, OnInit } from '@angular/core';
import { Categoria } from '../../../modelos/categoria';
import { CategoriaService } from '../../../services/categoria/categoria.service';

@Component({
  selector: 'app-add-categoria',
  templateUrl: './add-categoria.component.html',
  styleUrls: ['./add-categoria.component.css'],
  providers: [CategoriaService]
})
export class AddCategoriaComponent implements OnInit {
  public categoria: Categoria;
  constructor(
    private _categoriaService: CategoriaService
  ) {
    this.categoria = new Categoria("", "", "");
  }

  ngOnInit() {
  }

  addCategoria(){
    this._categoriaService.addCategoria(this.categoria)
    .subscribe(
      response => {
          console.log(response);
          $("#myModal").close();
      }, error => {
          console.log(error);
      }
    );
  }

}
