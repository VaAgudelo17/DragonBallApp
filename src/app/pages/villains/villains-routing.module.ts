import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VillainsPage } from './villains.page';

const routes: Routes = [
  {
    path: '',
    component: VillainsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VillainsPageRoutingModule {}
