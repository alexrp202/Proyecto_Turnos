import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: '',
        redirectTo: '/tabs/inicio', pathMatch: 'full'        
      },
      {
        path: 'inicio',
            loadChildren: () => import('../inicio/inicio.module').then(m => m.InicioPageModule)       
      },
      {
        path: 'reservas',
            loadChildren: () => import('../reservas/reservas.module').then(m => m.ReservasPageModule)       
      },
      {
        path: 'comprar',
            loadChildren: () => import('../comprar/comprar.module').then(m => m.ComprarPageModule)       
      },
      {
        path: 'profile',
            loadChildren: () => import('../profile/profile.module').then(m => m.ProfilePageModule)       
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
