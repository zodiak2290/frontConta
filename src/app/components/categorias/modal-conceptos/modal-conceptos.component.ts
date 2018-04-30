import { Component, OnInit, Input } from '@angular/core';
import { Categoria } from '../../../modelos/categoria';
@Component({
  selector: 'app-modal-conceptos',
  templateUrl: './modal-conceptos.component.html',
  styleUrls: ['./modal-conceptos.component.css']
})
export class ModalConceptosComponent implements OnInit {
  @Input() categoria: Categoria;

  constructor() {
      console.log(this.categoria);
  }

  ngOnInit() {
  }

}
