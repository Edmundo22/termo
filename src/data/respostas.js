// Lista curada de SOLUÇÕES: substantivos e adjetivos do português brasileiro
// com exatamente 5 letras (acentos contam como a mesma letra base).
// Sem nomes próprios e sem verbos no infinitivo. Acentuação mantida para exibição.
const RESPOSTAS_BASE = [
  // alimentos e frutas
  'manga', 'limao', 'cacau', 'pinha', 'amora', 'arroz', 'leite', 'massa',
  'pizza', 'carne', 'peixe', 'fruta', 'fruto', 'doces', 'sopas', 'prato',
  // animais
  'cabra', 'burro', 'ganso', 'tigre', 'zebra', 'porco', 'pomba', 'corvo',
  'garca', 'lince', 'cobra', 'patos', 'ratos', 'sapos', 'lobos', 'mulas',
  // objetos e casa
  'mesas', 'banco', 'porta', 'telha', 'chave', 'forno', 'fogao', 'copos',
  'caixa', 'cesto', 'balde', 'corda', 'vasos', 'livro', 'lapis', 'papel',
  'pasta', 'pente', 'sabao', 'cinto', 'bolsa', 'gorro', 'roupa', 'linha',
  'botao', 'quadro', 'tela', 'panela', 'garfo', 'colher',
  // natureza
  'praia', 'serra', 'monte', 'campo', 'pedra', 'areia', 'terra', 'vento',
  'chuva', 'nuvem', 'raios', 'folha', 'galho', 'rosas', 'cravo', 'lirio',
  'palma', 'musgo', 'fungo', 'mares', 'rios', 'lagos', 'matas', 'raiz',
  // corpo
  'braco', 'perna', 'pulso', 'ombro', 'peito', 'rosto', 'testa', 'labio',
  'dente', 'maos', 'dedos', 'unhas', 'pele', 'osso',
  // adjetivos / qualidades
  'verde', 'preto', 'roxos', 'clara', 'altos', 'largo', 'curto', 'longo',
  'magro', 'gordo', 'forte', 'fraco', 'lento', 'limpo', 'velho', 'macio',
  'azedo', 'morno', 'frios', 'feliz', 'calmo', 'serio', 'sabio', 'tolos',
  'belos', 'feios', 'ricos', 'pobre', 'jovem', 'sadio', 'vivos', 'novos',
  // tempo e abstratos
  'horas', 'noite', 'tarde', 'manha', 'verao', 'sonho', 'medos', 'ideia',
  'razao', 'fatos', 'dados', 'regra', 'valor', 'custo', 'forca', 'honra',
  'calma', 'amor', 'sorte', 'fama',
  // vestuário e transporte
  'meias', 'luvas', 'saias', 'calca', 'carro', 'barco', 'aviao', 'metro',
  'rodas', 'motor', 'freio', 'ponte', 'praca',
  // cultura e lugares
  'museu', 'circo', 'palco', 'filme', 'jogos', 'festa', 'baile', 'danca',
  'verso', 'poema', 'carta', 'mapas', 'globo', 'reino', 'povos', 'nacao',
  'tribo', 'feira', 'vila', 'loja', 'rua',
]

// Garante exatamente 5 letras (base, sem acento) e remove duplicatas.
export const RESPOSTAS = [...new Set(
  RESPOSTAS_BASE
    .map((w) => w.trim())
    .filter((w) => w.normalize('NFD').replace(/[̀-ͯ]/g, '').length === 5)
)]
