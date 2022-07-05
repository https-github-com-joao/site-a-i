import { injectable } from 'inversify';
import { IPagamento } from '../../domain/entities/IPagamento';
import { IPagamentoRepository } from '../../core/repositories/IPagamentoRepository';
import { connDB, Knex } from '../database/database';
import logger from '../../common/helpers/Logger';
import { IPaginate, IResponseWithPagination } from 'src/common/interfaces/IPaginate';

@injectable()
export class PagamentoRepository implements IPagamentoRepository {
  private tableName = 'pagamento';

  public listar(): Promise<IPagamento[]> {
    return connDB
      .from(this.tableName)
      .select()
      .then((rows: any) => rows)
      .catch((err: any) => {
        logger.error(err.message, err);

        return Promise.reject({
          ...err,
          message: `Erro ao consultar ${this.tableName}`
        });
      });
  }

  public listarPaginando(
    page: number,
    per_page: number,
    sort: string,
    filtro: any
  ): Promise<IResponseWithPagination> {
    let paginate: IPaginate = {
      currentPage: page,
      perPage: per_page,
      isLengthAware: true
    };

    let order = [];
    if (sort) {
      let sortArray = sort.split('|');
      order.push({ column: sortArray[0], order: sortArray[1] || 'asc' });
    }

    return connDB
      .from(this.tableName)
      .select()
      .where((builder: Knex.QueryBuilder): void => {
        // if (filtro.end_uf) builder.where('motorista.end_uf', filtro.end_uf);
        // if (filtro.idc_status) builder.where('h.idc_status', filtro.idc_status);
        // if (filtro.idc_origem) builder.where('h.idc_origem', filtro.idc_origem);
        // if (filtro.cd_status_motorista) builder.where('h.cd_status_motorista', filtro.cd_status_motorista);
        // if (filtro.cd_motorista) builder.where('h.cd_motorista', filtro.cd_motorista);

      })
      .orderBy(order)
      .paginate(paginate)
      .then((rows: any) => rows)
      .catch((err: any) => {
        logger.error(err.message, err);

        return Promise.reject({
          ...err,
          message: `Erro ao consultar ${this.tableName}`
        });
      });
  }

  public obterPorId(id: number): Promise<IPagamento> {
    return connDB
    .from(this.tableName)
    .select()
      .where({
        'id': id
      })
      .then((rows: any) => rows ? rows[0] : null)
      .catch((err: any) => {
        logger.error(err.message, err);

        return Promise.reject({
          ...err,
          message: `Erro ao consultar ${this.tableName}`
        });
      });
  }

  public inserir(entity: IPagamento): Promise<number> {
    return connDB(this.tableName)
      .insert(entity)
      .then((success: number[]) => success[0]);
  }

  public alterar(id: number, entity: IPagamento): Promise<number> {
    return connDB(this.tableName)
      .update({
        id: entity.id,
        nome_cartao: entity.nome_cartao,
        num_cartao: entity.num_cartao,
        cpf: entity.cpf,
        validade: entity.validade,
        cvc: entity.cvc,
        updated_at: new Date()
      })
      .where({
        'id': id
      })
      .then((success: number) => success);
  }

  public excluir(id: number): Promise<number> {
    return connDB(this.tableName)
      .del()
      .where({
        'id': id
      })
      .then((success: number) => success);
  }
}
