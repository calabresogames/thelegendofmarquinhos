class scene0 extends Phaser.Scene {
  constructor() {
    super("scene0");

    this.threshold = 0.1;
    this.speed = 100;
    this.direction = undefined;
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

    this.load.spritesheet("vigilant_idle", "NES_Vigilante_Idle_1_strip4.png", {
      frameWidth: 16,
      frameHeight: 32,
    });
    this.load.spritesheet("vigilant_run", "NES_Vigilante_Run_strip4.png", {
      frameWidth: 16,
      frameHeight: 32,
    });

    this.load.spritesheet("enemy", "Machine_guy_sprite_sheet.png", {
      frameWidth: 16,
      frameHeight: 32,
    });
    
    // Punch sprites
    this.load.image("punch1", "NES_Vigilante_Punch_1.png");
    this.load.image("punch2", "NES_Vigilante_Punch_2.png");
    // Kick sprites
    this.load.image("kick1", "NES_Vigilante_Kick_1.png");
    this.load.image("kick2", "NES_Vigilante_Kick_2.png");
    this.load.image("botaochute", "botaochute.png");
    this.load.image("botaosoco", "botaosoco.png");

    this.load.plugin(
      "rexvirtualjoystickplugin",
      "../rexvirtualjoystickplugin.min.js",
      true,
    );
  }

  create() {
    this.tilemap = this.make.tilemap({ key: "MapaFase1" });

    this.tileset2 = this.tilemap.addTilesetImage("2");
    this.tileset3 = this.tilemap.addTilesetImage("3 (1)");
    this.tileset4 = this.tilemap.addTilesetImage("4");

    this.tileset6 = this.tilemap.addTilesetImage("6");
    this.tilesetArc = this.tilemap.addTilesetImage("Arc");

    this.tilesetHouded2 = this.tilemap.addTilesetImage("houded2");
    this.tilesetHouseInside = this.tilemap.addTilesetImage("House Inside");
    this.tilesetHouseOutside = this.tilemap.addTilesetImage("House Outside");
    this.tilesetHouses = this.tilemap.addTilesetImage("houses");
    this.tilesetHouses1 = this.tilemap.addTilesetImage("houses1");
    this.tilesetHouses2 = this.tilemap.addTilesetImage("houses2");
    this.tilesetRoadLamps = this.tilemap.addTilesetImage("road&lamps");
    this.tilesetSakuraTree = this.tilemap.addTilesetImage("Sakura Tree");
    this.tilesetSunset = this.tilemap.addTilesetImage(
      "SCS_Background_Sunset_01",
    );

    this.layerbackground0 = this.tilemap.createLayer("background 0", [
      this.tilesetSunset,
    ]);
    this.layerbackground1 = this.tilemap.createLayer("background 1", [
      this.tileset4,
    ]);
    this.layerbackground2 = this.tilemap.createLayer("background 2", [
      this.tileset2,
      this.tileset4,
    ]);
    this.layerbackground3 = this.tilemap.createLayer("background 3", [
      this.tileset3,
    ]);
    this.layerbackground4 = this.tilemap.createLayer("background 4", [
      this.tileset2,
      this.tileset4,
    ]);
    this.layerbackground5 = this.tilemap.createLayer("background 5", [
      this.tileset2,
      this.tileset4,this.load.image("punch1", "NES_Vigilante_Punch_1.png");
      this.tileset6,
      this.tilesetSakuraTree,
      this.tilesetHouses1,
      this.tilesetHouseOutside,
      this.tilesetHouseInside,
    ]);
    this.layercasas = this.tilemap.createLayer("casas", [
      this.tilesetHouseOutside,
      this.tilesetHouseInside,
      this.tilesetHouded2,
      this.tilesetHouses1,
      this.tilesetHouses,
      this.tilesetHouses2,
    ]);
    this.layerMarquinhosDojo = this.tilemap.createLayer("marquinhosa dojo", [
      this.tilesetArc,
    ]);
    this.layerrua = this.tilemap.createLayer("rua", [this.tilesetRoadLamps]);
    this.layerobjetos = this.tilemap.createLayer("objetos", [this.tilesetArc]);

    this.player = this.physics.add.sprite(150, 656, "vigilant_idle", 0);

    this.player.setScale(4, 5);
    this.player.setOrigin(0.5, 1);

    // Ajuste de corpo físico para beat’em-up (2D top-down na rua)
    this.player.body.setSize(10, 20);
    this.player.body.setOffset(3, 12);
    this.player.setBounce(0.1);
    this.physics.world.gravity.y = 0;
    this.player.body.setAllowGravity(false);
    this.player.setCollideWorldBounds(true);

    this.player.lastStreetPosition = { x: 150, y: 656 };

    // Linha limite horizontal fixa (onde começa a calçada da rua)
    this.limitLineY = this.player.y - 40;

    // Desenhar linha para visualização da barreira
    this.limitLine = this.add.graphics();
    //this.limitLine.lineStyle(2, 0xff00ff, 1);
    this.limitLine.beginPath();
    this.limitLine.moveTo(0, this.limitLineY);
    this.limitLine.lineTo(this.tilemap.widthInPixels, this.limitLineY);
    this.limitLine.closePath();
    this.limitLine.strokePath();

    this.anims.create({
      key: "standing-still",
      frames: this.anims.generateFrameNumbers("vigilant_idle", {
        start: 0,
        end: 3,
      }),
      frameRate: 5,
      repeat: -1,
    });

    this.anims.create({
      key: "idle-frame0",
      frames: [{ key: "vigilant_idle", frame: 0 }],
      frameRate: 1,
      repeat: 0,
    });

    this.anims.create({
      key: "running",
      frames: this.anims.generateFrameNumbers("vigilant_run", {
        start: 0,
        end: 3,
      }),
      frameRate: 10,
      repeat: -1,
    });

    // Punch animation
    this.anims.create({
      key: "punching",
      frames: [
        { key: "punch1", frame: 0 },
        { key: "punch2", frame: 0 },
        { key: "vigilant_idle", frame: 0 },
      ],
      frameRate: 10,
      repeat: 0,
      onComplete: () => {
        this.player.anims.play("idle-frame0", true);
      },
    });

    // Kick animation
    this.anims.create({
      key: "kicking",
      frames: [
        { key: "kick1", frame: 0 },
        { key: "kick2", frame: 0 },
        { key: "vigilant_idle", frame: 0 },
      ],
      frameRate: 10,
      repeat: 0,
      onComplete: () => {
        this.player.anims.play("idle-frame0", true);
      },
    });

    this.anims.create({
      key: "enemy-still",
      frames: this.anims.generateFrameNumbers("enemy", {
        start: 0,
        end: 5,
      }),
      frameRate: 5,
      repeat: -1,
    });

    this.anims.create({
      key: "enemy-running",
      frames: this.anims.generateFrameNumbers("enemy", {
        start: 6,
        end: 12,
      }),
      frameRate: 5,
      repeat: -1,
    });

this.anims.create({
      key: "enemy-attack",
      frames: this.anims.generateFrameNumbers("enemy", {
        start: 13,
        end: 20,
      }),
      frameRate: 5,
      repeat: -1,
    });

   this.anims.create({
      key: "enemy-death",
      frames: this.anims.generateFrameNumbers("enemy", {
        start: 21,
        end: 26,
      }),
      frameRate: 5,
      repeat: -1,
    });

    this.physics.world.setBounds(
      0,
      0,
      this.tilemap.widthInPixels,
      this.tilemap.heightInPixels,
    );
    this.cameras.main.setBounds(
      0,
      0,
      this.tilemap.widthInPixels,
      this.tilemap.heightInPixels,
    );
    this.cameras.main.startFollow(this.player);
    this.cameras.main.setZoom(0.5);

    this.player.setCollideWorldBounds(true);

    this.layercasas.setCollisionByProperty({ collides: true });
    this.physics.add.collider(this.player, this.layercasas);

    this.layerMarquinhosDojo.setCollisionByProperty({ collides: true });
    this.physics.add.collider(this.player, this.layerMarquinhosDojo);

    this.layerrua.setCollisionByProperty({ collides: true });
    this.physics.add.collider(this.player, this.layerrua);

    this.joystick = this.plugins.get("rexvirtualjoystickplugin").add(this, {
      x: -30,
      y: 480,
      radius: 50,
      base: this.add.circle(0, 0, 80, 0xcccccc),
      thumb: this.add.circle(0, 0, 35, 0x666666),
    });

    this.joystick.on("update", () => {
      const angle = Phaser.Math.DegToRad(this.joystick.angle);
      const force = this.joystick.force;

      if (force > this.threshold) {
        const dir = new Phaser.Math.Vector2(
          Math.cos(angle),
          Math.sin(angle),
        ).normalize();

        const speed = 200;
        const vx = dir.x * speed;
        const vy = dir.y * speed;

        this.player.setVelocity(vx, vy);

        if (vx < 0) this.player.flipX = true;
        else if (vx > 0) this.player.flipX = false;

        this.player.anims.play("running", true);
      } else {
        this.player.setVelocity(0, 0);
        this.player.anims.play("standing-still", true);
      }
    });

    // Punch button
    this.punchButton = this.add
      .image(980, 400, "botaosoco")
      .setScale(0.6)
      .setInteractive()
      .on("pointerdown", () => {
        this.punchButton.setTint(0xcccccc);
        if (
          !this.player.anims.isPlaying ||
          this.player.anims.currentAnim.key !== "running"
        ) {
          this.player.setVelocity(0);
          this.player.anims.play("punching", true);
        }
      })
      .on("pointerup", () => {
        this.punchButton.clearTint();
      })
      .setScrollFactor(0)
      .setDepth(10);

    // Kick button
    this.kickButton = this.add
      .image(880, 520, "botaochute")
      .setScale(0.6)
      .setInteractive()
      .on("pointerdown", () => {
        this.kickButton.setTint(0xcccccc);
        if (
          !this.player.anims.isPlaying ||
          this.player.anims.currentAnim.key !== "running"
        ) {
          this.player.setVelocity(0);
          this.player.anims.play("kicking", true);
        }
      })
      .on("pointerup", () => {
        this.kickButton.clearTint();
      })
      .setScrollFactor(0)
      .setDepth(10);
  }

  update() {
    // Impede que o jogador passe acima da linha limite horizontal
    if (this.player.y < this.limitLineY) {
      this.player.y = this.limitLineY;
      this.player.body.velocity.y = Math.max(0, this.player.body.velocity.y);
      this.player.body.blocked.up = true;
      this.player.body.blocked.down = false;
    }

    if (
      this.player.body.velocity.x === 0 &&
      this.player.body.velocity.y === 0 &&
      (this.player.body.blocked.down || this.player.body.blocked.up) &&
      this.player.anims.currentAnim &&
      this.player.anims.currentAnim.key !== "punching" &&
      this.player.anims.currentAnim.key !== "kicking" &&
      this.player.anims.currentAnim.key !== "idle-frame0"
    ) {
      this.player.anims.play("standing-still", true);
    }
  }

  jump(player, gravity) {
    player.body.setAllowGravity(true);
    player.setVelocityY(-300);
    player.anims.play("jumping", true);

    this.time.delayedCall(500, () => {
      player.body.setAllowGravity(false);
      player.body.velocity.y = 0;
      player.anims.play("standing-still", true);
    });
  }
}

export default scene0;
