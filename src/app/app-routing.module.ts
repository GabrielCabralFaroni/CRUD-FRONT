import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { UsuarioUpdateComponent } from './usuario-update/usuario-update.component';
import { CadastroComponent } from './cadastro/cadastro.component';

const routes: Routes = [
  //path: caminho, ex: http://localhost:4200/detalhar, colocar só o /detalhar

  { path: 'usuarios', component: UsuariosComponent },

  { path: 'usuarios/update/:id', component: UsuarioUpdateComponent },
  { path: 'usuarios/cadastro', component: CadastroComponent }

];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }




