import { IResponseWithPagination } from '../../common/interfaces/IPaginate';
import { IFilme } from '../../domain/entities/IFilme';

export interface IFilmeRepository {
  listar(): Promise<IFilme[]>;
  listarPaginando(
    page: number,
    per_page: number,
    sort: string,
    filtro: any
  ): Promise<IResponseWithPagination>;
  obterPorId(id: number): Promise<IFilme>;
  inserir(entity: IFilme): Promise<number>;
  alterar(id: number, entity: IFilme): Promise<number>;
  excluir(id: number): Promise<number>;
}
