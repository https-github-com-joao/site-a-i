import { IResponseWithPagination } from '../../common/interfaces/IPaginate';
import { IPagamento } from '../../domain/entities/IPagamento';

export interface IPagamentoRepository {
  listar(): Promise<IPagamento[]>;
  listarPaginando(
    page: number,
    per_page: number,
    sort: string,
    filtro: any
  ): Promise<IResponseWithPagination>;
  obterPorId(id: number): Promise<IPagamento>;
  inserir(entity: IPagamento): Promise<number>;
  alterar(id: number, entity: IPagamento): Promise<number>;
  excluir(id: number): Promise<number>;
}
