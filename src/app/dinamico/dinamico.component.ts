import { Component, OnInit } from '@angular/core';
import { HomeComponent } from '../home/home.component';
import { DemosComponent } from '../demos/demos.component';

@Component({
  selector: 'app-dinamico',
  templateUrl: './dinamico.component.html',
  styleUrls: ['./dinamico.component.css'],
  entryComponents: [HomeComponent, DemosComponent, ],
})
export class DinamicoComponent implements OnInit {
  public menu = [
    {texto: 'Home', componente: HomeComponent},
    {texto: 'Demos', componente: DemosComponent},
  ];
  public seleccionado = this.menu[0].componente;

  constructor() { }

  public seleccionar(indice: number) {
    this.seleccionado = this.menu[indice].componente;
  }
  ngOnInit() {
  }

}
