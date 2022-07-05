import { Container } from 'inversify';

import TYPES from './types';
import { HttpClient } from '../common/protocols/http/httpClient';
import { AxiosHttpClient } from '../infra/http/axios';
import { IFilmeRepository } from './repositories/IFilmeRepository';
import { FilmeRepository } from '../infra/repositories/FilmeRepository';
import { IFilmeService } from './services/IFilmeService';
import { FilmeService } from '../adapter/services/FilmeService';
import { ISalaRepository } from './repositories/ISalaRepository';
import { SalaRepository } from '../infra/repositories/SalaRepository';
import { ISalaService } from './services/ISalaService';
import { SalaService } from '../adapter/services/SalaService';
import { ISecaoRepository } from './repositories/ISecaoRepository';
import { SecaoRepository } from '../infra/repositories/SecaoRepository';
import { ISecaoService } from './services/ISecaoService';
import { SecaoService } from '../adapter/services/SecaoService';
import { IUsuarioRepository } from './repositories/IUsuarioRepository';
import { UsuarioRepository } from '../infra/repositories/UsuarioRepository';
import { IUsuarioService } from './services/IUsuarioService';
import { UsuarioService } from '../adapter/services/UsuarioService';
import { IPagamentoRepository } from './repositories/IPagamentoRepository';
import { PagamentoRepository } from '../infra/repositories/PagamentoRepository';
import { IPagamentoService } from './services/IPagamentoService';
import { PagamentoService } from '../adapter/services/PagamentoService';

export const initContainer = () => {
  const container = new Container();

  container.bind<HttpClient>(TYPES.HttpClient).to(AxiosHttpClient).inSingletonScope();

  container.bind<IFilmeRepository>(TYPES.IFilmeRepository).to(FilmeRepository).inRequestScope();
  container.bind<IFilmeService>(TYPES.IFilmeService).to(FilmeService).inRequestScope();
  container.bind<ISalaRepository>(TYPES.ISalaRepository).to(SalaRepository).inRequestScope();
  container.bind<ISalaService>(TYPES.ISalaService).to(SalaService).inRequestScope();
  container.bind<ISecaoRepository>(TYPES.ISecaoRepository).to(SecaoRepository).inRequestScope();
  container.bind<ISecaoService>(TYPES.ISecaoService).to(SecaoService).inRequestScope();
  container.bind<IUsuarioRepository>(TYPES.IUsuarioRepository).to(UsuarioRepository).inRequestScope();
  container.bind<IUsuarioService>(TYPES.IUsuarioService).to(UsuarioService).inRequestScope();
  container.bind<IPagamentoRepository>(TYPES.IPagamentoRepository).to(PagamentoRepository).inRequestScope();
  container.bind<IPagamentoService>(TYPES.IPagamentoService).to(PagamentoService).inRequestScope();
  
  return container;
};
