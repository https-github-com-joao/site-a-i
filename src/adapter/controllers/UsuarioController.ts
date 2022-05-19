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
import { IUsuarioService } from '../../core/services/IUsuarioService';
import { UsuarioDto } from '../../domain/dtos/UsuarioDto';
import { PaginationAdapter } from '../../common/adapters/PaginationAdapter';

@controller(`${config.apiPrefix}/usuario`)
export class UsuarioController extends BaseHttpController implements interfaces.Controller {
  constructor(
    @inject(TYPES.IUsuarioService) private readonly usuarioService: IUsuarioService
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
        return this.usuarioService
          .listarPaginando(page, per_page, sort, filtro)
          .then(response => this.json(PaginationAdapter.toVueTablePaginantion(response, req)));
      } else {
        return this.usuarioService
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
      return this.usuarioService
        .obterPorId(id)
        .then(res => this.json(res));
    } catch (error) {
      logger.error('handleObterPorId', { message: error.message, stack: error.stack });

      return this.json({ error: error }, 500);
    }
  }

  @httpPost('/'/*, validator('gravar'), validatorResult, authMiddleware()*/)
  public async handleInserir(
    @requestBody() entity: UsuarioDto
  ): Promise<interfaces.IHttpActionResult> {
    try {
      return this.usuarioService
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
    @requestBody() entity: UsuarioDto
  ): Promise<interfaces.IHttpActionResult> {
    try {
      return this.usuarioService
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
      return this.usuarioService
        .excluir(id)
        .then(res => this.json({ success: res }));
    } catch (error) {
      logger.error('handlExcluir', { message: error.message, stack: error.stack });

      return this.json({ error: error }, 500);
    }
  }
}
