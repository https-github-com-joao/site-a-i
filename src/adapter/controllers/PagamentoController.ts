import express from 'express';
import { inject } from 'inversify';
import {
  httpGet,
  httpPost,
  BaseHttpController,
  interfaces,
  controller,
  requestBody,
  queryParam,
  requestParam,
  httpPut,
  httpDelete,
  request
} from 'inversify-express-utils';

import TYPES from '../../core/types';
import { config } from '../../config';
import logger from '../../common/helpers/Logger';
import { authMiddleware } from '../../common/middlewares/AuthMiddleware';
import { validatorResult } from '../../common/middlewares/ValidatorResult';
import { validator } from '../validators/MessageConfigValidator';
import { IPagamentoService } from '../../core/services/IPagamentoService';
import { PagamentoDto } from '../../domain/dtos/PagamentoDto';
import { PaginationAdapter } from '../../common/adapters/PaginationAdapter';

@controller(`${config.apiPrefix}/pagamento`)
export class PagamentoController extends BaseHttpController implements interfaces.Controller {
  constructor(
    @inject(TYPES.IPagamentoService) private readonly pagamentoService: IPagamentoService
  ) {
    super();
  }

  @httpGet('/'/*, authMiddleware()*/)
  public async handleListar(
    @request() req: express.Request,
    @queryParam('page') page: number,
    @queryParam('per_page') per_page: number,
    @queryParam('sort') sort: string,
  ): Promise<interfaces.IHttpActionResult> {
    try {
      let filtro = {
      };

      if (per_page) {
        return this.pagamentoService
          .listarPaginando(page, per_page, sort, filtro)
          .then(response => this.json(PaginationAdapter.toVueTablePaginantion(response, req)));
      } else {
        return this.pagamentoService
          .listar()
          .then(response => this.json(response));
      }
    } catch (error) {
      logger.error('MessageHistoricoController.handleListar', { message: error.message, stack: error.stack });

      return this.json({ error: error }, 500);
    }
  }

  @httpGet('/:id'/*, authMiddleware()*/)
  public async handleObterPorId(
    @requestParam('id') id: number
  ): Promise<interfaces.IHttpActionResult> {
    try {
      return this.pagamentoService
        .obterPorId(id)
        .then(res => this.json(res));
    } catch (error) {
      logger.error('handleObterPorId', { message: error.message, stack: error.stack });

      return this.json({ error: error }, 500);
    }
  }

  @httpPost('/'/*, validator('gravar'), validatorResult, authMiddleware()*/)
  public async handleInserir(
    @requestBody() entity: PagamentoDto
  ): Promise<interfaces.IHttpActionResult> {
    try {
      return this.pagamentoService
        .inserir(entity)
        .then(res => this.json({ success: res }));
    } catch (error) {
      logger.error('handleInserir', { message: error.message, stack: error.stack });

      return this.json({ error: error }, 500);
    }
  }

  @httpPut('/:id'/*, validator('gravar'), validatorResult, authMiddleware()*/)
  public async handleAlterar(
    @requestParam('id') id: number,
    @requestBody() entity: PagamentoDto
  ): Promise<interfaces.IHttpActionResult> {
    try {
      return this.pagamentoService
        .alterar(id, entity)
        .then(res => this.json({ success: res }));
    } catch (error) {
      logger.error('handleInserir', { message: error.message, stack: error.stack });

      return this.json({ error: error }, 500);
    }
  }

  @httpDelete('/:id'/*, authMiddleware()*/)
  public async handlExcluir(
    @requestParam('id') id: number
  ): Promise<interfaces.IHttpActionResult> {
    try {
      return this.pagamentoService
        .excluir(id)
        .then(res => this.json({ success: res }));
    } catch (error) {
      logger.error('handlExcluir', { message: error.message, stack: error.stack });

      return this.json({ error: error }, 500);
    }
  }
}
