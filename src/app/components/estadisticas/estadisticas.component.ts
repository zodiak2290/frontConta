import { Component, OnInit } from '@angular/core';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

import { MovimientoService } from '../../services/movimiento/movimiento.service';
import { ChartService } from '../../services/chart/chart.service';

@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.component.html',
  styleUrls: ['./estadisticas.component.css'],
  providers: [MovimientoService, ChartService],
})
export class EstadisticasComponent implements OnInit {
	fechaIni: String;
	fechaFin: String;
  	total: Number;

  	constructor(private _movimientoService: MovimientoService, private _chartService: ChartService) {
		this.fechaIni = "2017-06-01";
		this.fechaFin = "2017-06-30";
  	}

  	ngOnInit() {
  		this.getChartData();
	}


  	getChartData() {

  		let params = {
  			fechaIni: this.fechaIni,
  			fechaFin: this.fechaFin
  		}
  		this._movimientoService.getGastos( params )
  		.subscribe(
          	response => {
          		let chart = this._chartService.getBarChart();
          		chart.data = response.gastos;
          		this.total = 0;
          		console.log( response.gastos)
          		response.gastos.forEach((gasto) => { this.total += gasto.total });
          	}, error => {
              	console.log(error);
          	});
  	}

}

