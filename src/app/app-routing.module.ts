import { NgModule } from '@angular/core';
import { Routes, RouterModule  } from '@angular/router';
import { NavComponent } from './components/nav/nav.component';
import { HomeComponent } from './components/home/home.component';
import { ProcessosListComponent } from './components/processos/processos-list/processos-list.component';
import { ProcessosCreateComponent } from './components/processos/processos-create/processos-create.component';
import { ProcessosUpdateComponent } from './components/processos/processos-update/processos-update.component';
import { ProcessosDeleteComponent } from './components/processos/processos-delete/processos-delete.component';


const routes: Routes = [
  {
    path: '', component: NavComponent, children: [
      { path: 'home', component: HomeComponent },
      { path: 'processos', component: ProcessosListComponent },
      { path: 'processos/create', component: ProcessosCreateComponent },
      { path: 'processos/update/:id', component: ProcessosUpdateComponent },
      { path: 'processos/delete/:id', component: ProcessosDeleteComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
