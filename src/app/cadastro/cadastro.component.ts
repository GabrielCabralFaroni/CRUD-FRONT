import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../service/usuarios.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms'

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {
  constructor(private usuariosService: UsuariosService, private router: Router, private ActivatedRoute: ActivatedRoute) { }

  userForm: FormGroup = {} as FormGroup;

  ngOnInit(): void {
    this.userForm = new FormGroup({
      nome: new FormControl('', [Validators.required, Validators.minLength(3), Validators.pattern('^[^0-9]+$')]),
      cpf: new FormControl('', [Validators.required, this.validarCPF]),
      data_nascimento: new FormControl('', [Validators.required, this.validarDataNascimento])
    })
  }
  cadastro(form?: FormGroup): void {
    console.log('My form: ', form?.value)
    if (form?.valid) {
      const { nome, cpf, data_nascimento } = form.value
      this.usuariosService.create(nome, cpf, data_nascimento).subscribe(() => {
        this.usuariosService.showMessage("Cadastro realizado");
        this.router.navigate(["/usuarios"]);
      })
    }

  }

  validarCPF(control: FormControl): { [key: string]: any } | null {
    const cpf = control.value;
    if (!cpf) {
      return null;
    }

    // Remove caracteres especiais
    const cleanedCpf = cpf.replace(/\D/g, '');

    // Verifica se o CPF possui 11 dígitos
    if (cleanedCpf.length !== 11) {
      return { 'cpfInvalido': true };
    }

    // Verifica se todos os dígitos são iguais
    if (/^(\d)\1+$/.test(cleanedCpf)) {
      return { 'cpfInvalido': true };
    }

    // Calcula o primeiro dígito verificador
    let sum = 0;
    for (let i = 0; i < 9; i++) {
      sum += parseInt(cleanedCpf.charAt(i), 10) * (10 - i);
    }
    let remainder = 11 - (sum % 11);
    if (remainder === 10 || remainder === 11) {
      remainder = 0;
    }
    if (remainder !== parseInt(cleanedCpf.charAt(9), 10)) {
      return { 'cpfInvalido': true };
    }

    // Calcula o segundo dígito verificador
    sum = 0;
    for (let i = 0; i < 10; i++) {
      sum += parseInt(cleanedCpf.charAt(i), 10) * (11 - i);
    }
    remainder = 11 - (sum % 11);
    if (remainder === 10 || remainder === 11) {
      remainder = 0;
    }
    if (remainder !== parseInt(cleanedCpf.charAt(10), 10)) {
      return { 'cpfInvalido': true };
    }

    return null;
  }

  validarDataNascimento(control: FormControl): { [key: string]: any } | null {
    const data_nascimento = new Date(control.value);
    const hoje = new Date();

    if (data_nascimento >= hoje) {
      return { 'dataInvalida': true };
    }

    return null;
  }
}
