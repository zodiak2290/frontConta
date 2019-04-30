import { Injectable } from '@angular/core';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

@Injectable()
export class ChartService {

  	getBarChart() {
  		am4core.useTheme(am4themes_animated);
  		let chart = am4core.create("chartdiv", am4charts.XYChart3D);

  		let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
	  	categoryAxis.dataFields.category = "nombre";
		categoryAxis.renderer.labels.template.rotation = 270;
		categoryAxis.renderer.labels.template.hideOversized = false;
		categoryAxis.renderer.minGridDistance = 20;
		categoryAxis.renderer.labels.template.horizontalCenter = "right";
		categoryAxis.renderer.labels.template.verticalCenter = "middle";
		categoryAxis.tooltip.label.rotation = 270;
		categoryAxis.tooltip.label.horizontalCenter = "right";
		categoryAxis.tooltip.label.verticalCenter = "middle";

		let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
		valueAxis.title.text = "Countries";
		valueAxis.title.fontWeight = "bold";

		let series = chart.series.push(new am4charts.ColumnSeries3D());
		series.dataFields.valueY = "total";
		series.dataFields.categoryX = "nombre";
		series.name = "Visits";
		series.tooltipText = "{categoryX}: [bold]{valueY}[/]";
		series.columns.template.fillOpacity = .8;

		let columnTemplate = series.columns.template;
		columnTemplate.strokeWidth = 2;
		columnTemplate.strokeOpacity = 1;
		columnTemplate.stroke = am4core.color("#FFFFFF");

		columnTemplate.adapter.add("fill", (fill, target) => {
		  return chart.colors.getIndex(target.dataItem.index);
		})

		columnTemplate.adapter.add("stroke", (stroke, target) => {
		  return chart.colors.getIndex(target.dataItem.index);
		})

		chart.cursor = new am4charts.XYCursor();
		chart.cursor.lineX.strokeOpacity = 0;
		chart.cursor.lineY.strokeOpacity = 0;

		return chart;
	  }
	  
	  getTreeMap(datos) {
		am4core.useTheme(am4themes_animated);
		
		// create chart
		let chart = am4core.create("chartdiv", am4charts.TreeMap);
		chart.hiddenState.properties.opacity = 0; // this makes initial fade in effect
		
		// only one level visible initially
		chart.maxLevels = 1;
		// define data fields
		chart.dataFields.value = "count";
		chart.dataFields.name = "name";
		chart.dataFields.children = "children";
		chart.homeText = "";
		
		// enable navigation
		chart.navigationBar = new am4charts.NavigationBar();
		
		// level 0 series template
		let level0SeriesTemplate = chart.seriesTemplates.create("0");
		level0SeriesTemplate.strokeWidth = 2;
		
		// by default only current level series bullets are visible, but as we need brand bullets to be visible all the time, we modify it's hidden state
		level0SeriesTemplate.bulletsContainer.hiddenState.properties.opacity = 1;
		level0SeriesTemplate.bulletsContainer.hiddenState.properties.visible = true;
		// create hover state
		let columnTemplate = level0SeriesTemplate.columns.template;
		let hoverState = columnTemplate.states.create("hover");
		
		// darken
		hoverState.adapter.add("fill", function (fill, target) {
		  if (fill instanceof am4core.Color) {
			return am4core.color(am4core.colors.brighten(fill.rgb, -0.2));
		  }
		  return fill;
		})
		
		// add logo
		let image = columnTemplate.createChild(am4core.Image);
		image.opacity = 0.15;
		image.align = "center";
		image.valign = "middle";
		image.width = am4core.percent(80);
		image.height = am4core.percent(80);
		
		
		
		// level1 series template
		let level1SeriesTemplate = chart.seriesTemplates.create("1");
		level1SeriesTemplate.columns.template.fillOpacity = 0;
		
		let bullet1 = level1SeriesTemplate.bullets.push(new am4charts.LabelBullet());
		bullet1.locationX = 0.5;
		bullet1.locationY = 0.5;
		bullet1.label.text = "{name}";
		bullet1.label.fill = am4core.color("#ffffff");
		
		// level2 series template
		let level2SeriesTemplate = chart.seriesTemplates.create("2");
		level2SeriesTemplate.columns.template.fillOpacity = 0;
		
		let bullet2 = level2SeriesTemplate.bullets.push(new am4charts.LabelBullet());
		bullet2.locationX = 0.5;
		bullet2.locationY = 0.5;
		bullet2.label.text = "{name}";
		bullet2.label.fill = am4core.color("#ffffff");
		
		function processData(data) {
			let treeData = [];
		  
			for (var brand in data) {
			  let brandData = { name: brand, children: [] }
			  let brandTotal = 0;
			  for (var model in data[brand]) {
				brandTotal += data[brand][model];
			  }
		  
			  for (var model in data[brand]) {
				  brandData.children.push({ name: model, count: data[brand][model] });
			  }

			  treeData.push(brandData);
			  
		  
			}

			return treeData;
		  }
		  chart.data = processData(datos);

		return chart;
		
		
	  }

}
