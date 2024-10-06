import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VillainsPageRoutingModule } from './villains-routing.module';

import { VillainsPage } from './villains.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VillainsPageRoutingModule
  ],
  declarations: [VillainsPage]
})
export class VillainsPageModule {}
