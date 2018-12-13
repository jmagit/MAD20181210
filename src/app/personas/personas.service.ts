import { Injectable } from '@angular/core';
import { NotificationService } from '../common-app/notification.service';
import { RESTDAOService } from '../base-code/dao-service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

export type ModoCRUD = 'list' | 'add' | 'edit' | 'view' | 'delete';

@Injectable({
  providedIn: 'root'
})
export class PersonasDaoService extends RESTDAOService<any, any> {
  constructor(http: HttpClient) {
    super(http, 'personas', { withCredentials: true });
  }
}

@Injectable()
export class PersonasViewModelDAOService {
  protected modo: ModoCRUD = 'list';
  protected listado: Array<any> = null;
  protected elemento: any = {};
  protected idOriginal: any = null;
  protected URLList = '/personas';

  constructor(protected notify: NotificationService,
    protected dao: PersonasDaoService, protected router: Router) { }

  public get Modo() { return this.modo; }
  public get Listado() { return Object.assign([], this.listado); }
  public get Elemento() { return this.elemento; }

  public list() {
    this.dao.query().subscribe(
      data => {
        this.listado = data;
        this.modo = 'list';
      },
      err => this.notify.add(err.message)
    );
  }

  public add() {
    this.elemento = {};
    this.modo = 'add';
  }
  public edit(key: any) {
    this.dao.get(key).subscribe(
      data => {
        this.elemento = data;
        this.idOriginal = key;
        this.modo = 'edit';
      },
      err => this.notify.add(err.message)
    );
  }
  public view(key: any) {
    this.dao.get(key).subscribe(
      data => {
        this.elemento = data;
        this.modo = 'view';
      },
      err => this.notify.add(err.message)
    );
  }
  public delete(key: any) {
    if (!window.confirm('¿Seguro?')) { return; }

    this.dao.remove(key).subscribe(
      data => this.list(),
      err => this.notify.add(err.message)
    );
  }

  public cancel() {
    this.elemento = {};
    this.idOriginal = null;
    // this.list();
    this.router.navigateByUrl(this.URLList);
  }

  public send() {
    switch (this.modo) {
      case 'add':
        this.dao.add(this.elemento).subscribe(
          data => this.cancel(),
          err => this.notify.add(err.message)
        );
        break;
      case 'edit':
        this.dao.change(this.idOriginal, this.elemento).subscribe(
          data => this.cancel(),
          err => this.notify.add(err.message)
        );
        break;
      case 'view':
        this.cancel();
        break;
    }
  }
}

@Injectable()
export class PersonasViewModelService {
  protected modo: ModoCRUD = 'list';
  protected listado: Array<any> = null;
  protected elemento: any = {};
  protected idOriginal: any = null;
  protected pk = 'id';

  constructor(private notify: NotificationService) { }

  public get Modo() { return this.modo; }
  public get Listado() { return Object.assign([], this.listado); }
  public get Elemento() { return this.elemento; }

  public list() {
    if (!this.listado) {
      this.listado = [
        {id: 1, nombre: 'Carmelo', apellidos: 'Coton', edad: 34},
        {id: 2, nombre: 'Pepito', apellidos: 'Grillo', edad: 155},
        {id: 3, nombre: 'Pedro', apellidos: 'Pica Piedra', edad: 52},
        {id: 4, nombre: 'Pablo', apellidos: 'Marmol', edad: 47},
      ];
    }
    this.modo = 'list';
  }

  public add() {
    this.elemento = {};
    this.modo = 'add';
  }
  public edit(key: any) {
    // tslint:disable-next-line:triple-equals
    const rslt = this.listado.find(item => item[this.pk] == key);
    if (rslt) {
      this.elemento = Object.assign({}, rslt);
      this.idOriginal = key;
      this.modo = 'edit';
    } else {
      this.notify.add('Elemento no encontrados.');
    }
  }
  public view(key: any) {
    // tslint:disable-next-line:triple-equals
    const rslt = this.listado.find(item => item[this.pk] == key);
    if (rslt) {
      this.elemento = Object.assign({}, rslt);
      this.modo = 'view';
    } else {
      this.notify.add('Elemento no encontrados.');
    }
  }
  public delete(key: any) {
    if (!window.confirm('¿Seguro?')) { return; }

    // tslint:disable-next-line:triple-equals
    const index = this.listado.findIndex(item => item[this.pk] == key);
    if (index !== -1) {
      this.listado.splice(index, 1);
      this.list();
    } else {
      this.notify.add('Elemento no encontrados.');
    }
  }

  public cancel() {
    this.elemento = {};
    this.idOriginal = null;
    this.list();
  }

  public send() {
    switch (this.modo) {
      case 'add':
        this.listado.push(this.elemento);
        this.cancel();
        break;
      case 'edit':
        // tslint:disable-next-line:triple-equals
        const index = this.listado.findIndex(item => item[this.pk] == this.idOriginal);
        if (index !== -1) {
          this.listado[index] = this.elemento;
          this.cancel();
        } else {
          this.notify.add('Elemento no encontrados.');
        }
        break;
      case 'view':
        this.cancel();
        break;
    }
  }
}
