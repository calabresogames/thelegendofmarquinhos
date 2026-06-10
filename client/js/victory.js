/*global Phaser*/
/*eslint no-undef: "error"*/

class victory extends Phaser.Scene {
  constructor() {
    super("victory");
  }

  init(data) {
    // Recebe dados da cena de jogo
    this.totalEnemiesDefeated = data?.totalEnemiesDefeated || 0;
    this.totalGameTime = data?.totalGameTime || 0; // em segundos
    this.remainingLives = data?.remainingLives || 3;
    this.totalScore = this.calculateScore();
    this.stars = this.calculateStars();
  }

  calculateScore() {
    // Fórmula simples: inimigos × 100 + tempo × 10 + vidas × 50
    const score =
      this.totalEnemiesDefeated * 100 +
      Math.max(0, 6000 - this.totalGameTime) * 10 +
      this.remainingLives * 50;
    return Math.max(0, score);
  }

  calculateStars() {
    // Sistema de 1 a 3 estrelas
    // 1 estrela: básico (chegou ao final)
    // 2 estrelas: bom (poucos danos, tempo razoável)
    // 3 estrelas: excelente (perfeito ou quase)

    if (this.remainingLives >= 3 && this.totalGameTime < 600) return 3; // Perfeito
    if (this.remainingLives >= 2 && this.totalGameTime < 900) return 3; // Muito bom
    if (this.remainingLives >= 2) return 2; // Bom
    return 1; // Básico
  }

  preload() {
    // Se houver imagem de vitória, carregar aqui
    // this.load.setPath("assets/");
    // this.load.image("victory-bg", "VICTORY.png");
  }

