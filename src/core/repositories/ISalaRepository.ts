import { IResponseWithPagination } from '../../common/interfaces/IPaginate';
import { ISala } from '../../domain/entities/ISala';

export interface ISalaRepository {
  listar(): Promise<ISala[]>;
  listarPaginando(
    page: number,
    per_page: number,
    sort: string,
    filtro: any
  ): Promise<IResponseWithPagination>;
  obterPorId(id: number): Promise<ISala>;
  inserir(entity: ISala): Promise<number>;
  alterar(id: number, entity: ISala): Promise<number>;
  excluir(id: number): Promise<number>;
}
