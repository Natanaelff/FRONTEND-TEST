import { Publicacao } from './public';

export class Livro extends Publicacao {
  constructor(
    titulo: string,
    autor: string,
    anoPublicacao: number,
    public readonly ISBN: string
  ) {
    super(titulo, autor, anoPublicacao);
  }

  descricao(): string {
    return `${super.descricao()}, ISBN: ${this.ISBN}`;
  }
}
