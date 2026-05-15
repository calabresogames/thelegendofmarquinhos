class start extends Phaser.Scene {
  constructor() {
    super("start");
  }

  init() {
    let room = new URLSearchParams(location.search).get("room");
    if (room) {
      this.game.room = room;
      this.game.socket.emit("join-room", this.game.room);
    }
  }

  preload() {
    this.load.setPath("assets/");
    this.load.image("start", "tela inicial jogo.png");
  }

  create() {
    this.add
      .image(400, 225, "start")
      .setInteractive()
      .on("pointerdown", () => {
        this.scene.start("preloader");
      });
  }
}

export default start;
