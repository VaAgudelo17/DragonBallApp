import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo:'intro',
    pathMatch: 'full'
  },

  {
    path: 'character-detail/:id', 
    loadChildren: () => import('./pages/character-detail/character-detail.module').then(m => m.CharacterDetailPageModule)
  },
  {
    path: '',
    loadChildren: () => import('./pages/intro/intro.module').then( m => m.IntroPageModule),
  },
  {
    path: 'tab1',
    loadChildren: () => import('./pages/tab1/tab1.module').then( m => m.Tab1PageModule)
  },
  {
    path: 'tab2',
    loadChildren: () => import('./pages/tab2/tab2.module').then( m => m.Tab2PageModule)
  },
  {
    path: 'place-detail/:id', 
    loadChildren: () => import('./pages/place-detail/place-detail.module').then(m => m.PlaceDetailPageModule)
  },
 
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
