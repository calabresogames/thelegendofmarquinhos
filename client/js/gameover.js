/*global Phaser*/
/*eslint no-undef: "error"*/

class gameover extends Phaser.Scene {
  constructor() {
    super("gameover");
  }

  init(data) {
    // Recebe dados como wave alcançada
    this.waveReached = data?.waveReached || 0;
    this.hordeReached = data?.hordeReached || 0;
  }

  preload() {
    this.load.setPath("assets/");
    this.load.image("gameover-bg", "GAME_OVER.png");
  }

  create() {
    // Fundo com imagem GAME_OVER.png
    this.add
      .image(400, 225, "gameover-bg")
      .setOrigin(0.5, 0.5)
      .setScrollFactor(0)
      .setDepth(0);

    // Score / Wave alcançada
    const scoreText = `Wave: ${this.waveReached} | Orda: ${this.hordeReached}`;
    this.add
      .text(512, 320, scoreText, {
        fontFamily: "'Arial Black', Arial",
        fontSize: "40px",
        color: "#ffffff",
        stroke: "#000000",
        strokeThickness: 6,
        align: "center",
      })
      .setOrigin(0.5, 0.5)
      .setScrollFactor(0)
      .setDepth(10);

    // Botão "Tentar Novamente"
    const buttonWidth = 280;
    const buttonHeight = 60;
    const buttonX = 512;
    const buttonY = 500;

    const buttonBg = this.add
      .rectangle(buttonX, buttonY, buttonWidth, buttonHeight, 0x4caf50)
      .setOrigin(0.5, 0.5)
      .setScrollFactor(0)
      .setDepth(10)
      .setInteractive()
      .on("pointerover", () => {
        buttonBg.setFillStyle(0x66bb6a);
        buttonText.setScale(1.05);
      })
      .on("pointerout", () => {
        buttonBg.setFillStyle(0x4caf50);
        buttonText.setScale(1);
      })
      .on("pointerdown", () => {
        // Retorna ao start para reiniciar tudo
        this.scene.stop("scene0");
        this.scene.stop("gameover");
        this.scene.start("start");
      });

    const buttonText = this.add
      .text(buttonX, buttonY, "Tentar Novamente", {
        fontFamily: "'Arial Black', Arial",
        fontSize: "28px",
        color: "#ffffff",
        stroke: "#000000",
        strokeThickness: 4,
        align: "center",
      })
      .setOrigin(0.5, 0.5)
      .setScrollFactor(0)
      .setDepth(11);

    // Animação de entrada
    this.tweens.add({
      targets: [buttonBg, buttonText],
      alpha: { from: 0, to: 1 },
      y: { from: 540, to: 500 },
      duration: 600,
      ease: "Back.Out",
      delay: 300,
    });
  }
}

export default gameover;
