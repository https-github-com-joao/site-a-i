import { IResponseWithPagination } from '../../common/interfaces/IPaginate';
import { ISecao } from '../../domain/entities/ISecao';

export interface ISecaoRepository {
  listar(): Promise<ISecao[]>;
  listarPaginando(
    page: number,
    per_page: number,
    sort: string,
    filtro: any
  ): Promise<IResponseWithPagination>;
  obterPorId(id_filme: number, id_sala: number): Promise<ISecao>;
  inserir(entity: ISecao): Promise<number>;
  alterar(id_filme: number, id_sala: number, entity: ISecao): Promise<number>;
  excluir(id_filme: number, id_sala: number): Promise<number>;
}
