import { IResponseWithPagination } from '../../common/interfaces/IPaginate';
import { FilmeDto } from '../../domain/dtos/FilmeDto';
import { IFilme } from '../../domain/entities/IFilme';

export interface IFilmeService {
  listar(): Promise<IFilme[]>;
   listarPaginando(
    page: number,
    per_page: number,
    sort: string,
    filtro: any
  ): Promise<IResponseWithPagination>;
  obterPorId(id: number): Promise<IFilme>;
  inserir(entity: FilmeDto): Promise<number>;
  alterar(id: number, entity: FilmeDto): Promise<number>;
  excluir(id: number): Promise<number>;
}
