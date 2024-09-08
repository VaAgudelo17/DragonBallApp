import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';

import { PersonajeComponent } from './personaje/personaje.component';
import { PersonajesComponent } from './personajes/personajes.component';

@NgModule({
  declarations: [
    PersonajeComponent,
    PersonajesComponent,
  ],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [
    PersonajeComponent,
    PersonajesComponent
  ]
})
export class ComponentsModule { }