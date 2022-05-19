import { inject, injectable } from 'inversify';

import TYPES from '../../core/types';
import logger from '../../common/helpers/Logger';
import { IFilmeService } from '../../core/services/IFilmeService';
import { IFilmeRepository } from '../../core/repositories/IFilmeRepository';
import { IFilme } from '../../domain/entities/IFilme';
import { FilmeDto } from '../../domain/dtos/FilmeDto';
import { IResponseWithPagination } from '../../common/interfaces/IPaginate';

@injectable()
export class FilmeService implements IFilmeService {
  constructor(
    @inject(TYPES.IFilmeRepository) private readonly filmeRepository: IFilmeRepository,
  ) {}

  public listar(): Promise<any> {
    return this.filmeRepository.listar();
  }

  public listarPaginando(
    page: number,
    per_page: number,
    sort: string,
    filtro: any
  ): Promise<IResponseWithPagination> {
    return this.filmeRepository.listarPaginando(page, per_page, sort, filtro);
  }

  public obterPorId(id: number): Promise<IFilme> {
    return this.filmeRepository.obterPorId(id);
  }

  public inserir(entity: FilmeDto): Promise<number> {
    let data = entity as IFilme;
    data.created_at = new Date();

    return this.filmeRepository.inserir(data);
  }

  public alterar(id: number, entity: FilmeDto): Promise<number> {
    let data = entity as IFilme;

    return this.filmeRepository.alterar(id, data);
  }

  public excluir(id: number): Promise<number> {
    return this.filmeRepository.excluir(id);
  }
}