  create() {
    // ═══════════════════════════════════════════════════════════
    // FUNDO PRETO (pode ser substituído por imagem depois)
    // ═══════════════════════════════════════════════════════════
    this.add
      .rectangle(512, 300, 1024, 600, 0x000000)
      .setOrigin(0.5, 0.5)
      .setScrollFactor(0)
      .setDepth(0);

    // ═══════════════════════════════════════════════════════════
    // TÍTULO "PARABÉNS GANHOU!" COM BRILHO
    // ═══════════════════════════════════════════════════════════

    // Posição configurável: titleX, titleY
    const titleX = 410;
    const titleY = 50;

    // Efeito de brilho: texto duplicado em amarelo com blur
    const glowText = this.add
      .text(titleX, titleY, "PABÉNS GANHOU!", {
        fontFamily: "'Arial Black', Arial",
        fontSize: "64px",
        color: "#ffff00",
        stroke: "#ff8800",
        strokeThickness: 8,
        shadow: {
          offsetX: 0,
          offsetY: 0,
          color: "#ffdd00",
          blur: 15,
          fill: true,
        },
      })
      .setOrigin(0.5, 0.5)
      .setScrollFactor(0)
      .setDepth(11)
      .setAlpha(0);

    // Animação de aparição com escala
    this.tweens.add({
      targets: glowText,
      alpha: { from: 0, to: 1 },
      scale: { from: 0.5, to: 1 },
      duration: 800,
      ease: "Back.Out",
    });

    // Animação de pulsação infinita no título
    this.tweens.add({
      targets: glowText,
      scale: { from: 1, to: 1.05 },
      duration: 600,
      ease: "Sine.InOut",
      yoyo: true,
      repeat: -1,
      delay: 800,
    });

    // ═══════════════════════════════════════════════════════════
    // PLACAR FINAL
    // ═══════════════════════════════════════════════════════════

    // Posição configurável: scoreX, scoreY
    const scoreX = 400;
    const scoreY = 100;
    const scoreSpacing = 40;

    // Conversão do tempo para minutos:segundos
    const minutes = Math.floor(this.totalGameTime / 60);
    const seconds = this.totalGameTime % 60;
    const timeStr = `${minutes}:${seconds.toString().padStart(2, "0")}`;

    const scoreItems = [
      `Inimigos Derrotados: ${this.totalEnemiesDefeated}`,
      `Tempo Total: ${timeStr}`,
      `Vidas Restantes: ${this.remainingLives}`,
      `Pontuação Final: ${this.totalScore}`,
    ];

    scoreItems.forEach((item, index) => {
      this.add
        .text(scoreX, scoreY + index * scoreSpacing, item, {
          fontFamily: "'Arial', Arial",
          fontSize: "24px",
          color: "#ffffff",
          stroke: "#000000",
          strokeThickness: 4,
        })
        .setOrigin(0.5, 0)
        .setScrollFactor(0)
        .setDepth(10)
        .setAlpha(0);

      // Animação de fade-in em cascata
      this.tweens.add({
        targets: this.children.list[this.children.list.length - 1],
        alpha: { from: 0, to: 1 },
        duration: 400,
        ease: "Power2.Out",
        delay: 400 + index * 150,
      });
    });

    // ═══════════════════════════════════════════════════════════
    // SISTEMA DE ESTRELAS (1-3 ESTRELAS)
    // ═══════════════════════════════════════════════════════════

    // Posição configurável: starsX, starsY
    const starsX = 320;
    const starsY = 295;
    const starSize = 60;
    const starSpacing = 80;

    // Renderiza as estrelas
    for (let i = 1; i <= 3; i++) {
      const starX = starsX - starSpacing + i * starSpacing;
      const starY = starsY;
      const filled = i <= this.stars;
      const starColor = filled ? 0xffdd00 : 0x444444;

      const star = this.add
        .text(starX, starY, "★", {
          fontFamily: "'Arial Black', Arial",
          fontSize: `${starSize}px`,
          color: filled ? "#ffdd00" : "#666666",
          stroke: filled ? "#ff8800" : "#000000",
          strokeThickness: filled ? 4 : 2,
        })
        .setOrigin(0.5, 0.5)
        .setScrollFactor(0)
        .setDepth(10)
        .setAlpha(0);

      // Animação de aparição com spin
      this.tweens.add({
        targets: star,
        alpha: { from: 0, to: 1 },
        scale: { from: 0, to: 1 },
        rotation: { from: Math.PI, to: 0 },
        duration: 600,
        ease: "Back.Out",
        delay: 1200 + i * 200,
      });

      // Pulsação para estrelas preenchidas
      if (filled) {
        this.tweens.add({
          targets: star,
          scale: { from: 1, to: 1.1 },
          duration: 400,
          ease: "Sine.InOut",
          yoyo: true,
          repeat: -1,
          delay: 2400 + i * 200,
        });
      }
    }

    // ═══════════════════════════════════════════════════════════
    // BOTÃO "JOGAR NOVAMENTE"
    // ═══════════════════════════════════════════════════════════

    // Posição configurável: buttonX, buttonY
    const buttonX = 400;
    const buttonY = 400;
    const buttonWidth = 320;
    const buttonHeight = 70;

    const replayButtonBg = this.add
      .rectangle(buttonX, buttonY, buttonWidth, buttonHeight, 0xffd700)
      .setOrigin(0.5, 0.5)
      .setScrollFactor(0)
      .setDepth(10)
      .setInteractive()
      .setAlpha(0)
      .on("pointerover", () => {
        replayButtonBg.setFillStyle(0xffed4e);
        replayButtonText.setScale(1.08);
      })
      .on("pointerout", () => {
        replayButtonBg.setFillStyle(0xffd700);
        replayButtonText.setScale(1);
      })
      .on("pointerdown", () => {
        // Reinicia o jogo do começo
        this.scene.stop("scene0");
        this.scene.stop("victory");
        this.scene.start("scene0");
      });

    const replayButtonText = this.add
      .text(buttonX, buttonY, "Jogar Novamente", {
        fontFamily: "'Arial Black', Arial",
        fontSize: "32px",
        color: "#000000",
        stroke: "#ffffff",
        strokeThickness: 3,
      })
      .setOrigin(0.5, 0.5)
      .setScrollFactor(0)
      .setDepth(11)
      .setAlpha(0);

    // Animação de aparição do botão
    this.tweens.add({
      targets: [replayButtonBg, replayButtonText],
      alpha: { from: 0, to: 1 },
      scale: { from: 0.7, to: 1 },
      duration: 600,
      ease: "Back.Out",
      delay: 1600,
    });

    globalThis.google.accounts.id.initialize({
      client_id:
        "331191695151-ku8mdhd76pc2k36itas8lm722krn0u64.apps.googleusercontent.com",
      callback: (res) => {
        if (res.error) {
          console.error(res.error);
        } else {
          axios
            .post(
              "https://feira-de-jogos.dev.br/api/v2/credit",
              {
                product: 63, // id do jogo cadastrado no banco de dados da Feira de Jogos
                value: 400, // crédito em tijolinhos
              },
              {
                headers: {
                  Authorization: `Bearer ${res.credential}`,
                },
              },
            )
            .then(function (response) {
              console.log(response);
              alert("Crédito adicionado!");
            })
            .catch(function (error) {
              console.error(error);
              alert("Erro ao adicionar crédito :(");
            });
        }
      },
    });

    globalThis.google.accounts.id.prompt((notification) => {
      if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
        globalThis.google.accounts.id.prompt();
      }
    });
  }

  update() {
    // Lógica pode ser expandida se necessário
  }
}

export default victory;
