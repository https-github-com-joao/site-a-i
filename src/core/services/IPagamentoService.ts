import { IResponseWithPagination } from '../../common/interfaces/IPaginate';
import { PagamentoDto } from '../../domain/dtos/PagamentoDto';
import { IPagamento } from '../../domain/entities/IPagamento';

export interface IPagamentoService {
  listar(): Promise<IPagamento[]>;
   listarPaginando(
    page: number,
    per_page: number,
    sort: string,
    filtro: any
  ): Promise<IResponseWithPagination>;
  obterPorId(id: number): Promise<IPagamento>;
  inserir(entity: PagamentoDto): Promise<number>;
  alterar(id: number, entity: PagamentoDto): Promise<number>;
  excluir(id: number): Promise<number>;
}
