import { inject, injectable } from 'inversify';

import TYPES from '../../core/types';
import logger from '../../common/helpers/Logger';
import { ISalaService } from '../../core/services/ISalaService';
import { ISalaRepository } from '../../core/repositories/ISalaRepository';
import { ISala } from '../../domain/entities/ISala';
import { SalaDto } from '../../domain/dtos/SalaDto';
import { IResponseWithPagination } from '../../common/interfaces/IPaginate';

@injectable()
export class SalaService implements ISalaService {
  constructor(
    @inject(TYPES.ISalaRepository) private readonly salaRepository: ISalaRepository,
  ) {}

  public listar(): Promise<any> {
    return this.salaRepository.listar();
  }

  public listarPaginando(
    page: number,
    per_page: number,
    sort: string,
    filtro: any
  ): Promise<IResponseWithPagination> {
    return this.salaRepository.listarPaginando(page, per_page, sort, filtro);
  }

  public obterPorId(id: number): Promise<ISala> {
    return this.salaRepository.obterPorId(id);
  }

  public inserir(entity: SalaDto): Promise<number> {
    let data = entity as ISala;
    data.created_at = new Date();

    return this.salaRepository.inserir(data);
  }

  public alterar(id: number, entity: SalaDto): Promise<number> {
    let data = entity as ISala;

    return this.salaRepository.alterar(id, data);
  }

  public excluir(id: number): Promise<number> {
    return this.salaRepository.excluir(id);
  }
}
