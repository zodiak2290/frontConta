import { Component, OnInit, Input, DoCheck, EventEmitter, Output } from '@angular/core';
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
  @Output() ubdateTable = new EventEmitter();

  constructor(
    private toastr: ToastrService,
    private _categoriaService: CategoriaService
  ) {
    this.title = "Agregar";
  }

  ngOnInit() {
    //this.categoria = this.categoriaEdit;
    if(this.categoriaEdit._id != ""){
      this.title = "Editar";
    }  else {
        this.title = "Agregar";
    }
  }

  addCategoria(addCategoriaForm){
    if(this.categoria && !this.categoria._id){
      this._categoriaService.addCategoria(this.categoria)
      .subscribe(
        response => {
            if(response.categoria){
              $("#myModal").modal('toggle');console.log(response);
              this.toastr.success('Categoria', 'Se agrego la categoria:'  + response.categoria.nombre);
              //addCategoriaForm.reset();
              this.ubdateTable.emit();
            } else {
              this.toastr.success('Categoria', response.message);
            }
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
            //addCategoriaForm.reset();
        }, error => {
            console.log(error);
        }
      );
    }
  }

  ngDoCheck() {
    if(this.categoriaEdit._id != ""){
      this.title = "Editar";
    }  else {
        this.title = "Agregar";
    }
   this.categoria = this.categoriaEdit;
  }
}
