export interface IFilme {
  id: number;
  nome: string;
  sinopse: string;
  classificacao: string;
  dt_estreia: Date;
  created_at: Date;
  updated_at?: Date;
};
