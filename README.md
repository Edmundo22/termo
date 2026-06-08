# Termo

Réplica do jogo de navegador **[Termo](https://term.ooo/)** (a versão brasileira do Wordle),
feita em **React + Vite**. Sem API, sem banco de dados e **sem limite diário** — jogue quantas
vezes quiser.

## Modos

- **Termo (Individual)** — 1 palavra, 6 tentativas.
- **Dueto** — 2 palavras ao mesmo tempo, 7 tentativas.
- **Quarteto** — 4 palavras ao mesmo tempo, 9 tentativas.

Sempre palavras de **5 letras** em **português brasileiro**, sem nomes próprios e sem verbos
no infinitivo (apenas substantivos e adjetivos como soluções).

## Como jogar

- Digite uma palavra de 5 letras e pressione **Enter**.
- 🟩 verde: letra certa na posição certa.
- 🟨 amarelo: letra existe na palavra, em outra posição.
- ⬛ cinza: letra não existe na palavra.
- Você digita sem acento; ao acertar, a célula mostra a letra acentuada correta.
- No Dueto/Quarteto o mesmo chute vale para todos os tabuleiros.

## Rodando localmente

```bash
npm install
npm run dev
```

Abra a URL exibida pelo Vite (geralmente http://localhost:5173).

## Build de produção

```bash
npm run build
npm run preview
```

## Estrutura

```
src/
  data/        # listas de palavras (respostas e chutes válidos)
  lib/         # normalização, lógica do jogo e sorteio
  components/  # Board, Row, Tile, Keyboard, Header, GameOver
  modes/       # useTermo: hook que gerencia 1, 2 ou 4 tabuleiros
  App.jsx      # composição da interface
```

As listas de palavras ficam em `src/data/`:

- `respostas.js` — soluções curadas (substantivos/adjetivos, sem nomes próprios nem verbos).
- `validas.js` — ~8000 palavras de 5 letras aceitas como chute (sem nomes próprios e sem
  verbos no infinitivo), derivadas de um dicionário PT-BR.

---

🤖 Generated with [Claude Code](https://claude.com/claude-code)
