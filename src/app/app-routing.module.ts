import { NgModule } from '@angular/core';
/* import { CommonModule } from '@angular/common';
 */ import { RouterModule, Routes } from '@angular/router';
//import { HomeComponent } from './welcome/home/home.component';
import { FormEditComponent } from './form-edit/components/form-edit.component';
//Para crear un modulo dentro de app y crear ahi una carpeta usamos
// ng g m nombre
//para crearlo en la carpeta principal osea app
// ng g m nombre --flat
//para crear un modulo dentro de una carpeta ya existent y crear rutas
//ng g m nombre --routing
//para crear un componente dentro de una carpeta
//ng g c carpeta/nombre
const routes: Routes = [
  //usando carga perezosa o lazy load
  {
    //definimos la ruta
    path: 'table',
    //cargamos la  ruta como una funcion vacia cuando lleguue a esa ruta
    loadChildren: () =>
      //importamos el lmodulo que contiene el contenido del componente y la ruta en cuestion
      import('./table-data/table-data.module').then(
        //al obtenerlo vamos a incluirlo al modulo principal osea este para cargarlo
        (moduloPrincipal) => moduloPrincipal.TableDataModule
      ),
  },
  {
    //form
    path: 'form',
    loadChildren: () =>
      import('./form/form.module').then(
        (moduloPrincipal) => moduloPrincipal.FormModule
      ),
  },
  {
    //home
    path: '',
    loadChildren: () =>
      import('./home/home.module').then(
        (moduloPrincipal) => moduloPrincipal.HomeModule
      ),
  },
  {
    //edit form
    path: 'edit/:id', component:FormEditComponent
    /* loadChildren: () =>
    import('./form-edit/form-edit.module').then(
      (moduloPrincipal) => moduloPrincipal.FormEditModule
    ),  */
  },
];

@NgModule({
  declarations: [],
  imports: [
    /* lo quitamos pq sirve para usuar logica
     CommonModule,
 */ //aqui le decimos que use routes para definir las rutas
    RouterModule.forRoot(routes),
  ],
  //aqui colocamos lo que queramos exportar
  exports: [RouterModule],
})
export class AppRoutingModule {}
