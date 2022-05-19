import { IResponseWithPagination } from '../../common/interfaces/IPaginate';
import { SecaoDto } from '../../domain/dtos/SecaoDto';
import { ISecao } from '../../domain/entities/ISecao';

export interface ISecaoService {
  listar(): Promise<ISecao[]>;
   listarPaginando(
    page: number,
    per_page: number,
    sort: string,
    filtro: any
  ): Promise<IResponseWithPagination>;
  obterPorId(id_filme: number, id_sala: number): Promise<ISecao>;
  inserir(entity: SecaoDto): Promise<number>;
  alterar(id_filme: number, id_sala: number, entity: SecaoDto): Promise<number>;
  excluir(id_filme: number, id_sala: number): Promise<number>;
}
