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

    this.load.image("House Inside", "House_Inside.png");

    this.load.image("House Outside", "House_Outside.png");

    this.load.image("houses", "houses.png");

    this.load.image("houses1", "houses1.png");

    this.load.image("houses2", "houses2.png");

    this.load.image("road&lamps", "road&lamps.png");

    this.load.image("Sakura Tree", "Sakura_Tree.gif");

    this.load.image("SCS_Background_Sunset_01", "SCS_Background_Sunset_01.png");
    this.load.spritesheet("vigilant_idle", "NES_Vigilante_Idle_1_strip4.png", {
      frameWidth: 16,
      frameHeight: 32,
    });
    this.load.spritesheet("vigilant_run", "NES_Vigilante_Run_strip4.png", {
      frameWidth: 16,
      frameHeight: 32,
    });
    this.load.spritesheet(
      "vigilant_jump",
      "NES_Vigilante_Jump_Kick_strip4.png",
      {
        frameWidth: 16,
        frameHeight: 16,
      },
    );
    // Punch sprites
    this.load.image("punch1", "NES_Vigilante_Punch_1.png");
    this.load.image("punch2", "NES_Vigilante_Punch_2.png");
    // Kick sprites
    this.load.image("kick1", "NES_Vigilante_Kick_1.png");
    this.load.image("kick2", "NES_Vigilante_Kick_2.png");
    this.load.spritesheet("buttons", "buttons.png", {
      frameWidth: 32,
      frameHeight: 32,
    });

    // this.load.audio("music", "music.mp3");
    // this.load.audio("laser", "laser.mp3");

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
      this.tileset4,
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

    // Removed collision from background layers to allow movement
    // this.layerbackground0.setCollisionByProperty({ collides: true });
    // this.layerbackground1.setCollisionByProperty({ collides: true });
    // this.layerbackground2.setCollisionByProperty({ collides: true });
    // this.layerbackground3.setCollisionByProperty({ collides: true });
    // this.layerbackground4.setCollisionByProperty({ collides: true });
    // this.layerbackground5.setCollisionByProperty({ collides: true });

    // this.physics.add.collider(this.player, this.layerbackground0);
    // this.physics.add.collider(this.player, this.layerbackground1);
    // this.physics.add.collider(this.player, this.layerbackground2);
    // this.physics.add.collider(this.player, this.layerbackground3);
    // this.physics.add.collider(this.player, this.layerbackground4);
    // this.physics.add.collider(this.player, this.layerbackground5);

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
      key: "running",
      frames: this.anims.generateFrameNumbers("vigilant_run", {
        start: 0,
        end: 3,
      }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "jumping",
      frames: this.anims.generateFrameNumbers("vigilant_jump", {
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
      ],
      frameRate: 10,
      repeat: 0,
      onComplete: () => {
        this.player.anims.play("standing-still", true);
      }
    });

    // Kick animation
    this.anims.create({
      key: "kicking",
      frames: [
        { key: "kick1", frame: 0 },
        { key: "kick2", frame: 0 },
      ],
      frameRate: 10,
      repeat: 0,
      onComplete: () => {
        this.player.anims.play("standing-still", true);
      }
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

    // this.layerWallsUnder.setCollisionByProperty({ collides: true });
    // this.physics.add.collider(this.player, this.layerWallsUnder);

    // this.layerWallsOver.setCollisionByProperty({ collides: true });
    // this.physics.add.collider(this.player, this.layerWallsOver);

    // this.layerLamps.setCollisionByProperty({ collides: true });
    // this.physics.add.collider(this.player, this.layerLamps);

    // this.layerPlatform.setCollisionByProperty({ collides: true });
    // this.physics.add.collider(this.player, this.layerPlatform);
    // this.layerPlatform.forEachTile((tile) => {
    //   if (tile.properties.collides) {
    //     // left, right, up, down
    //     tile.setCollision(false, false, true, false);
    //   }
    // });

    // this.music = this.sound.add("music", { loop: true }).play();

    // this.laser = this.sound.add("laser");

    this.joystick = this.plugins.get("rexvirtualjoystickplugin").add(this, {
      x: 100,
      y: 350,
      radius: 50,
      base: this.add.circle(0, 0, 50, 0xcccccc),
      thumb: this.add.circle(0, 0, 25, 0x666666),
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

    this.changeGravityButton = this.add
      .sprite(700, 400, "buttons", 0)
      .setInteractive()
      .on("pointerdown", () => {
        this.changeGravityButton.setFrame(1);
        this.physics.world.gravity.y *= -1;
        this.player.setFlipY(this.physics.world.gravity.y < 0);
      })
      .on("pointerup", () => {
        this.changeGravityButton.setFrame(0);
      })
      .setScrollFactor(0);

    this.jumpButton = this.add
      .sprite(750, 400, "buttons", 8)
      .setInteractive()
      .on("pointerdown", () => {
        this.jumpButton.setFrame(9);
        this.jump(this.player, this.physics.world.gravity.y);
      })
      .on("pointerup", () => {
        this.jumpButton.setFrame(8);
      })
      .setScrollFactor(0);

    // Punch button
    this.punchButton = this.add
      .sprite(600, 400, "buttons", 2) // Assume frame 2/3 for punch (A button style)
      .setInteractive()
      .on("pointerdown", () => {
        this.punchButton.setFrame(3);
        if (!this.player.anims.isPlaying || this.player.anims.currentAnim.key !== 'running') {
          this.player.setVelocity(0);
          this.player.anims.play('punching', true);
        }
      })
      .on("pointerup", () => {
        this.punchButton.setFrame(2);
      })
      .setScrollFactor(0);

    // Kick button
    this.kickButton = this.add
      .sprite(650, 400, "buttons", 4) // Assume frame 4/5 for kick (B button style)
      .setInteractive()
      .on("pointerdown", () => {
        this.kickButton.setFrame(5);
        if (!this.player.anims.isPlaying || this.player.anims.currentAnim.key !== 'running') {
          this.player.setVelocity(0);
          this.player.anims.play('kicking', true);
        }
      })
      .on("pointerup", () => {
        this.kickButton.setFrame(4);
      })
      .setScrollFactor(0);
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
      (this.player.body.blocked.down || this.player.body.blocked.up)
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
