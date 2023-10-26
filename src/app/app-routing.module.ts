import { ListarDessertComponent } from './components/dessert/listar-dessert/listar-dessert.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DessertComponent } from './components/dessert/dessert.component';
import { CreaeditaDessertComponent } from './components/dessert/creaedita-dessert/creaedita-dessert.component';

const routes: Routes = [
  {
    path: 'postres', component: DessertComponent, children: [
      { path: 'nuevo', component: CreaeditaDessertComponent },
      { path:'listar', component: ListarDessertComponent },
      { path: 'edicion/:idDessert', component: CreaeditaDessertComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
