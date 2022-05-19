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
import { ISecaoService } from '../../core/services/ISecaoService';
import { SecaoDto } from '../../domain/dtos/SecaoDto';
import { PaginationAdapter } from '../../common/adapters/PaginationAdapter';

@controller(`${config.apiPrefix}/secao`)
export class SecaoController extends BaseHttpController implements interfaces.Controller {
  constructor(
    @inject(TYPES.ISecaoService) private readonly secaoService: ISecaoService
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
        return this.secaoService
          .listarPaginando(page, per_page, sort, filtro)
          .then(response => this.json(PaginationAdapter.toVueTablePaginantion(response, req)));
      } else {
        return this.secaoService
          .listar()
          .then(response => this.json(response));
      }
    } catch (error) {
      logger.error('MessageHistoricoController.handleListar', { message: error.message, stack: error.stack });

      return this.json({ error: error }, 500);
    }
  }

  @httpGet('/:id_filme/:id_sala'/*, authMiddleware()*/)
  public async handleObterPorId(
    @requestParam('id_filme') id_filme: number,
    @requestParam('id_sala') id_sala: number
  ): Promise<interfaces.IHttpActionResult> {
    try {
      return this.secaoService
        .obterPorId(id_filme, id_sala)
        .then(res => this.json(res));
    } catch (error) {
      logger.error('handleObterPorId', { message: error.message, stack: error.stack });

      return this.json({ error: error }, 500);
    }
  }

  @httpPost('/'/*, validator('gravar'), validatorResult, authMiddleware()*/)
  public async handleInserir(
    @requestBody() entity: SecaoDto
  ): Promise<interfaces.IHttpActionResult> {
    try {
      return this.secaoService
        .inserir(entity)
        .then(res => this.json({ success: res }));
    } catch (error) {
      logger.error('handleInserir', { message: error.message, stack: error.stack });

      return this.json({ error: error }, 500);
    }
  }

  @httpPut('/:id_filme/:id_sala'/*, validator('gravar'), validatorResult, authMiddleware()*/)
  public async handleAlterar(
    @requestParam('id_filme') id_filme: number,
    @requestParam('id_sala') id_sala: number,
    @requestBody() entity: SecaoDto
  ): Promise<interfaces.IHttpActionResult> {
    try {
      return this.secaoService
        .alterar(id_filme, id_sala, entity)
        .then(res => this.json({ success: res }));
    } catch (error) {
      logger.error('handleInserir', { message: error.message, stack: error.stack });

      return this.json({ error: error }, 500);
    }
  }

  @httpDelete('/:id_filme/:id_sala'/*, authMiddleware()*/)
  public async handlExcluir(
    @requestParam('id_filme') id_filme: number,
    @requestParam('id_sala') id_sala: number,
  ): Promise<interfaces.IHttpActionResult> {
    try {
      return this.secaoService
        .excluir(id_filme, id_sala)
        .then(res => this.json({ success: res }));
    } catch (error) {
      logger.error('handlExcluir', { message: error.message, stack: error.stack });

      return this.json({ error: error }, 500);
    }
  }
}
