import { IResponseWithPagination } from '../../common/interfaces/IPaginate';
import { UsuarioDto } from '../../domain/dtos/UsuarioDto';
import { IUsuario } from '../../domain/entities/IUsuario';

export interface IUsuarioService {
  listar(): Promise<IUsuario[]>;
   listarPaginando(
    page: number,
    per_page: number,
    sort: string,
    filtro: any
  ): Promise<IResponseWithPagination>;
  obterPorId(id: number): Promise<IUsuario>;
  inserir(entity: UsuarioDto): Promise<number>;
  alterar(id: number, entity: UsuarioDto): Promise<number>;
  excluir(id: number): Promise<number>;
}
