import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfiguracionComponent } from '../../Configuracio/configuracion/configuracion.component';
import { Routes, RouterModule } from '@angular/router';
const routes: Routes = [
  { path: '', pathMatch: 'full', component: ConfiguracionComponent},
];

@NgModule({
  declarations: [ConfiguracionComponent],
  imports: [
    CommonModule, RouterModule.forChild(routes),
  ]
})
export class ConfiguracionModule { }
