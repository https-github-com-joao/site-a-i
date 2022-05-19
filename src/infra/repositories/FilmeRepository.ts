import { injectable } from 'inversify';
import { IFilme } from '../../domain/entities/IFilme';
import { IFilmeRepository } from '../../core/repositories/IFilmeRepository';
import { connDB, Knex } from '../database/database';
import logger from '../../common/helpers/Logger';
import { IPaginate, IResponseWithPagination } from 'src/common/interfaces/IPaginate';

@injectable()
export class FilmeRepository implements IFilmeRepository {
  private tableName = 'filme';

  public listar(): Promise<IFilme[]> {
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

  public obterPorId(id: number): Promise<IFilme> {
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

  public inserir(entity: IFilme): Promise<number> {
    return connDB(this.tableName)
      .insert(entity)
      .then((success: number[]) => success[0]);
  }

  public alterar(id: number, entity: IFilme): Promise<number> {
    return connDB(this.tableName)
      .update({
        nome: entity.nome,
        sinopse: entity.sinopse,
        classificacao: entity.classificacao,
        dt_estreia: entity.dt_estreia,
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
