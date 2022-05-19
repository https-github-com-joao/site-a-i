export interface ISecao {
  id_filme: number;
  id_sala: number;
  enabled: boolean
  created_at?: Date;
  updated_at?: Date;
  filme_nome?: string;
  sala_descricao?: string
};
