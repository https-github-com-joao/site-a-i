const TYPES = {
  HttpClient: Symbol.for('HttpClient'),

  IFilmeRepository: Symbol.for('IFilmeRepository'),
  IFilmeService: Symbol.for('IFilmeService'),
  ISalaRepository: Symbol.for('ISalaRepository'),
  ISalaService: Symbol.for('ISalaService'),
  ISecaoRepository: Symbol.for('ISecaoRepository'),
  ISecaoService: Symbol.for('ISecaoService'),
  IUsuarioRepository: Symbol.for('IUsuarioRepository'),
  IUsuarioService: Symbol.for('IUsuarioService'),
  IPagamentoRepository: Symbol.for('IPagamentoRepository'),
  IPagamentoService: Symbol.for('IPagamentoService'),
};

export default TYPES;
