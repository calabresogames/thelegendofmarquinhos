# 📋 Guia de Personalização - Cenas de Game Over e Vitória

## 🎮 Cena de Game Over (`client/js/gameover.js`)

### Elementos Principais e Suas Posições

#### 1. **Placar (SCORE)**

- **Arquivo:** `client/js/gameover.js`
- **Localização:** Linhas ~50-85
- **Variáveis de Posição:**
  - `scoreX = 512` — Posição horizontal do placar (centro = 512)
  - `scoreY = 180` — Posição vertical do placar
  - `scoreDetailsSpacing = 35` — Espaçamento vertical entre itens do placar

**Para ajustar:**

```javascript
const scoreX = 512; // Mude o X (0-1024 é a largura)
const scoreY = 180; // Mude o Y (0-600 é a altura)
const scoreDetailsSpacing = 35; // Aumente para mais espaço entre linhas
```

#### 2. **Contador "CONTINUAR?"**

- **Localização:** Linhas ~90-120
- **Variáveis de Posição:**
  - `countdownX = 512` — Posição horizontal
  - `countdownY = 420` — Posição vertical

**Para ajustar:**

```javascript
const countdownX = 512;
const countdownY = 420; // Aumente para descer, diminua para subir
```

#### 3. **Botão "CONTINUAR"**

- **Localização:** Linhas ~125-160
- **Variáveis de Posição:**
  - `buttonX = 512` — Posição horizontal
  - `buttonY = 500` — Posição vertical
  - `buttonWidth = 280` — Largura do botão
  - `buttonHeight = 60` — Altura do botão

**Para ajustar:**

```javascript
const buttonX = 512;
const buttonY = 500; // Mude a posição vertical
const buttonWidth = 280; // Aumente/diminua a largura
const buttonHeight = 60; // Aumente/diminua a altura
```

---

## 🎊 Cena de Vitória (`client/js/victory.js`)

### Elementos Principais e Suas Posições

#### 1. **Título "PARABÉNS GANHOU!"**

- **Localização:** Linhas ~70-100
- **Variáveis de Posição:**
  - `titleX = 512` — Posição horizontal
  - `titleY = 80` — Posição vertical
  - Tamanho da fonte: `fontSize: "64px"` (mude para mudar o tamanho)

**Para ajustar:**

```javascript
const titleX = 512;
const titleY = 80; // Aumente para descer, diminua para subir
// Para mudar o tamanho:
fontSize: "72px"; // Mude de 64 para outro valor
```

#### 2. **Placar Final**

- **Localização:** Linhas ~110-150
- **Variáveis de Posição:**
  - `scoreX = 512` — Posição horizontal
  - `scoreY = 200` — Posição vertical (início do placar)
  - `scoreSpacing = 40` — Espaçamento vertical entre itens

**Para ajustar:**

```javascript
const scoreX = 512;
const scoreY = 200; // Início do placar
const scoreSpacing = 40; // Espaço entre linhas (aumente para mais espaço)
```

#### 3. **Sistema de Estrelas**

- **Localização:** Linhas ~155-220
- **Variáveis de Posição:**
  - `starsX = 512` — Posição horizontal das estrelas
  - `starsY = 450` — Posição vertical das estrelas
  - `starSize = 60` — Tamanho das estrelas
  - `starSpacing = 100` — Espaçamento horizontal entre as 3 estrelas

**Para ajustar:**

```javascript
const starsX = 512;
const starsY = 450; // Mude a altura das estrelas
const starSize = 60; // Aumente para estrelas maiores
const starSpacing = 100; // Aumente para afastar as estrelas
```

#### 4. **Botão "Jogar Novamente"**

- **Localização:** Linhas ~225-260
- **Variáveis de Posição:**
  - `buttonX = 512` — Posição horizontal
  - `buttonY = 560` — Posição vertical
  - `buttonWidth = 320` — Largura do botão
  - `buttonHeight = 70` — Altura do botão

**Para ajustar:**

```javascript
const buttonX = 512;
const buttonY = 560; // Mude a altura do botão
const buttonWidth = 320;
const buttonHeight = 70;
```

---

## 🎨 Sistema de Pontuação (Vitória)

A pontuação final é calculada com base em:

- **Inimigos Derrotados:** `× 100 pontos`
- **Tempo (até 6000 segundos):** `× 10 pontos`
- **Vidas Restantes:** `× 50 pontos`

**Para alterar a fórmula:**
Abra `client/js/victory.js`, localize a função `calculateScore()` (linha ~35):

```javascript
calculateScore() {
  const score =
    this.totalEnemiesDefeated * 100 +      // Mude 100 para outro valor
    Math.max(0, 6000 - this.totalGameTime) * 10 +  // Mude 10 e 6000
    this.remainingLives * 50;              // Mude 50
  return Math.max(0, score);
}
```

---

## ⭐ Sistema de Estrelas

A avaliação é baseada em:

- **3 Estrelas:** Vidas restantes ≥ 3 E tempo < 10 minutos OU Vidas ≥ 2 E tempo < 15 minutos
- **2 Estrelas:** Vidas restantes ≥ 2
- **1 Estrela:** Caso contrário (chegou ao final)

**Para alterar os critérios:**
Abra `client/js/victory.js`, localize a função `calculateStars()` (linha ~45):

```javascript
calculateStars() {
  if (this.remainingLives >= 3 && this.totalGameTime < 600) return 3;
  if (this.remainingLives >= 2 && this.totalGameTime < 900) return 3;
  if (this.remainingLives >= 2) return 2;
  return 1;
}
```

---

## 📊 Dados Passados Entre Cenas

### Game Over recebe:

- `waveReached` — Qual wave foi alcançada (1-5)
- `hordeReached` — Qual orda foi alcançada
- `enemiesDefeated` — Total de inimigos derrotados
- `gameTime` — Tempo de jogo em segundos

### Vitória recebe:

- `totalEnemiesDefeated` — Total de inimigos derrotados
- `totalGameTime` — Tempo total em segundos
- `remainingLives` — Vidas restantes (1-3)

---

## 🎬 Fluxo de Cenas

```
scene0 (Gameplay)
    ↓
    └─→ Morte do Player → gameover.js → Continuar (volta a scene0) OU timeout → start.js

    └─→ Todas as waves vencidas → victory.js → Jogar Novamente → scene0 (reinicia)
```

---

## 💡 Dicas Rápidas

- **Resolução da tela:** 1024 × 600 pixels
- **Coordenada (0, 0):** Canto superior esquerdo
- **Coordenada (512, 300):** Centro da tela

Use essas coordenadas como referência para ajustar posições!
