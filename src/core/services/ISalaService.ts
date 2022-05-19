import { IResponseWithPagination } from '../../common/interfaces/IPaginate';
import { SalaDto } from '../../domain/dtos/SalaDto';
import { ISala } from '../../domain/entities/ISala';

export interface ISalaService {
  listar(): Promise<ISala[]>;
   listarPaginando(
    page: number,
    per_page: number,
    sort: string,
    filtro: any
  ): Promise<IResponseWithPagination>;
  obterPorId(id: number): Promise<ISala>;
  inserir(entity: SalaDto): Promise<number>;
  alterar(id: number, entity: SalaDto): Promise<number>;
  excluir(id: number): Promise<number>;
}
