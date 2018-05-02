import { Component, OnInit } from '@angular/core';
import { Movimiento } from '../../modelos/movimiento';

@Component({
  selector: 'app-movimiento',
  templateUrl: './movimiento.component.html',
  styleUrls: ['./movimiento.component.css']
})
export class MovimientoComponent implements OnInit {
  public movimiento: Movimiento;
  constructor() { }

  ngOnInit() {
    this.movimiento = new Movimiento("", 0, "", 0, "");
  }

}
