import { IResponseWithPagination } from '../../common/interfaces/IPaginate';
import { IUsuario } from '../../domain/entities/IUsuario';

export interface IUsuarioRepository {
  listar(): Promise<IUsuario[]>;
  listarPaginando(
    page: number,
    per_page: number,
    sort: string,
    filtro: any
  ): Promise<IResponseWithPagination>;
  obterPorId(id: number): Promise<IUsuario>;
  inserir(entity: IUsuario): Promise<number>;
  alterar(id: number, entity: IUsuario): Promise<number>;
  excluir(id: number): Promise<number>;
  getByUsername(email: string): Promise<IUsuario>
}
