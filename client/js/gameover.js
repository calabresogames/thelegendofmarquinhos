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
    // BOTÃO "TENTAR NOVAMENTE"
    // ═══════════════════════════════════════════════════════════

    // Posições ajustadas para centralizar o botão na tela
    const buttonX = 560; // Alinhado ao centro horizontal do fundo (400)
    const buttonY = 170; // Centralizado verticalmente
    const buttonWidth = 320;
    const buttonHeight = 70;

    const buttonBg = this.add
      .rectangle(buttonX, buttonY, buttonWidth, buttonHeight, 0xff4444) // Cor alterada para vermelho (combina com Game Over)
      .setOrigin(0.5, 0.5)
      .setScrollFactor(0)
      .setDepth(10)
      .setInteractive()
      .on("pointerover", () => {
        buttonBg.setFillStyle(0xff6666);
        buttonText.setScale(1.08);
      })
      .on("pointerout", () => {
        buttonBg.setFillStyle(0xff4444);
        buttonText.setScale(1);
      })
      .on("pointerdown", () => {
        window.location.reload();
      });

    const buttonText = this.add
      .text(buttonX, buttonY, "Tentar Novamente", {
        fontFamily: "'Arial Black', Arial",
        fontSize: "28px",
        color: "#ffffff",
        stroke: "#000000",
        strokeThickness: 5,
      })
      .setOrigin(0.5, 0.5)
      .setScrollFactor(0)
      .setDepth(11);

    // Animação de entrada suave para o botão
    this.tweens.add({
      targets: [buttonBg, buttonText],
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
