class player extends Phaser.Scene {
  constructor() {
    super("player");
  }

  create() {
    this.add.image(400, 225, "start").postFX.addBlur(5);

    this.add
      .text(400, 50, "Escolha seu personagem:", {
        fontFamily: "pixelify-sans",
        fontSize: "64px",
        fill: "#ffffff",
      })
      .setOrigin(0.5);

    this.anims.create({
      key: "running",
      frames: this.anims.generateFrameNumbers("marquinhos_run", {
        start: 0,
        end: 3,
      }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "running1",
      frames: this.anims.generateFrameNumbers("sergio_run", {
        start: 0,
        end: 3,
      }),
      frameRate: 10,
      repeat: -1,
    });

    this.sergio = this.add
      .sprite(300, 225, "sergio")
      .setScale(3)
      .setInteractive()
      .on("pointerdown", () => {
        console.log("Sergio player selected");
        this.game.localPlayer = "sergio";
        this.game.socket.emit(
          "select-player",
          this.game.room,
          this.game.localPlayer,
        );
        this.scene.stop("player");
        this.scene.start("scene0");
      });
    this.sergio.play("running1");

    this.marquinhos = this.add
      .sprite(550, 225, "marquinhos")
      .setScale(3)
      .setInteractive()
      .on("pointerdown", () => {
        console.log("Marquinhos player selected");
        this.game.localPlayer = "marquinhos";
        this.game.socket.emit(
          "select-player",
          this.game.room,
          this.game.localPlayer,
        );
        this.scene.stop("player");
        this.scene.start("scene0");
      });
    this.marquinhos.play("running");
  }
}

export default player;
