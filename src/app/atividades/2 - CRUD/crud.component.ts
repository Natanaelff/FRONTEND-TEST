import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { FormularioComponent } from './formulario/formulario.component';

@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.scss']
})
export class CrudComponent implements OnInit {
  private unsubscribe$ = new Subject<void>();

  filtro = new FormControl('');
  displayedColumns: string[] = ['actions', 'nome', 'email', 'senha', 'cep', 'logradouro'];
  dataSource: Pessoa[] = [
    { nome: "Teste1", email: "teste@email1.com", senha: "1234", cep: "80250104", logradouro: "Rua teste" }
  ];
  filteredDataSource: Pessoa[] = [...this.dataSource];

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
    this.filtro.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      takeUntil(this.unsubscribe$)
    ).subscribe(valor => this.filtrar(valor));
  }

  filtrar(valor: string) {
    console.log("filtrando...", valor); //não remover essa linha
    if (!valor) {
      this.filteredDataSource = [...this.dataSource];
    } else {
      this.filteredDataSource = this.dataSource.filter(pessoa =>
        pessoa.nome.toLowerCase().includes(valor.toLowerCase()) ||
        pessoa.email.toLowerCase().includes(valor.toLowerCase()) ||
        pessoa.senha.toLowerCase().includes(valor.toLowerCase()) ||
        pessoa.cep.toLowerCase().includes(valor.toLowerCase()) ||
        pessoa.logradouro.toLowerCase().includes(valor.toLowerCase())
      );
    }
  }

  adicionar() {
    const dialogRef = this.dialog.open(FormularioComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.dataSource.push(result);
        this.filteredDataSource = [...this.dataSource];
      }
    });
  }

  editar(pessoa: Pessoa) {
    const dialogRef = this.dialog.open(FormularioComponent, {
      data: pessoa
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const index = this.dataSource.findIndex(p => p.email === result.email);
        if (index > -1) {
          this.dataSource[index] = result;
          this.filteredDataSource = [...this.dataSource];
        }
      }
    });
  }

  remover(pessoa: Pessoa) {
    if (confirm(`Deseja remover a pessoa ${pessoa.nome}?`)) {
      this.dataSource = this.dataSource.filter(p => p.email !== pessoa.email);
      this.filteredDataSource = [...this.dataSource];
      alert("Removido com sucesso!");
    }
  }
}

class Pessoa {
  constructor(public nome: string, public email: string, public senha: string, public cep: string, public logradouro: string) { }
}
