export interface IUsuario {
  id: number;
  nome: string;
  cpf: string;
  email: string;
  senha: string;
  dt_nacimento: Date,
  created_at: Date;
  updated_at?: Date;
};
