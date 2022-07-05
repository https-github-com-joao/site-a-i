export interface IPagamento {
  id: number;
  nome_cartao: string;
  num_cartao: string;
  cpf: string;
  validade: string;
  cvc: string;
  created_at: Date;
  updated_at?: Date;
};
