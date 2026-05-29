class scene0 extends Phaser.Scene {
  constructor() {
    super("scene0");

    this.threshold = 0.1;
    this.speed = 100;
    this.direction = undefined;
    this.remotePlayers = [];

    // ── Divisão do mapa em 5 seções ──────────────────────────
    this.mapSections = [
      { start: 0, end: 1152 },
      { start: 1152, end: 2304 },
      { start: 2304, end: 3456 },
      { start: 3456, end: 4608 },
      { start: 4608, end: 5760 },
    ];

    // ── Configuração das waves (5 seções × 3 ordas) ──────────
    this.waveConfig = [
      // Wave 1 – Seção 0
      {
        section: 0,
        hordes: [
          [
            { x: 300, y: 650, type: "normal" },
            { x: 500, y: 650, type: "normal" },
          ],
          [
            { x: 400, y: 645, type: "normal" },
            { x: 600, y: 650, type: "normal" },
            { x: 800, y: 645, type: "normal" },
          ],
          [
            { x: 300, y: 650, type: "fast" },
            { x: 550, y: 645, type: "normal" },
          ],
          [
            { x: 400, y: 650, type: "normal" },
            { x: 600, y: 645, type: "fast" },
            { x: 800, y: 650, type: "normal" },
          ],
          [
            { x: 350, y: 650, type: "fast" },
            { x: 550, y: 645, type: "fast" },
            { x: 750, y: 650, type: "normal" },
          ],
          [
            { x: 300, y: 650, type: "normal" },
            { x: 500, y: 645, type: "normal" },
            { x: 700, y: 650, type: "normal" },
            { x: 900, y: 645, type: "normal" },
          ],
          [
            { x: 400, y: 650, type: "fast" },
            { x: 600, y: 645, type: "normal" },
            { x: 800, y: 650, type: "fast" },
          ],
          [
            { x: 300, y: 650, type: "tank" },
            { x: 600, y: 645, type: "normal" },
            { x: 900, y: 650, type: "normal" },
          ],
          [
            { x: 400, y: 650, type: "fast" },
            { x: 600, y: 645, type: "tank" },
            { x: 800, y: 650, type: "fast" },
          ],
          [{ x: 576, y: 650, type: "miniboss" }], // MINI BOSS
        ],
      },
      // Wave 2 – Seção 1
      {
        section: 1,
        hordes: [
          [
            { x: 1400, y: 650, type: "normal" },
            { x: 1600, y: 650, type: "normal" },
            { x: 1800, y: 645, type: "normal" },
          ],
          [
            { x: 1300, y: 650, type: "fast" },
            { x: 1550, y: 645, type: "normal" },
            { x: 1750, y: 650, type: "fast" },
          ],
          [
            { x: 1400, y: 650, type: "normal" },
            { x: 1600, y: 645, type: "normal" },
            { x: 1800, y: 650, type: "normal" },
            { x: 2000, y: 645, type: "normal" },
          ],
          [
            { x: 1350, y: 650, type: "fast" },
            { x: 1600, y: 645, type: "fast" },
            { x: 1850, y: 650, type: "normal" },
          ],
          [
            { x: 1400, y: 650, type: "tank" },
            { x: 1700, y: 645, type: "normal" },
            { x: 1900, y: 650, type: "normal" },
          ],
          [
            { x: 1300, y: 650, type: "normal" },
            { x: 1500, y: 645, type: "fast" },
            { x: 1700, y: 650, type: "normal" },
            { x: 1900, y: 645, type: "fast" },
          ],
          [
            { x: 1400, y: 650, type: "fast" },
            { x: 1600, y: 645, type: "tank" },
            { x: 1800, y: 650, type: "fast" },
          ],
          [
            { x: 1300, y: 650, type: "normal" },
            { x: 1550, y: 645, type: "normal" },
            { x: 1750, y: 650, type: "tank" },
            { x: 1950, y: 645, type: "normal" },
          ],
          [
            { x: 1400, y: 650, type: "fast" },
            { x: 1600, y: 645, type: "fast" },
            { x: 1800, y: 650, type: "tank" },
          ],
          [{ x: 1728, y: 650, type: "miniboss" }], // MINI BOSS
        ],
      },
      // Wave 3 – Seção 2
      {
        section: 2,
        hordes: [
          [
            { x: 2500, y: 650, type: "normal" },
            { x: 2700, y: 645, type: "normal" },
            { x: 2900, y: 650, type: "normal" },
          ],
          [
            { x: 2400, y: 650, type: "fast" },
            { x: 2650, y: 645, type: "normal" },
            { x: 2850, y: 650, type: "fast" },
          ],
          [
            { x: 2500, y: 650, type: "normal" },
            { x: 2700, y: 645, type: "fast" },
            { x: 2900, y: 650, type: "normal" },
            { x: 3050, y: 645, type: "normal" },
          ],
          [
            { x: 2450, y: 650, type: "tank" },
            { x: 2700, y: 645, type: "normal" },
            { x: 2900, y: 650, type: "normal" },
          ],
          [
            { x: 2500, y: 650, type: "fast" },
            { x: 2700, y: 645, type: "fast" },
            { x: 2900, y: 650, type: "fast" },
          ],
          [
            { x: 2400, y: 650, type: "normal" },
            { x: 2600, y: 645, type: "normal" },
            { x: 2800, y: 650, type: "tank" },
            { x: 3000, y: 645, type: "normal" },
          ],
          [
            { x: 2500, y: 650, type: "fast" },
            { x: 2700, y: 645, type: "tank" },
            { x: 2900, y: 650, type: "fast" },
          ],
          [
            { x: 2400, y: 650, type: "normal" },
            { x: 2650, y: 645, type: "fast" },
            { x: 2850, y: 650, type: "normal" },
            { x: 3050, y: 645, type: "fast" },
          ],
          [
            { x: 2500, y: 650, type: "tank" },
            { x: 2750, y: 645, type: "fast" },
            { x: 2950, y: 650, type: "tank" },
          ],
          [{ x: 2880, y: 650, type: "miniboss" }], // MINI BOSS
        ],
      },
      // Wave 4 – Seção 3
      {
        section: 3,
        hordes: [
          [
            { x: 3600, y: 650, type: "normal" },
            { x: 3800, y: 645, type: "normal" },
            { x: 4000, y: 650, type: "normal" },
          ],
          [
            { x: 3500, y: 650, type: "fast" },
            { x: 3750, y: 645, type: "normal" },
            { x: 3950, y: 650, type: "fast" },
          ],
          [
            { x: 3600, y: 650, type: "normal" },
            { x: 3800, y: 645, type: "fast" },
            { x: 4000, y: 650, type: "normal" },
            { x: 4150, y: 645, type: "normal" },
          ],
          [
            { x: 3550, y: 650, type: "tank" },
            { x: 3800, y: 645, type: "fast" },
            { x: 4000, y: 650, type: "normal" },
          ],
          [
            { x: 3600, y: 650, type: "fast" },
            { x: 3800, y: 645, type: "fast" },
            { x: 4000, y: 650, type: "fast" },
            { x: 4200, y: 645, type: "fast" },
          ],
          [
            { x: 3500, y: 650, type: "normal" },
            { x: 3700, y: 645, type: "tank" },
            { x: 3900, y: 650, type: "normal" },
            { x: 4100, y: 645, type: "normal" },
          ],
          [
            { x: 3600, y: 650, type: "fast" },
            { x: 3800, y: 645, type: "tank" },
            { x: 4000, y: 650, type: "fast" },
          ],
          [
            { x: 3500, y: 650, type: "tank" },
            { x: 3750, y: 645, type: "normal" },
            { x: 3950, y: 650, type: "tank" },
          ],
          [
            { x: 3600, y: 650, type: "fast" },
            { x: 3800, y: 645, type: "fast" },
            { x: 4000, y: 650, type: "tank" },
            { x: 4200, y: 645, type: "fast" },
          ],
          [{ x: 4032, y: 650, type: "miniboss" }], // MINI BOSS
        ],
      },
      // Wave 5 – Seção 4
      {
        section: 4,
        hordes: [
          [
            { x: 4700, y: 650, type: "normal" },
            { x: 4900, y: 645, type: "normal" },
            { x: 5100, y: 650, type: "normal" },
          ],
          [
            { x: 4600, y: 650, type: "fast" },
            { x: 4850, y: 645, type: "normal" },
            { x: 5050, y: 650, type: "fast" },
          ],
          [
            { x: 4700, y: 650, type: "normal" },
            { x: 4900, y: 645, type: "fast" },
            { x: 5100, y: 650, type: "normal" },
            { x: 5300, y: 645, type: "normal" },
          ],
          [
            { x: 4650, y: 650, type: "tank" },
            { x: 4900, y: 645, type: "fast" },
            { x: 5100, y: 650, type: "normal" },
          ],
          [
            { x: 4700, y: 650, type: "fast" },
            { x: 4900, y: 645, type: "fast" },
            { x: 5100, y: 650, type: "fast" },
            { x: 5300, y: 645, type: "fast" },
          ],
          [
            { x: 4600, y: 650, type: "normal" },
            { x: 4800, y: 645, type: "tank" },
            { x: 5000, y: 650, type: "normal" },
            { x: 5200, y: 645, type: "normal" },
          ],
          [
            { x: 4700, y: 650, type: "fast" },
            { x: 4900, y: 645, type: "tank" },
            { x: 5100, y: 650, type: "fast" },
          ],
          [
            { x: 4600, y: 650, type: "tank" },
            { x: 4850, y: 645, type: "fast" },
            { x: 5050, y: 650, type: "tank" },
          ],
          [
            { x: 4700, y: 650, type: "fast" },
            { x: 4900, y: 645, type: "tank" },
            { x: 5100, y: 650, type: "fast" },
            { x: 5300, y: 645, type: "tank" },
          ],
          [{ x: 5184, y: 650, type: "miniboss" }], // MINI BOSS
        ],
      },
    ];
    // ── Estado da wave ────────────────────────────────────────
    this.currentWave = 0;
    this.currentHorde = 0;
    this.waveActive = false;
    this.hordeActive = false;
    this.waveCleared = false;
    this.cameraLocked = false;
    this._transitioningWave = false; // [FIX 5] guard contra pular wave

    // ── Sistema de vida do player ─────────────────────────
    this.localPlayerTotalLives = 3;
    this.localPlayerLives = 3;
    // cada vida tem 4 estágios (1/4 perdido por hit)
    this.localPlayerHitsPerLife = 4;
    this.localPlayerHits = 0;
    this.localPlayerDead = false;
  }

  _getLocalPlayerPrefix() {
    const playerKey =
      this.localPlayer && this.localPlayer.texture
        ? this.localPlayer.texture.key
        : this.game.localPlayer;
    return playerKey && playerKey.startsWith("sergio")
      ? "sergio"
      : "marquinhos";
  }

  _getLocalPlayerAnimKey(action) {
    return `${this._getLocalPlayerPrefix()}-${action}`;
  }

  // ─────────────────────────────────────────────────────────────
  create() {
    // ── Tilemap ──────────────────────────────────────────────
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

    // [FIX 2] punch/kick carregados aqui, não em create()
    this.tilemap.createLayer("background 0", [this.tilesetSunset]);
    this.tilemap.createLayer("background 1", [this.tileset4]);
    this.tilemap.createLayer("background 2", [this.tileset2, this.tileset4]);
    this.tilemap.createLayer("background 3", [this.tileset3]);
    this.tilemap.createLayer("background 4", [this.tileset2, this.tileset4]);

    // [FIX 2] load.image() removido daqui
    this.tilemap.createLayer("background 5", [
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

    // ── Player ───────────────────────────────────────────────
    this.localPlayer = this.physics.add.sprite(
      150,
      656,
      this.game.localPlayer + "_idle",
      0,
    );
    this.localPlayer.setScale(4.5);
    this.localPlayer.setOrigin(0.5, 1);
    this.localPlayer.body.setSize(15, 30);
    this.localPlayer.body.setOffset(1, 1);
    this.localPlayer.setBounce(0);
    this.physics.world.gravity.y = 0;
    this.localPlayer.body.setAllowGravity(false);
    this.localPlayer.setCollideWorldBounds(true);
    this.localPlayer.lastStreetPosition = { x: 150, y: 656 };
    this.limitLineY = this.localPlayer.y - 40;

    // Desenhar linha para visualização da barreira
    this.limitLine = this.add.graphics();
    this.limitLine.beginPath();
    this.limitLine.moveTo(0, this.limitLineY);
    this.limitLine.lineTo(this.tilemap.widthInPixels, this.limitLineY);
    this.limitLine.closePath();
    this.limitLine.strokePath();

    // ── Animações do segio ──────────────────────────────────
    this.anims.create({
      key: "sergio-standing-still",
      frames: this.anims.generateFrameNumbers("sergio_idle", {
        start: 0,
        end: 3,
      }),
      frameRate: 6,
      repeat: -1,
    });
    this.anims.create({
      key: "sergio-idle-frame0",
      frames: [{ key: "sergio_idle", frame: 0 }],
      frameRate: 1,
      repeat: 0,
    });
    this.anims.create({
      key: "sergio-running",
      frames: this.anims.generateFrameNumbers("sergio_run", {
        start: 0,
        end: 3,
      }),
      frameRate: 10,
      repeat: -1,
    });
    this.anims.create({
      key: "sergio-punching",
      frames: [
        { key: "sergio_punch1", frame: 0 },
        { key: "sergio_punch1", frame: 1 },
        { key: "sergio_punch2", frame: 0 },
        { key: "sergio_punch2", frame: 1 },
        { key: "sergio_idle", frame: 0 },
      ],
      frameRate: 10,
      repeat: 0,
      onComplete: () =>
        this.localPlayer.anims.play(
          this._getLocalPlayerAnimKey("idle-frame0"),
          true,
        ),
    });
    this.anims.create({
      key: "sergio-kicking",
      frames: [
        { key: "sergio_kick1", frame: 0 },
        { key: "sergio_kick1", frame: 1 },
        { key: "sergio_idle", frame: 0 },
      ],
      frameRate: 12,
      repeat: 0,
      onComplete: () =>
        this.localPlayer.anims.play(
          this._getLocalPlayerAnimKey("idle-frame0"),
          true,
        ),
    });

    // ── Animações do marquinhos ──────────────────────────────────
    this.anims.create({
      key: "marquinhos-standing-still",
      frames: this.anims.generateFrameNumbers("marquinhos_idle", {
        start: 0,
        end: 3,
      }),
      frameRate: 6,
      repeat: -1,
    });
    this.anims.create({
      key: "marquinhos-idle-frame0",
      frames: [{ key: "marquinhos_idle", frame: 0 }],
      frameRate: 1,
      repeat: 0,
    });
    this.anims.create({
      key: "marquinhos-running",
      frames: this.anims.generateFrameNumbers("marquinhos_run", {
        start: 0,
        end: 3,
      }),
      frameRate: 10,
      repeat: -1,
    });
    this.anims.create({
      key: "marquinhos-punching",
      frames: [
        { key: "marquinhos_punch1", frame: 0 },
        { key: "marquinhos_punch1", frame: 1 },
        { key: "marquinhos_punch2", frame: 0 },
        { key: "marquinhos_punch2", frame: 1 },
        { key: "marquinhos_idle", frame: 0 },
      ],
      frameRate: 10,
      repeat: 0,
      onComplete: () =>
        this.localPlayer.anims.play(
          this._getLocalPlayerAnimKey("idle-frame0"),
          true,
        ),
    });
    this.anims.create({
      key: "marquinhos-kicking",
      frames: [
        { key: "marquinhos_kick1", frame: 0 },
        { key: "marquinhos_kick1", frame: 1 },
        { key: "marquinhos_idle", frame: 0 },
      ],
      frameRate: 12,
      repeat: 0,
      onComplete: () =>
        this.localPlayer.anims.play(
          this._getLocalPlayerAnimKey("idle-frame0"),
          true,
        ),
    });

    // ── Animações do inimigo ─────────────────────────────────

    this.anims.create({
      key: "enemy_idle",
      frames: this.anims.generateFrameNumbers("enemy", { start: 0, end: 5 }),
      frameRate: 8,
      repeat: -1,
    });
    this.anims.create({
      key: "enemy_run",
      frames: this.anims.generateFrameNumbers("enemy", { start: 6, end: 14 }),
      frameRate: 10,
      repeat: -1,
    });
    // Ataque: frames 15-22 formam UMA animação completa
    // 15-18 = efeito do golpe (slash), 19-22 = personagem avança/recua

    this.anims.create({
      key: "enemy_attack",
      frames: this.anims.generateFrameNumbers("enemy", { start: 15, end: 22 }),
      frameRate: 8,
      repeat: 0,
    });

    this.anims.create({
      key: "enemy_death",
      frames: this.anims.generateFrameNumbers("enemy", { start: 23, end: 27 }),
      frameRate: 8,
      repeat: 0,
    });

    // ── Animações dos corações ────────────────────────────────

    this.anims.create({
      key: "heart_full",
      frames: [{ key: "hud_coracao", frame: 0 }],
      frameRate: 1,
      repeat: 0,
    });
    this.anims.create({
      key: "heart_hit1",
      frames: [{ key: "hud_coracao", frame: 3 }],
      frameRate: 1,
      repeat: 0,
    });
    this.anims.create({
      key: "heart_hit2",
      frames: [{ key: "hud_coracao", frame: 2 }],
      frameRate: 1,
      repeat: 0,
    });
    this.anims.create({
      key: "heart_empty",
      frames: [{ key: "hud_coracao", frame: 1 }],
      frameRate: 1,
      repeat: 0,
    });

    // Animação de pulso ao levar hit (frames 0→1 rápido, volta)
    this.anims.create({
      key: "heart_damage",
      frames: this.anims.generateFrameNumbers("hud_coracao", {
        start: 0,
        end: 3,
      }),
      frameRate: 12, // ← velocidade da transição ao tomar dano
      repeat: 0,
    });

    // ── Grupo de inimigos ────────────────────────────────────
    this.enemies = this.physics.add.group();

    // ── Spawn de inimigo ─────────────────────────────────────
    this.spawnEnemy = (x, y, type = "normal") => {
      const enemy = this.enemies.create(x, y, "enemy");
      enemy.setOrigin(0.5, 0.61);
      enemy.body.setSize(23, 31);
      enemy.body.setOffset(76, 21);
      enemy.setCollideWorldBounds(true);

      const stats = {
        normal: { scale: 4, health: 3, speed: 80, damage: 1, tint: 0xffffff },
        fast: { scale: 4, health: 2, speed: 140, damage: 1, tint: 0x88ff88 }, 
        tank: { scale: 4, health: 6, speed: 50, damage: 2, tint: 0x6699ff },
        miniboss: {scale: 5.5,health: 20,speed: 55,damage: 3,tint: 0xff2222,}, 
      };
      const s = stats[type] || stats.normal;

      enemy.setScale(s.scale);
      enemy.setTint(s.tint);
      enemy.health = s.health;
      enemy.maxHealth = s.health;
      enemy.speed = s.speed;
      enemy.damage = s.damage;
      enemy.type = type;
      enemy.state = "idle";
      enemy._dying = false; // [FIX 3] flag de morte em andamento
      enemy._knockbackTimer = 0;

      enemy.anims.play("enemy_idle");

      enemy.body.setImmovable(false);

      return enemy;
    };

    this.physics.add.overlap(this.localPlayer, this.enemies, () => {
      // Separa o player do inimigo manualmente sem aplicar força
      this.enemies.children.iterate((enemy) => {
        if (!enemy || !enemy.active || enemy._dying) return;
        const dist = Phaser.Math.Distance.Between(
          this.localPlayer.x,
          this.localPlayer.y,
          enemy.x,
          enemy.y,
        );
        if (dist < 40) {
          const angle = Phaser.Math.Angle.Between(
            enemy.x,
            enemy.y,
            this.localPlayer.x,
            this.localPlayer.y,
          );
          this.localPlayer.x += Math.cos(angle) * 2;
          this.localPlayer.y += Math.sin(angle) * 2;
        }
      });
    });
    // ── Câmera & mundo ───────────────────────────────────────
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
    this.cameras.main.startFollow(this.localPlayer);
    this.cameras.main.setZoom(0.5);

    // ── Colisões tilemap ─────────────────────────────────────
    this.layercasas.setCollisionByProperty({ collides: true });
    this.physics.add.collider(this.localPlayer, this.layercasas);
    this.layerMarquinhosDojo.setCollisionByProperty({ collides: true });
    this.physics.add.collider(this.localPlayer, this.layerMarquinhosDojo);
    this.layerrua.setCollisionByProperty({ collides: true });
    this.physics.add.collider(this.localPlayer, this.layerrua);

    // ── Joystick ─────────────────────────────────────────────
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
        let vx = dir.x * 200;
        const vy = dir.y * 200;

        if (
          this.waveActive &&
          this.waveLeftBound !== undefined &&
          this.waveRightBound !== undefined
        ) {
          if (vx > 0 && this.localPlayer.x >= this.waveRightBound) vx = 0;
          if (vx < 0 && this.localPlayer.x <= this.waveLeftBound) vx = 0;
        }

        this.localPlayer.setVelocity(vx, vy);
        if (vx < 0) this.localPlayer.flipX = true;
        else if (vx > 0) this.localPlayer.flipX = false;
        this.localPlayer.anims.play(
          this._getLocalPlayerAnimKey("running"),
          true,
        );
      } else {
        this.localPlayer.setVelocity(0, 0);
        this.localPlayer.anims.play(
          this._getLocalPlayerAnimKey("standing-still"),
          true,
        );
      }
    });

    // ── Botão soco ───────────────────────────────────────────
    this.punchButton = this.add
      .image(980, 400, "botaosoco")
      .setScale(0.6)
      .setInteractive()
      .on("pointerdown", () => {
        this.punchButton.setTint(0xcccccc);
        if (
          !this.localPlayer.anims.isPlaying ||
          this.localPlayer.anims.currentAnim.key !==
            this._getLocalPlayerAnimKey("running")
        ) {
          this.localPlayer.setVelocity(0);
          this.localPlayer.anims.play(
            this._getLocalPlayerAnimKey("punching"),
            true,
          );
        }
        this._dealDamage(60, 1, 150);
      })
      .on("pointerup", () => this.punchButton.clearTint())
      .setScrollFactor(0)
      .setDepth(10);

    // ── Botão chute ──────────────────────────────────────────
    this.kickButton = this.add
      .image(880, 520, "botaochute")
      .setScale(0.6)
      .setInteractive()
      .on("pointerdown", () => {
        this.kickButton.setTint(0xcccccc);
        if (
          !this.localPlayer.anims.isPlaying ||
          this.localPlayer.anims.currentAnim.key !==
            this._getLocalPlayerAnimKey("running")
        ) {
          this.localPlayer.setVelocity(0);
          this.localPlayer.anims.play(
            this._getLocalPlayerAnimKey("kicking"),
            true,
          );
          this._dealDamage(80, 2, 200);
        }
      })
      .on("pointerup", () => this.kickButton.clearTint())
      .setScrollFactor(0)
      .setDepth(10);

    // ── HUD ──────────────────────────────────────────────────
    this._buildWaveHUD();
    this._buildPlayerHUD();

    // ── Inicia primeira wave ─────────────────────────────────
    this.time.delayedCall(800, () => this._startWave(0));

    this.game.socket.on("scene0", (state) => {
      if (state.player) {
        try {
          if (state.player.id === this.game.socket.id) return;

          let remotePlayer = this.remotePlayers.find(
            (p) => p.id === state.player.id,
          );

          if (!remotePlayer) {
            const remoteTexture =
              this.game.localPlayer === "sergio"
                ? "marquinhos_idle"
                : "sergio_idle";

            const sprite = this.add.sprite(
              state.player.x,
              state.player.y,
              remoteTexture,
              0,
            );

            sprite.setScale(4.5);
            sprite.setOrigin(0.5, 1);

            this.remotePlayers.push({
              id: state.player.id,
              sprite,
            });

            remotePlayer = this.remotePlayers.find(
              (p) => p.id === state.player.id,
            );
          }

          remotePlayer.sprite.setPosition(state.player.x, state.player.y);

          if (state.player.flipX !== undefined) {
            remotePlayer.sprite.setFlipX(state.player.flipX);
          }

          if (state.player.animation)
            remotePlayer.sprite.anims.play(state.player.animation, true);
          else if (state.player.texture)
            remotePlayer.sprite.setTexture(state.player.texture);
        } catch (e) {
          console.error("Error updating remote player:", e);
        }
      }
    });
  }

  // ═══════════════════════════════════════════════════════════
  //  WAVE SYSTEM
  // ═══════════════════════════════════════════════════════════

  /**
   * Inicia a wave de índice `index`.
   * Trava câmera no início exato da seção e começa a primeira orda.
   */
  _startWave(index) {
    if (index >= this.waveConfig.length) {
      this._onAllWavesCleared();
      return;
    }

    this.currentWave = index;
    this.currentHorde = 0;
    this.waveActive = true;
    this.waveCleared = false;
    this.cameraLocked = true;
    this._transitioningWave = false; // [FIX 5] libera guard

    const waveDef = this.waveConfig[index];
    const section = this.mapSections[waveDef.section];

    // Limites = exatamente as bordas da seção do mapa (1152px cada)
    this.waveLeftBound = section.start;
    this.waveRightBound = section.end;

    // Para o follow e trava AMBOS os eixos da câmera
    this.cameras.main.stopFollow();
    this._lockCameraX = section.start;
    this._lockCameraY = this.cameras.main.scrollY; // salva Y atual antes de travar
    this.cameras.main.scrollX = section.start;
    // scrollY não muda — câmera fica exatamente onde estava no eixo vertical

    // Banner de wave e HUD
    this._showWaveBanner(index + 1);
    this._updateWaveHUD(
      index + 1,
      this.waveConfig.length,
      1,
      waveDef.hordes.length,
    );

    // Inicia primeira orda
    this._startHorde(0);
  }

  /**
   * Inicia a orda `hordeIndex` da wave atual.
   */
  _startHorde(hordeIndex) {
    const waveDef = this.waveConfig[this.currentWave];

    if (hordeIndex >= waveDef.hordes.length) {
      this._clearWave();
      return;
    }

    this.currentHorde = hordeIndex;
    this.hordeActive = true;

    this._updateWaveHUD(
      this.currentWave + 1,
      this.waveConfig.length,
      hordeIndex + 1,
      waveDef.hordes.length,
    );

    // [FIX 9] Banner de orda animado
    this._showOrdaBanner(hordeIndex + 1, waveDef.hordes.length);

    const horde = waveDef.hordes[hordeIndex];
    horde.forEach((cfg, i) => {
      this.time.delayedCall(500 + i * 350, () => {
        // [FIX 7] verifica hordeActive antes de spawnar
        if (!this.waveActive || !this.hordeActive) return;

        const enemy = this.spawnEnemy(cfg.x, cfg.y, cfg.type);
        enemy.setAlpha(0);
        this.tweens.add({ targets: enemy, alpha: 1, duration: 200 });
      });
    });
  }

  /**
   * Chamado após cada morte de inimigo.
   * Usa flag _dying para evitar race condition com mortes simultâneas.
   */
  _onEnemyKilled() {
    if (!this.waveActive || !this.hordeActive) return;

    this.time.delayedCall(80, () => {
      // [FIX 3] conta apenas inimigos vivos E não em animação de morte
      const alive = this.enemies
        .getChildren()
        .filter((e) => e.active && !e._dying).length;

      if (alive === 0) this._clearHorde();
    });
  }

  /**
   * Orda limpa: avança para próxima orda ou encerra a wave.
   */
  _clearHorde() {
    this.hordeActive = false;

    const nextHordeIndex = this.currentHorde + 1;
    if (nextHordeIndex < this.waveConfig[this.currentWave].hordes.length) {
      this.time.delayedCall(1500, () => {
        if (this.waveActive) this._startHorde(nextHordeIndex);
      });
    } else {
      this._clearWave();
    }
  }

  /**
   * Wave limpa: flash, banner, "GO →" e retoma follow da câmera.
   */
  _clearWave() {
    this.waveActive = false;
    this.waveCleared = true;
    // Mantém cameraLocked=true até o tween começar — evita Y derivar no intervalo

    this.cameras.main.flash(500, 200, 255, 150);
    this._showClearBanner();
    this._showGoIndicator();

    // Câmera: tween suave do scrollX/Y atual até centrar no player
    // Evita o "teleporte" causado pelo startFollow instantâneo
    this.time.delayedCall(800, () => {
      // Só agora destrava — câmera estava segura até aqui
      this.cameraLocked = false;

      const zoom = this.cameras.main.zoom;
      const camW = this.cameras.main.width / zoom;
      const targetY = Phaser.Math.Clamp(
        this.localPlayer.y - camH / 2,
        0,
        this.tilemap.heightInPixels - camH,
      );

      // Tween da câmera até a posição do player antes de ligar o follow
      this.tweens.add({
        targets: this.cameras.main,
        scrollX: targetX,
        duration: 500,
        ease: "Cubic.InOut",
        onComplete: () => {
          // Só liga o follow depois do tween acabar — sem salto
          this.cameras.main.startFollow(this.localPlayer, true, 0.1, 0.1);
        },
      });
    });
  }

  /** Todas as waves concluídas. */
  _onAllWavesCleared() {
    this._showVictoryBanner();
    this.cameras.main.startFollow(this.localPlayer, true, 0.08, 0.08);
    // this.time.delayedCall(3000, () => this.scene.start("scene1"));
  }
  // ═══════════════════════════════════════════════════════════
  //  DANO
  // ═══════════════════════════════════════════════════════════

  _dealDamage(range, dmg, knockback) {
    if (!this.enemies) return;

    const punchOffsetX = this.localPlayer.flipX ? -range : range;
    const punchX = this.localPlayer.x + punchOffsetX;
    const punchY = this.localPlayer.y - 40;

    this.enemies.children.iterate((enemy) => {
      if (!enemy || !enemy.active || enemy._dying) return;

      const dist = Phaser.Math.Distance.Between(
        punchX,
        punchY,
        enemy.x,
        enemy.y,
      );
      if (dist > range) return;

      enemy.health -= dmg;

      // Flash de hit
      enemy.setTint(0xffffff);
      this.time.delayedCall(90, () => {
        if (!enemy || !enemy.active) return;
        const tint =
          enemy.type === "fast"
            ? 0xff6666
            : enemy.type === "tank"
              ? 0x6699ff
              : 0xffffff;
        enemy.setTint(tint);
      });

      // Knockback — empurra para longe do player
      const dir = enemy.x >= this.localPlayer.x ? 1 : -1;
      enemy.body.setImmovable(false);
      enemy.state = "knockback";
      enemy._knockbackTimer = 500;

      enemy.setVelocityX(knockback * dir);

      this.tweens.add({
        targets: enemy,
        x: enemy.x + knockback * dir * 0.8,
        duration: 300,
        ease: "Cubic.Out",
        onComplete: () => {
          if (enemy && enemy.active && !enemy._dying) {
            enemy.setVelocity(0, 0);
          }
        },
      });

      if (enemy.health <= 0) this._killEnemy(enemy);
    });
  }

  _killEnemy(enemy) {
    if (!enemy || !enemy.active || enemy._dying) return;

    // [FIX 3] marca como morrendo imediatamente para evitar duplo disparo
    enemy._dying = true;
    enemy.active = false;
    enemy.body.enable = false;
    enemy.setVelocity(0, 0);
    enemy.anims.play("enemy_death", true);

    this.time.delayedCall(700, () => {
      // [FIX 9] checa enemy.scene antes de destruir (evita erro se já foi removido)
      if (enemy && enemy.scene) enemy.destroy();
      this._onEnemyKilled();
    });
  }

  // ═══════════════════════════════════════════════════════════
  //  HUD
  // ═══════════════════════════════════════════════════════════

  _buildPlayerHUD() {
    const slotSize = 80;
    const slotX = -310;
    const slotY = -200;
    const heartScale = 4;
    const heartSpacing = 32;

    // Slot circular no canto superior esquerdo da tela
    this.hudSlot = this.add
      .image(slotX + slotSize / 2, slotY + slotSize / 2, "hud_slot")
      .setDisplaySize(slotSize, slotSize)
      .setOrigin(0.5, 0.5)
      .setScrollFactor(0)
      .setDepth(100);

    this.hudRosto = this.add
      .image(slotX + slotSize / 2, slotY + slotSize / 2, "hud_rosto")
      .setDisplaySize(slotSize * 2, slotSize * 2)
      .setOrigin(0.5, 0.5)
      .setScrollFactor(0)
      .setDepth(101);

    // Corações ao lado do slot, alinhados verticalmente ao centro
    const heartStartX = slotX + slotSize + 16;
    const heartY = slotY + slotSize / 2;

    this.hudHearts = [];
    for (let i = 0; i < this.localPlayerTotalLives; i++) {
      const heart = this.add
        .sprite(
          heartStartX + i * (8 * heartScale + heartSpacing),
          heartY,
          "hud_coracao",
        )
        .setOrigin(0.5, 0.5)
        .setScale(heartScale)
        .setScrollFactor(0)
        .setDepth(23);

      heart.anims.play("heart_full");
      this.hudHearts.push(heart);
    }
  }

  _applyPlayerDamage() {
    if (this.localPlayerDead) return;

    this.localPlayerHits += 1;
    const heartIndex = this.localPlayerTotalLives - this.localPlayerLives;
    // frames 0..3 representam 0%..75% de dano (0 cheio, 3 quase vazio)
    const frame = Math.min(this.localPlayerHits, 3);

    const heart = this.hudHearts[heartIndex];
    if (heart) {
      const damageKeys = [
        "heart_full",
        "heart_hit1",
        "heart_hit2",
        "heart_empty",
      ];

      this.tweens.add({
        targets: heart,
        scaleX: heart.scaleX * 1.3,
        scaleY: heart.scaleY * 1.3,
        duration: 80,
        yoyo: true,
        ease: "Power2",
        onComplete: () => {
          heart.anims.play(damageKeys[frame]);
        },
      });
    }

    this.localPlayer.setTint(0xff4444);
    this.time.delayedCall(150, () => {
      if (this.localPlayer && this.localPlayer.active)
        this.localPlayer.clearTint();
    });

    if (this.localPlayerHits >= this.localPlayerHitsPerLife) {
      this.localPlayerHits = 0;
      if (this.hudHearts[heartIndex]) {
        this.hudHearts[heartIndex].setFrame(3).setAlpha(0.3);
      }

      this.localPlayerLives -= 1;
      if (this.localPlayerLives <= 0) {
        this._onPlayerDeath();
      }
    }
  }

  _onPlayerDeath() {
    if (this.localPlayerDead) return;
    this.localPlayerDead = true;
    this.waveActive = false;
    this.hordeActive = false;
    this.localPlayer.setVelocity(0, 0);
    this.localPlayer.setTint(0xff0000);

    if (this.enemies) {
      this.enemies.children.iterate((e) => {
        if (e && e.active) e.setVelocity(0, 0);
      });
    }

    this.waveBanner.setText("GAME OVER");
    this.waveBanner.setColor("#ff2222");
    this.waveBanner.setAlpha(0);
    this.waveBanner.setScale(1.2);
    this.tweens.add({
      targets: this.waveBanner,
      alpha: { from: 0, to: 1 },
      scaleX: { from: 0.8, to: 1 },
      scaleY: { from: 0.8, to: 1 },
      duration: 800,
      ease: "Sine.Out",
    });
  }

  _buildWaveHUD() {
    this.waveText = this.add
      .text(512, 18, "", {
        fontFamily: "'Arial Black', Arial",
        fontSize: "26px",
        color: "#ffffff",
        stroke: "#000000",
        strokeThickness: 6,
      })
      .setOrigin(0.5, 0)
      .setScrollFactor(0)
      .setDepth(20);

    // Banner central (wave / orda / clear / vitória)
    this.waveBanner = this.add
      .text(512, 280, "", {
        fontFamily: "'Arial Black', Arial",
        fontSize: "56px",
        color: "#ffdd00",
        stroke: "#000000",
        strokeThickness: 10,
      })
      .setOrigin(0.5, 0.5)
      .setScrollFactor(0)
      .setDepth(21)
      .setAlpha(0);

    // Sub-banner para orda (menor, abaixo do banner principal)
    this.ordaBanner = this.add
      .text(512, 350, "", {
        fontFamily: "'Arial Black', Arial",
        fontSize: "30px",
        color: "#ffffff",
        stroke: "#000000",
        strokeThickness: 6,
      })
      .setOrigin(0.5, 0.5)
      .setScrollFactor(0)
      .setDepth(21)
      .setAlpha(0);
  }

  _updateWaveHUD(currentWave, totalWaves, currentHorde, totalHordes) {
    this.waveText.setText(
      `WAVE ${currentWave}/${totalWaves}  ·  ORDA ${currentHorde}/${totalHordes}`,
    );
  }

  _showWaveBanner(waveNum) {
    this.waveBanner.setText(`— WAVE  ${waveNum} —`);
    this.waveBanner.setColor("#ffdd00");
    this.waveBanner.setScale(0.5);
    this.ordaBanner.setAlpha(0);

    this.tweens.add({
      targets: this.waveBanner,
      alpha: { from: 0, to: 1 },
      scaleX: { from: 0.4, to: 1 },
      scaleY: { from: 0.4, to: 1 },
      duration: 300,
      ease: "Back.Out",
      onComplete: () => {
        this.time.delayedCall(800, () => {
          this.tweens.add({
            targets: this.waveBanner,
            alpha: 0,
            duration: 300,
          });
        });
      },
    });
  }

  // [FIX 9] Banner animado por orda
  _showOrdaBanner(ordaNum, totalOrdas) {
    // Só exibe a partir da orda 2 (orda 1 já é coberta pelo banner de wave)
    if (ordaNum === 1) return;

    this.ordaBanner.setText(`ORDA  ${ordaNum} / ${totalOrdas}`);
    this.ordaBanner.setScale(0.6);

    this.tweens.add({
      targets: this.ordaBanner,
      alpha: { from: 0, to: 1 },
      scaleX: { from: 0.5, to: 1 },
      scaleY: { from: 0.5, to: 1 },
      duration: 250,
      ease: "Back.Out",
      onComplete: () => {
        this.time.delayedCall(700, () => {
          this.tweens.add({
            targets: this.ordaBanner,
            alpha: 0,
            duration: 300,
          });
        });
      },
    });
  }

  _showClearBanner() {
    this.waveBanner.setText("WAVE  CLEAR!");
    this.waveBanner.setColor("#44ff88");
    this.waveBanner.setScale(1.3);

    this.tweens.add({
      targets: this.waveBanner,
      alpha: { from: 0, to: 1 },
      scaleX: { from: 1.4, to: 1 },
      scaleY: { from: 1.4, to: 1 },
      duration: 250,
      ease: "Cubic.Out",
      onComplete: () => {
        this.time.delayedCall(1000, () => {
          this.tweens.add({
            targets: this.waveBanner,
            alpha: 0,
            duration: 400,
          });
        });
      },
    });
  }

  _showVictoryBanner() {
    // [FIX 6] garante que goIndicator é destruído antes
    this._destroyGoIndicator();

    this.waveText.setText("✦  FASE CONCLUÍDA  ✦");
    this.waveBanner.setText("VITÓRIA!");
    this.waveBanner.setColor("#ffdd00");
    this.waveBanner.setScale(1.2);

    this.tweens.add({
      targets: this.waveBanner,
      alpha: { from: 0, to: 1 },
      scaleX: { from: 0.8, to: 1 },
      scaleY: { from: 0.8, to: 1 },
      duration: 600,
      ease: "Sine.Out",
    });
  }

  _showGoIndicator() {
    // [FIX 6] destrói qualquer goIndicator anterior antes de criar um novo
    this._destroyGoIndicator();

    const x = this.cameras.main.width - 24;
    const y = 24;

    this.goIndicator = this.add
      .text(x, y, "GO →", {
        fontFamily: "'Arial Black', Arial",
        fontSize: "42px",
        color: "#ff4444",
        stroke: "#000000",
        strokeThickness: 6,
      })
      .setOrigin(1, 0)
      .setScrollFactor(0)
      .setDepth(30)
      .setAlpha(0);

    this.tweens.add({
      targets: this.goIndicator,
      alpha: { from: 0, to: 1 },
      scaleX: { from: 0.8, to: 1 },
      scaleY: { from: 0.8, to: 1 },
      duration: 500,
      ease: "Back.Out",
      onComplete: () => {
        // Pulsa para chamar atenção
        this.tweens.add({
          targets: this.goIndicator,
          alpha: { from: 1, to: 0.5 },
          duration: 600,
          ease: "Sine.InOut",
          yoyo: true,
          repeat: -1,
        });
      },
    });
  }

  // [FIX 6] Helper para destruir goIndicator com segurança
  _destroyGoIndicator() {
    if (this.goIndicator) {
      this.tweens.killTweensOf(this.goIndicator);
      this.goIndicator.destroy();
      this.goIndicator = null;
    }
  }

  // ═══════════════════════════════════════════════════════════
  //  UPDATE
  // ═══════════════════════════════════════════════════════════

  update() {
    // Se o player já morreu, para o update do jogo
    if (this.localPlayerDead) return;

    try {
      const currentAnim = this.localPlayer.anims.currentAnim;
      const currentFrame = this.localPlayer.anims.currentFrame;
      this.game.socket.emit("scene0", this.game.room, {
        player: {
          id: this.game.socket.id,
          x: this.localPlayer.x,
          y: this.localPlayer.y,
          flipX: this.localPlayer.flipX,
          texture: this.localPlayer.texture.key,
          animation: currentAnim ? currentAnim.key : null,
          frame: currentFrame ? currentFrame.index : null,
        },
      });
    } catch (e) {
      console.error("Error updating player:", e);
    }

    // Câmera travada durante wave — trava AMBOS os eixos
    if (this.cameraLocked) {
      if (this._lockCameraX !== undefined)
        this.cameras.main.scrollX = this._lockCameraX;
      if (this._lockCameraY !== undefined)
        this.cameras.main.scrollY = this._lockCameraY;
    }

    // ── Detecta avanço para próxima wave ─────────────────────
    // [FIX 5] guard _transitioningWave evita disparar duas vezes
    if (this.waveCleared && !this.waveActive && !this._transitioningWave) {
      const nextWaveIndex = this.currentWave + 1;

      if (nextWaveIndex < this.waveConfig.length) {
        const nextSection =
          this.mapSections[this.waveConfig[nextWaveIndex].section];

        if (this.localPlayer.x >= nextSection.start) {
          this._transitioningWave = true; // trava o guard
          this._destroyGoIndicator();
          this.waveCleared = false;

          // Tween suave de câmera até a nova seção e só então inicia a wave
          this.cameras.main.stopFollow();

          this.tweens.add({
            targets: this.cameras.main,
            scrollX: nextSection.start,
            duration: 700,
            ease: "Cubic.InOut",
            onComplete: () => {
              this._startWave(nextWaveIndex);
            },
          });
        }
      } else if (
        this.localPlayer.x >=
        this.mapSections[this.mapSections.length - 1].end - 100
      ) {
        this._transitioningWave = true;
        this._destroyGoIndicator();
        this._onAllWavesCleared();
      }
    }

    // ── Barreira superior da rua ─────────────────────────────
    if (this.localPlayer.y < this.limitLineY) {
      this.localPlayer.y = this.limitLineY;
      this.localPlayer.body.velocity.y = Math.max(
        0,
        this.localPlayer.body.velocity.y,
      );
    }

    // ── Y-sorting ────────────────────────────────────────────
    this.localPlayer.setDepth(this.localPlayer.y);
    if (this.enemies) {
      this.enemies.children.iterate((e) => {
        if (e && e.active) e.setDepth(e.y);
      });
    }

    // ── Animação idle ────────────────────────────────────────
    if (
      this.localPlayer.body.velocity.x === 0 &&
      this.localPlayer.body.velocity.y === 0 &&
      this.localPlayer.anims.currentAnim &&
      this.localPlayer.anims.currentAnim.key !==
        this._getLocalPlayerAnimKey("punching") &&
      this.localPlayer.anims.currentAnim.key !==
        this._getLocalPlayerAnimKey("kicking") &&
      this.localPlayer.anims.currentAnim.key !==
        this._getLocalPlayerAnimKey("idle-frame0")
    ) {
      this.localPlayer.anims.play(
        this._getLocalPlayerAnimKey("standing-still"),
        true,
      );
    }

    // ── IA dos inimigos ──────────────────────────────────────
    if (this.enemies && this.enemies.children) {
      this.enemies.children.iterate((enemy) => {
        if (!enemy || !enemy.active || enemy._dying) return;

        // Se está em knockback, só decrementa o timer e pula
        if (enemy._knockbackTimer > 0) {
          enemy._knockbackTimer -= this.game.loop.delta;
          if (enemy._knockbackTimer <= 0) {
            enemy.state = "idle";
            enemy.setVelocity(0, 0);
          }
          return;
        }

        const distLocal = Phaser.Math.Distance.Between(
          enemy.x,
          enemy.y,
          this.localPlayer.x,
          this.localPlayer.y,
        );
        let dist = distLocal;
        let targetPlayer = this.localPlayer;

        if (this.remotePlayers.length > 0) {
          const distRemote = Phaser.Math.Distance.Between(
            enemy.x,
            enemy.y,
            this.remotePlayers[0].sprite.x,
            this.remotePlayers[0].sprite.y,
          );

          if (distLocal > distRemote) {
            dist = distRemote;
            targetPlayer = this.remotePlayers[0].sprite;
          }
        }

        const attackRange = 80; // distância para parar e atacar
        const stopRange = 60; // distância mínima — não encosta na hitbox

        if (dist > attackRange) {
          // ── Perseguir ──
          enemy.body.setImmovable(false);
          this.physics.moveToObject(enemy, targetPlayer, enemy.speed);
          if (
            !enemy.anims.currentAnim ||
            enemy.anims.currentAnim.key !== "enemy_run"
          )
            enemy.anims.play("enemy_run", true);
          enemy.flipX = this.localPlayer.x < enemy.x;
          enemy.state = "chasing";
        } else if (dist <= attackRange && dist > stopRange) {
          // ── Zona de ataque: para e ataca ──
          enemy.setVelocity(0, 0);
          enemy.body.setImmovable(true);

          if (enemy.state !== "attacking") {
            enemy.state = "attacking";
            enemy._hasHitThisAttack = false;
            enemy.anims.play("enemy_attack", true);

            // Frame 19 da animação completa (frames 15-22 a 8fps)
            // Frame 19 = 4º frame da animação = (19-15)/8 * 1000 = 500ms
            this.time.delayedCall(250, () => {
              if (!enemy || !enemy.active || enemy._dying) return;
              if (enemy._hasHitThisAttack) return;
              if (enemy.state !== "attacking") return;

              const d = Phaser.Math.Distance.Between(
                enemy.x,
                enemy.y,
                this.localPlayer.x,
                this.localPlayer.y,
              );
              if (d <= attackRange) {
                enemy._hasHitThisAttack = true;
                this._applyPlayerDamage();
              }
            });

            // Animação termina em ~1000ms (8 frames a 8fps)
            // + 1000ms de pausa antes do próximo ataque
            this.time.delayedCall(1500, () => {
              if (enemy && enemy.active && !enemy._dying) {
                enemy.body.setImmovable(false);
                enemy._hasHitThisAttack = false;
                enemy.state = "idle";
              }
            });
          }
        }
      });
    }
  }
}

export default scene0;
