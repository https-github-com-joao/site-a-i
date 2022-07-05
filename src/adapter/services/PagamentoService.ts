import { inject, injectable } from 'inversify';

import TYPES from '../../core/types';
import logger from '../../common/helpers/Logger';
import { IPagamentoService } from '../../core/services/IPagamentoService';
import { IPagamentoRepository } from '../../core/repositories/IPagamentoRepository';
import { IPagamento } from '../../domain/entities/IPagamento';
import { PagamentoDto } from '../../domain/dtos/PagamentoDto';
import { IResponseWithPagination } from '../../common/interfaces/IPaginate';

@injectable()
export class PagamentoService implements IPagamentoService {
  constructor(
    @inject(TYPES.IPagamentoRepository) private readonly pagamentoRepository: IPagamentoRepository,
  ) {}

  public listar(): Promise<any> {
    return this.pagamentoRepository.listar();
  }

  public listarPaginando(
    page: number,
    per_page: number,
    sort: string,
    filtro: any
  ): Promise<IResponseWithPagination> {
    return this.pagamentoRepository.listarPaginando(page, per_page, sort, filtro);
  }

  public obterPorId(id: number): Promise<IPagamento> {
    return this.pagamentoRepository.obterPorId(id);
  }

  public inserir(entity: PagamentoDto): Promise<number> {
    let data = entity as IPagamento;
    data.created_at = new Date();
    data.cpf = data.cpf.replace(/\D/g, '');

    return this.pagamentoRepository.inserir(data);
  }

  public alterar(id: number, entity: PagamentoDto): Promise<number> {
    let data = entity as IPagamento;

    return this.pagamentoRepository.alterar(id, data);
  }

  public excluir(id: number): Promise<number> {
    return this.pagamentoRepository.excluir(id);
  }
}
