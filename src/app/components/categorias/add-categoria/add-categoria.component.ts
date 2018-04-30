import { Component, OnInit, Input, DoCheck } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
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
    private toastr: ToastrService,
    private _categoriaService: CategoriaService
  ) {
    this.title = "Agregar";
  }

  ngOnInit() {console.log(this.categoriaEdit);
    //this.categoria = this.categoriaEdit;
    if(this.categoriaEdit._id != ""){
      this.title = "Editar";
    }  else {
        this.title = "Agregar";
    }
  }

  addCategoria(){
    if(this.categoria && !this.categoria._id){
      this._categoriaService.addCategoria(this.categoria)
      .subscribe(
        response => {
            $("#myModal").modal('toggle');
            this.toastr.success('Categoria', 'Se agrego la categoria:'  + response.categoria.nombre);
        }, error => {
            console.log(error);
        }
      );
    } else {
      this._categoriaService.editCategoria(this.categoria)
      .subscribe(
        response => {
            $("#myModal").modal('toggle');
            this.toastr.success('Categoria!', 'Editada con exito!');
        }, error => {
            console.log(error);
        }
      );
    }
  }

  ngDoCheck() {
   this.categoria = this.categoriaEdit;
  }
}
