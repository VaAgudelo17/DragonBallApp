import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo:'intro',
    pathMatch: 'full'
  },
  {
    path: '***',
    redirectTo: 'intro', 
    pathMatch: 'full'
  },
  {
    path: 'tabs', 
    redirectTo: 'intro',
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
    path: 'place-detail/:id', 
    loadChildren: () => import('./pages/place-detail/place-detail.module').then(m => m.PlaceDetailPageModule)
  },
  {
    path: 'intro',
    loadChildren: () => import('./pages/intro/intro.module').then(m => m.IntroPageModule),
  },
 
  {
    path: 'tabs',
    loadChildren: () => import('./pages/tabs/tabs.module').then(m => m.TabsPageModule)  
  },
 
 
 
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
