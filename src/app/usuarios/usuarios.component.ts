import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../service/usuarios.service';
import { Usuario } from '../models/usuarios';
import { ActivatedRoute, Router } from '@angular/router';




@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {
  constructor(private usuariosService: UsuariosService, private router: Router, private route: ActivatedRoute) { }
  DadosDaApi: Usuario[] = [];
  // [] valor incial da atribuição da variável é um array vazio, se eu tirar o valor inicial é undefined, o Usuario[] é o tipo
  // se colocarmos :Usuario[] | number = 'brunin' daria errado pois espera number ou array(igual de model) e n string.
  ngOnInit(): void {

    this.usuariosService.get_users().subscribe((dados: Usuario[]) => {

      this.DadosDaApi = dados;
    })
  }
  excluir(id: number) {
    this.usuariosService.excluirDado(id).subscribe(
      () => {
        this.usuariosService.showMessage("Excluído com sucesso, Atualize a página!");
        this.router.navigate(["/usuarios"]);
      }
    );
  }
}
// usuario