import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from 'src/app/models/usuarios';
import { MatSnackBar } from '@angular/material/snack-bar';


@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  base_url = 'http://localhost/crud'

  constructor(private requisicaoApi: HttpClient, private snackBar: MatSnackBar) { }
  DadosDaApi: Usuario[] = [];

  create(nome: string, cpf: string, data_nascimento: string): Observable<Usuario[]> {
    const url = `${this.base_url}/cadastro.php`;

    return this.requisicaoApi.post<Usuario[]>(url, { nome, cpf, data_nascimento });
  }

  get_users(): Observable<Usuario[]> {
    const url = `${this.base_url}/listagem.php/`;
    return this.requisicaoApi.get<Usuario[]>(url);
  }

  get_user(id: number): Observable<Usuario> {
    const url = `${this.base_url}/usuarioporid.php?id=${id}`;
    return this.requisicaoApi.get<Usuario>(url);

  }

  excluirDado(id: number): Observable<Usuario[]> {
    const url = `${this.base_url}/excluir.php?id=${id}`;
    return this.requisicaoApi.delete<Usuario[]>(url);

  }

  update(id: number, novosDados: Omit<Usuario, 'id'>): Observable<Usuario> {
    const url = `${this.base_url}/editar.php?id=${id}`;
    return this.requisicaoApi.put<Usuario>(url, novosDados);

  }

  showMessage(msg: string): void {
    this.snackBar.open(msg, '', {
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "top",
    })

  }

  validation(cpf: string): Observable<Usuario[]> {
    const url = `${this.base_url}/cadastro.php`;
    return this.requisicaoApi.post<Usuario[]>(url, { cpf });
  }
};












