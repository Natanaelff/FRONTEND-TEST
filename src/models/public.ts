export class Publicacao {
  constructor(
    public readonly titulo: string,
    public readonly autor: string,
    public readonly anoPublicacao: number
  ) {}

  descricao(): string {
    return `Título: ${this.titulo}, Autor: ${this.autor}, Ano de Publicação: ${this.anoPublicacao}`;
  }
}
