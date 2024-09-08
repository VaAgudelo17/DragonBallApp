import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ExploreContainerComponentModule } from '../../explore-container/explore-container.module';
import { Tab2Page } from './tab2.page';
import { RouterModule } from '@angular/router';

import { Tab2PageRoutingModule } from './tab2-routing.module';
import { LugaresComponent } from 'src/app/components/lugares/lugares.component';


@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    Tab2PageRoutingModule,
    RouterModule.forChild([
      {
        path: 'lugares',
        component: LugaresComponent
      }
    ])

    ],
  declarations: []
})
export class Tab2PageModule {}
