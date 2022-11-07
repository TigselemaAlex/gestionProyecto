import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPageComponent } from './page/main-page/main-page.component';

const routes: Routes = [
  {
    path: '',
    component: MainPageComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('../clientes/clientes.module').then((m) => m.ClientesModule),
      },
      {
        path: 'clientes',
        loadChildren: () =>
          import('../clientes/clientes.module').then((m) => m.ClientesModule),
      },
      {
        path: 'habitaciones',
        loadChildren: () =>
          import('../habitaciones/habitaciones.module').then(
            (m) => m.HabitacionesModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainRoutingModule {}
