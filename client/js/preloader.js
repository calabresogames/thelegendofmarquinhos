class preloader extends Phaser.Scene {
  constructor() {
    super("preloader");
  }

  init() {
    this.add.image(400, 225, "start-background");

    this.add.rectangle(400, 300, 468, 32).setStrokeStyle(1, 0xffffff);
    const bar = this.add.rectangle(400 - 230, 300, 4, 28, 0xffffff);

    this.load.on("progress", (progress) => {
      bar.width = 4 + 460 * progress;
    });
  }

  preload() {
    this.load.setPath("assets/");

    this.load.tilemapTiledJSON("MapaFase1", "MapaFase1.JSON");

    this.load.image("2", "2.png");
    this.load.image("3 (1)", "3.png");
    this.load.image("4", "4.png");
    this.load.image("6", "6.png");
    this.load.image("Arc", "Arc.png");
    this.load.image("houded2", "houded2.png");
    this.load.image("House Inside", "House Inside.png");
    this.load.image("House Outside", "House Outside.png");
    this.load.image("houses", "houses.png");
    this.load.image("houses1", "houses1.png");
    this.load.image("houses2", "houses2.png");
    this.load.image("road&lamps", "road&lamps.png");
    this.load.image("Sakura Tree", "Sakura Tree.gif");
    this.load.image("SCS_Background_Sunset_01", "SCS_Background_Sunset_01.png");

    // sergio spritesheets

    this.load.spritesheet("sergio_idle", "sergio sprite/sergioparado.png", {
      frameWidth: 16,
      frameHeight: 32,
    });
    this.load.spritesheet("sergio_run", "sergio sprite/sergiocorre.png", {
      frameWidth: 16,
      frameHeight: 32,
    });
    this.load.spritesheet("sergio_punch1", "sergio sprite/sergiossoco1.png", {
      frameWidth: 22,
      frameHeight: 32,
    });
    this.load.spritesheet("sergio_punch2", "sergio sprite/sergiossoco2.png", {
      frameWidth: 22,
      frameHeight: 32,
    });
    this.load.spritesheet("sergio_kick1", "sergio sprite/sergiochute1.png", {
      frameWidth: 25,
      frameHeight: 32,
    });

    // marquinhos spritesheets

    this.load.spritesheet(
      "marquinhos_idle",
      "marquinho sprite/marquinhosparado.png",
      {
        frameWidth: 16,
        frameHeight: 32,
      },
    );
    this.load.spritesheet(
      "marquinhos_run",
      "marquinho sprite/marquinhoscorre.png",
      {
        frameWidth: 16,
        frameHeight: 32,
      },
    );
    this.load.spritesheet(
      "marquinhos_punch1",
      "marquinho sprite/marquinhossoco1-1.png",
      {
        frameWidth: 22,
        frameHeight: 32,
      },
    );
    this.load.spritesheet(
      "marquinhos_punch2",
      "marquinho sprite/marquinhossoco2.png",
      {
        frameWidth: 22,
        frameHeight: 32,
      },
    );
    this.load.spritesheet(
      "marquinhos_kick1",
      "marquinho sprite/marquinhoschute1.png",
      {
        frameWidth: 25,
        frameHeight: 32,
      },
    );
    this.load.spritesheet("enemy", "Machine_guy_sprite_sheet.png", {
      frameWidth: 180,
      frameHeight: 90,
    });

    // [FIX 2] punch/kick carregados aqui, não em create()

    this.load.image("botaochute", "botaochute.png");
    this.load.image("botaosoco", "botaosoco.png");
    this.load.image("hud_slot", "jogaço/slotface.png");
    this.load.image("hud_rosto", "jogaço/marcosrosto.png");
    this.load.spritesheet(
      "hud_coracao",
      "marquinho sprite/marquinhocoracao.png",
      {
        frameWidth: 16,
        frameHeight: 32,
      },
    );

    // AUDIO
    //this.load.audio("music", "music.mp3");
    //this.load.audio("laser", "laser.mp3");
    this.load.plugin(
      "rexvirtualjoystickplugin",
      "../js/rexvirtualjoystickplugin.min.js",
      true,
    );
  }

  create() {
    this.scene.stop("preloader");
    if (this.game.room) {
      this.scene.start("player");
    } else {
      this.scene.start("room");
    }
  }
}

export default preloader;
