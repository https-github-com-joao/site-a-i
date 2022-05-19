import { injectable } from 'inversify';
import { ISecao } from '../../domain/entities/ISecao';
import { ISecaoRepository } from '../../core/repositories/ISecaoRepository';
import { connDB, Knex } from '../database/database';
import logger from '../../common/helpers/Logger';
import { IPaginate, IResponseWithPagination } from 'src/common/interfaces/IPaginate';

@injectable()
export class SecaoRepository implements ISecaoRepository {
  private tableName = 'secao';

  public listar(): Promise<ISecao[]> {
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
      .from(`${this.tableName} as sc`)
      .leftJoin('sala as s', 's.id', 'sc.id_sala')
      .leftJoin('filme as f', 'f.id', 'sc.id_filme')
      .select(
        'sc.id_sala',
        'sc.id_filme',
        'sc.enabled',
        'sc.created_at',
        'sc.updated_at',
        'f.nome as filme_nome',
        's.descricao as sala_descricao'
      )
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

  public obterPorId(id_filme: number, id_sala: number): Promise<ISecao> {
    return connDB
      .from(`${this.tableName} as sc`)
      .leftJoin('sala as s', 's.id', 'sc.id_sala')
      .leftJoin('filme as f', 'f.id', 'sc.id_filme')
      .select(
        'sc.id_filme',
        'sc.id_sala',
        'sc.enabled',
        'sc.created_at',
        'sc.updated_at',
        'f.nome as filme_nome',
        's.descricao as sala_descricao'
      )
      .where({
        'sc.id_filme': id_filme,
        'sc.id_sala': id_sala
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

  public inserir(entity: ISecao): Promise<number> {
    return connDB(this.tableName)
      .insert(entity)
      .then((success: number[]) => success[0]);
  }

  public alterar(id_filme: number, id_sala: number, entity: ISecao): Promise<number> {
    return connDB(this.tableName)
      .update({
        id_sala: entity.id_sala,
        id_filme: entity.id_filme,
        enabled: entity.enabled,
        updated_at: new Date()
      })
      .where({
        'id_filme': id_filme,
        'id_sala': id_sala
      })
      .then((success: number) => success);
  }

  public excluir(id_filme: number, id_sala: number): Promise<number> {
    return connDB(this.tableName)
      .del()
      .where({
        'id_filme': id_filme,
        'id_sala': id_sala
      })
      .then((success: number) => success);
  }
}
