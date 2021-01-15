import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'ways-to-achieve-of-micro-frontends-architecture',
    loadChildren: () => import('../../src/app/components/achieve-mfe/achieve.mfe.module')
      .then((_resp) => _resp.AchieveMFE)
      .catch((_error)=>console.log(_error))
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    useHash: false,
    initialNavigation: 'enabled'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
