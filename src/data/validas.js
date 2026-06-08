import { normalize } from '../lib/normalize.js'
import { RESPOSTAS } from './respostas.js'

// Palavras adicionais aceitas APENAS como chute (não viram solução).
// Substantivos/adjetivos comuns de 5 letras; sem nomes próprios.
const VALIDAS_EXTRA = [
  'abade', 'abaco', 'acido', 'acime', 'adega', 'agudo', 'aguda', 'alvos',
  'ampla', 'amplo', 'anjos', 'antes', 'apito', 'arcos', 'arido', 'aroma',
  'asilo', 'astro', 'atroz', 'aulas', 'aviso', 'bacia', 'banha', 'barba',
  'barra', 'bater', 'beira', 'besta', 'bicho', 'bispo', 'bloco', 'boato',
  'bocas', 'bombo', 'bonde', 'borda', 'bruto', 'bruta', 'buraco', 'cabos',
  'cacho', 'cacos', 'cadea', 'cafes', 'caldo', 'calor', 'caule', 'cdigo',
  'cegos', 'celas', 'cenas', 'cesta', 'chato', 'chefe', 'chita', 'churo',
  'cinza', 'claro', 'clube', 'cofre', 'colar', 'comer', 'conde', 'copia',
  'covil', 'crase', 'crato', 'credo', 'creme', 'crina', 'crise', 'cubos',
  'curva', 'damas', 'datas', 'denso', 'dieta', 'digno', 'disco', 'ditos',
  'dobro', 'dogma', 'dolar', 'donos', 'dorso', 'dosar', 'drama', 'dunas',
  'ervas', 'extra', 'falta', 'fardo', 'fauna', 'favor', 'feixe', 'ferro',
  'festa', 'feudo', 'fibra', 'ficha', 'final', 'fino', 'firme', 'fitas',
  'flora', 'fluxo', 'fobia', 'foram', 'fosso', 'frase', 'frota', 'fugaz',
  'fumos', 'furia', 'galos', 'gancho', 'garra', 'gemas', 'genio', 'gesso',
  'gesto', 'globo', 'goela', 'golpe', 'grade', 'graos', 'grato', 'grave',
  'greve', 'grito', 'grupo', 'guapo', 'gueto', 'guias', 'guisa', 'hapto',
  'haste', 'herma', 'hifen', 'himen', 'hinos', 'idade', 'idolo', 'igual',
  'ilesa', 'ilhas', 'index', 'ingles', 'iodos', 'irmao', 'isca', 'jarro',
  'jaula', 'jeito', 'jogar', 'junco', 'junta', 'justo', 'lacos', 'lados',
  'lance', 'lapso', 'larva', 'lazer', 'legua', 'lema', 'lenco', 'lenha',
  'letra', 'leve', 'libra', 'licao', 'liceu', 'ligas', 'limbo', 'limos',
  'litro', 'lixos', 'local', 'lodos', 'lombo', 'lonas', 'lotes', 'louca',
  'lucro', 'lume', 'lustro', 'macho', 'madre', 'magia', 'malas', 'manto',
  'marca', 'marco', 'margem', 'maremo', 'matiz', 'meiga', 'melao', 'menor',
  'menos', 'menta', 'merlo', 'metas', 'metal', 'micro', 'milho', 'minas',
  'mirra', 'mirto', 'mocas', 'modos', 'moeda', 'moita', 'monge', 'morro',
  'mosca', 'mosto', 'mudez', 'multa', 'mundo', 'museu', 'nabos', 'naipe',
  'navio', 'nervo', 'neto', 'ninho', 'nivel', 'nobre', 'nodoa', 'norte',
  'notas', 'nucleo', 'numero', 'obras', 'ocaso', 'oculo', 'odres', 'olaria',
  'olmos', 'ondas', 'opala', 'opera', 'ordem', 'orgao', 'ossos', 'ostra',
  'ouros', 'ovais', 'pacto', 'padre', 'pagao', 'paios', 'palio', 'palha',
  'panos', 'papas', 'pares', 'parto', 'passo', 'patio', 'pauta', 'pavio',
  'pecas', 'pedal', 'pegada', 'penas', 'perda', 'pesos', 'piano', 'picos',
  'pilar', 'pinos', 'pinto', 'pista', 'placa', 'plano', 'pneus', 'podio',
  'poeta', 'polar', 'polos', 'ponta', 'porte', 'posse', 'posto', 'potro',
  'prado', 'prata', 'preda', 'presa', 'prima', 'primo', 'prole', 'prova',
  'pulgas', 'punho', 'pupas', 'quilo', 'rabos', 'radio', 'ramos', 'rampa',
  'ranço', 'rapaz', 'raros', 'rasgo', 'raspa', 'rebox', 'recuo', 'redes',
  'regio', 'regua', 'relva', 'renda', 'reses', 'resmo', 'retas', 'reto',
  'risco', 'ritmo', 'rocha', 'rolha', 'rosca', 'rotas', 'rouco', 'rubro',
  'rugas', 'rumos', 'sacos', 'salao', 'saldo', 'salmo', 'salto', 'salva',
  'santo', 'sapo', 'sarja', 'saudacao', 'seara', 'secas', 'selos', 'selva',
  'senha', 'sigla', 'silos', 'sinal', 'sino', 'sobra', 'socio', 'soldo',
  'solos', 'soros', 'sucos', 'sulco', 'surto', 'tabua', 'talco', 'talos',
  'tampa', 'tapas', 'taras', 'tarja', 'tatus', 'tecla', 'teias', 'teima',
  'telas', 'tempo', 'tenda', 'tenis', 'tenor', 'terco', 'termo', 'teses',
  'teto', 'texto', 'tigre', 'tinta', 'tipos', 'tomos', 'tonel', 'topos',
  'torre', 'torta', 'torto', 'tosse', 'traca', 'traco', 'trama', 'trapo',
  'trevo', 'trigo', 'trilho', 'trono', 'tropa', 'tubos', 'turba', 'turno',
  'ultra', 'unha', 'urnas', 'usina', 'usual', 'vacas', 'valas', 'valsa',
  'vapor', 'vaqas', 'vasto', 'vazio', 'veado', 'velas', 'venda', 'verbo',
  'verde', 'verme', 'vespa', 'vetor', 'vidas', 'vidro', 'vilas', 'vinco',
  'vinho', 'viola', 'virus', 'vista', 'vivaz', 'vivos', 'vozes', 'xaile',
  'xales', 'xarope', 'xeque', 'zelos', 'zonas', 'zumbi',
]

// Conjunto de palavras válidas (normalizadas), incluindo todas as soluções.
export const VALIDAS = new Set(
  [...RESPOSTAS, ...VALIDAS_EXTRA]
    .map(normalize)
    .filter((w) => w.length === 5)
)

export function isValidGuess(word) {
  return VALIDAS.has(normalize(word))
}
