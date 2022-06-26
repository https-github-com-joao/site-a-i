import { inject, injectable } from 'inversify';

import TYPES from '../../core/types';
import logger from '../../common/helpers/Logger';
import { IUsuarioService } from '../../core/services/IUsuarioService';
import { IUsuarioRepository } from '../../core/repositories/IUsuarioRepository';
import { IUsuario } from '../../domain/entities/IUsuario';
import { UsuarioDto } from '../../domain/dtos/UsuarioDto';
import { IResponseWithPagination } from '../../common/interfaces/IPaginate';

@injectable()
export class UsuarioService implements IUsuarioService {
  constructor(
    @inject(TYPES.IUsuarioRepository) private readonly usuarioRepository: IUsuarioRepository,
  ) {}

  public listar(): Promise<any> {
    return this.usuarioRepository.listar();
  }

  public listarPaginando(
    page: number,
    per_page: number,
    sort: string,
    filtro: any
  ): Promise<IResponseWithPagination> {
    return this.usuarioRepository.listarPaginando(page, per_page, sort, filtro);
  }

  public obterPorId(id: number): Promise<IUsuario> {
    return this.usuarioRepository.obterPorId(id);
  }

  public inserir(entity: UsuarioDto): Promise<number> {
    let data = entity as IUsuario;
    data.created_at = new Date();
    data.cpf = data.cpf.replace(/\D/g, '');

    return this.usuarioRepository.inserir(data);
  }

  public alterar(id: number, entity: UsuarioDto): Promise<number> {
    let data = entity as IUsuario;

    return this.usuarioRepository.alterar(id, data);
  }

  public excluir(id: number): Promise<number> {
    return this.usuarioRepository.excluir(id);
  }

  public login(email: string): Promise<UsuarioDto>{
    return this.usuarioRepository.getByUsername(email)
  }
}
