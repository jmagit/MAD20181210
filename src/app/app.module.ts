import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
import localeEsExtra from '@angular/common/locales/extra/es';
registerLocaleData(localeEs, 'es', localeEsExtra);

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { IndraCoreModule, LoggerService, ERROR_LEVEL } from 'src/indra-core';
import { ClientesModule } from './clientes/clientes.module';
import { ProveedoresModule } from './proveedores/proveedores.module';
import { CommonAppModule } from './common-app/common-app.module';
import { environment } from 'src/environments/environment';
import { HomeComponent } from './home/home.component';
import { DemosComponent } from './demos/demos.component';
import { NotificationComponent } from './notification/notification.component';
import { DinamicoComponent } from './dinamico/dinamico.component';
import { CalculadoraComponent } from './calculadora/calculadora.component';
import { PERSONAS_COMPONENT } from './personas/personas.component';
import { from } from 'rxjs';
import { PersonasViewModelService, PersonasViewModelDAOService } from './personas/personas.service';
import { AuthInterceptor } from './seguridad/seguridad.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DemosComponent,
    NotificationComponent,
    DinamicoComponent,
    CalculadoraComponent,
    PERSONAS_COMPONENT
  ],
  imports: [
    BrowserModule, FormsModule, HttpClientModule,
    IndraCoreModule, ClientesModule, ProveedoresModule, CommonAppModule,
    AppRoutingModule
  ],
  providers: [
    LoggerService,
    { provide: ERROR_LEVEL, useValue: environment.ERROR_LEVEL },
    { provide: PersonasViewModelService, useClass: PersonasViewModelDAOService },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true, },

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
