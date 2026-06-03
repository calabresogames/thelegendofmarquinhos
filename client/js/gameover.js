/*global Phaser*/
/*eslint no-undef: "error"*/

class gameover extends Phaser.Scene {
  constructor() {
    super("gameover");
  }

  init(data) {
    // Recebe dados da cena anterior
    this.waveReached = data?.waveReached || 1;
    this.hordeReached = data?.hordeReached || 1;
    this.enemiesDefeated = data?.enemiesDefeated || 0;
    this.gameTime = data?.gameTime || 0; // em segundos
    this.continueCountdown = 10; // 10 segundos para continuar
    this.countdownActive = true;
  }

  preload() {
    this.load.setPath("assets/");
    this.load.image("gameover-bg", "GAME_OVER.png");
  }

  create() {
    // ═══════════════════════════════════════════════════════════
    // FUNDO COM IMAGEM DE GAME OVER
    // ═══════════════════════════════════════════════════════════
    this.add
      .image(400, 225, "gameover-bg")
      .setOrigin(0.5, 0.5)
      .setScrollFactor(0)
      .setDepth(0);

    // ═══════════════════════════════════════════════════════════
    // PLACAR DA SESSÃO
    // ═══════════════════════════════════════════════════════════

    // Posição configurável: scoreX, scoreY (para ajustar layout depois)
    const scoreX = 512;
    const scoreY = 180;

    // Título "PLACAR"
    this.add
      .text(scoreX, scoreY, "PLACAR", {
        fontFamily: "'Arial Black', Arial",
        fontSize: "32px",
        color: "#ffdd00",
        stroke: "#000000",
        strokeThickness: 6,
      })
      .setOrigin(0.5, 0)
      .setScrollFactor(0)
      .setDepth(10);

    // Conversão do tempo para minutos:segundos
    const minutes = Math.floor(this.gameTime / 60);
    const seconds = this.gameTime % 60;
    const timeStr = `${minutes}:${seconds.toString().padStart(2, "0")}`;

    // Detalhes do placar (posição configurável)
    const scoreDetailsY = scoreY + 50;
    const scoreDetailsSpacing = 35;

    const scoreDetails = [
      `Wave Alcançada: ${this.waveReached}/5`,
      `Orda Alcançada: ${this.hordeReached}`,
      `Inimigos Derrotados: ${this.enemiesDefeated}`,
      `Tempo de Jogo: ${timeStr}`,
    ];

    scoreDetails.forEach((detail, index) => {
      this.add
        .text(scoreX, scoreDetailsY + index * scoreDetailsSpacing, detail, {
          fontFamily: "'Arial', Arial",
          fontSize: "20px",
          color: "#ffffff",
          stroke: "#000000",
          strokeThickness: 3,
        })
        .setOrigin(0.5, 0)
        .setScrollFactor(0)
        .setDepth(10);
    });

    // ═══════════════════════════════════════════════════════════
    // CONTADOR "CONTINUAR?"
    // ═══════════════════════════════════════════════════════════

    // Posição configurável: countdownX, countdownY
    const countdownX = 512;
    const countdownY = 420;

    const countdownText = this.add
      .text(countdownX, countdownY, `CONTINUAR? ${this.continueCountdown}...`, {
        fontFamily: "'Arial Black', Arial",
        fontSize: "36px",
        color: "#ff4444",
        stroke: "#000000",
        strokeThickness: 6,
      })
      .setOrigin(0.5, 0.5)
      .setScrollFactor(0)
      .setDepth(10);

    // Timer que decrementa a cada segundo
    this.countdownTimer = this.time.addEvent({
      delay: 1000,
      callback: () => {
        this.continueCountdown--;
        countdownText.setText(`CONTINUAR? ${this.continueCountdown}...`);

        if (this.continueCountdown <= 0) {
          this.countdownActive = false;
          this.countdownTimer.remove();
          // Volta para a cena inicial
          this.scene.stop("scene0");
          this.scene.stop("gameover");
          this.scene.start("start");
        }
      },
      repeat: 9, // 9 vezes (9 a 1, depois dispara ao chegar a 0)
    });

    // ═══════════════════════════════════════════════════════════
    // BOTÃO "CONTINUAR"
    // ═══════════════════════════════════════════════════════════

    // Posição configurável: buttonX, buttonY
    const buttonX = 512;
    const buttonY = 500;
    const buttonWidth = 280;
    const buttonHeight = 60;

    const buttonBg = this.add
      .rectangle(buttonX, buttonY, buttonWidth, buttonHeight, 0x2196f3)
      .setOrigin(0.5, 0.5)
      .setScrollFactor(0)
      .setDepth(10)
      .setInteractive()
      .on("pointerover", () => {
        buttonBg.setFillStyle(0x42a5f5);
        buttonText.setScale(1.08);
      })
      .on("pointerout", () => {
        buttonBg.setFillStyle(0x2196f3);
        buttonText.setScale(1);
      })
      .on("pointerdown", () => {
        if (!this.countdownActive) return;
        this.countdownActive = false;
        if (this.countdownTimer) this.countdownTimer.remove();
        // Reinicia a wave atual com vida cheia
        this.scene.stop("gameover");
        this.scene.restart("scene0");
      });

    const buttonText = this.add
      .text(buttonX, buttonY, "Continuar", {
        fontFamily: "'Arial Black', Arial",
        fontSize: "28px",
        color: "#ffffff",
        stroke: "#000000",
        strokeThickness: 4,
      })
      .setOrigin(0.5, 0.5)
      .setScrollFactor(0)
      .setDepth(11);

    // Animação de entrada
    this.tweens.add({
      targets: [countdownText, buttonBg, buttonText],
      alpha: { from: 0, to: 1 },
      scale: { from: 0.8, to: 1 },
      duration: 600,
      ease: "Back.Out",
      delay: 200,
    });
  }

  update() {
    // Lógica pode ser expandida se necessário
  }
}

export default gameover;
