import { Publicacao } from './public';

export class Periodico extends Publicacao {
  constructor(
    titulo: string,
    autor: string,
    anoPublicacao: number,
    public readonly ISSN: string
  ) {
    super(titulo, autor, anoPublicacao);
  }

  descricao(): string {
    return `${super.descricao()}, ISSN: ${this.ISSN}`;
  }
}
