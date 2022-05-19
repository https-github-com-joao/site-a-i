import { inject, injectable } from 'inversify';

import TYPES from '../../core/types';
import logger from '../../common/helpers/Logger';
import { ISecaoService } from '../../core/services/ISecaoService';
import { ISecaoRepository } from '../../core/repositories/ISecaoRepository';
import { ISecao } from '../../domain/entities/ISecao';
import { SecaoDto } from '../../domain/dtos/SecaoDto';
import { IResponseWithPagination } from '../../common/interfaces/IPaginate';

@injectable()
export class SecaoService implements ISecaoService {
  constructor(
    @inject(TYPES.ISecaoRepository) private readonly secaoRepository: ISecaoRepository,
  ) {}

  public listar(): Promise<any> {
    return this.secaoRepository.listar();
  }

  public listarPaginando(
    page: number,
    per_page: number,
    sort: string,
    filtro: any
  ): Promise<IResponseWithPagination> {
    return this.secaoRepository.listarPaginando(page, per_page, sort, filtro);
  }

  public obterPorId(id_filme: number, id_sala: number): Promise<ISecao> {
    return this.secaoRepository.obterPorId(id_filme, id_sala);
  }

  public inserir(entity: SecaoDto): Promise<number> {
    let data = entity as ISecao;
    data.created_at = new Date();

    return this.secaoRepository.inserir(data);
  }

  public alterar(id_filme: number, id_sala: number, entity: SecaoDto): Promise<number> {
    let data = entity as ISecao;

    return this.secaoRepository.alterar(id_filme, id_sala, data);
  }

  public excluir(id_filme: number, id_sala: number): Promise<number> {
    return this.secaoRepository.excluir(id_filme, id_sala);
  }
}
