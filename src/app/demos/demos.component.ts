import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../common-app/notification.service';

@Component({
  selector: 'app-demos',
  templateUrl: './demos.component.html',
  styleUrls: ['./demos.component.css']
})
export class DemosComponent implements OnInit {
  public nombre: string = 'Mundo';
  public listado = [
    {id: 1, nombre: 'Madrid'},
    {id: 2, nombre: 'barcelona'},
    {id: 3, nombre: 'AlavA'},
    {id: 4, nombre: 'VALENCIA'},
  ];
  public idProvincia = 2;
  public fontsize = 14;

  public resultado: string = null;
  public visible = true;
  public estetica = { error: true, importante: false, urgente: true };

  constructor(public notify: NotificationService) { }

  ngOnInit() {
  }

  public saluda() {
    this.resultado = `Hola ${this.nombre}`;
  }
  public despide() {
    this.resultado = `Adios ${this.nombre}`;
  }
  public di(algo: string) {
    this.resultado = `Dice ${algo}`;
  }

  public cambia() {
    this.visible = !this.visible;
    this.estetica.error = !this.estetica.error;
    this.estetica.importante = !this.estetica.importante;
  }

  public calcula(a: number, b: number): number {
    return a + b;
  }

  public add(provicia: string): void {
      const key = this.listado.length ?
        this.listado[this.listado.length - 1].id + 1 :
        1;
      this.listado.push({id: key, nombre: provicia});
      this.idProvincia = key;
  }

    // tslint:disable:member-ordering
    idiomas = [
      { codigo: 'es', region: 'España' },
      { codigo: 'pt', region: 'Portuges' },
      { codigo: 'en-US', region: 'USA' }
    ];
    idioma = this.idiomas[0].codigo;
    resultados: any[] = [];
    valCalculadora = 123;
    // tslint:enable:member-ordering
    ponResultado(origen: string, valor: any) {
      this.resultados.push({
        pos: this.resultados.length + 1,
        origen: origen,
        valor: valor
      });
    }

}
