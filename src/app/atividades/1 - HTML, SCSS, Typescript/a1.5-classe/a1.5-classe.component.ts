import { Component, OnInit } from '@angular/core';
import { Livro } from 'src/models/book';
import { Periodico } from 'src/models/periodical';

@Component({
  selector: 'app-a1.5-classe',
  templateUrl: './a1.5-classe.component.html',
  styleUrls: ['./a1.5-classe.component.scss']
})
export class A15ClasseComponent implements OnInit {

  livro: Livro = new Livro('', '', 0, '');
  periodico: Periodico = new Periodico('', '', 0, '');

  constructor() { }

  ngOnInit(): void {
    this.livro = new Livro('O Senhor dos Anéis', 'J.R.R. Tolkien', 1954, '978-3-16-148410-0');
    this.periodico = new Periodico('Nature', 'Vários', 2024, '0028-0836');
  }
}
