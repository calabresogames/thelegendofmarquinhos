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
            { x: 700, y: 640, type: "fast" },
            { x: 900, y: 650, type: "normal" },
          ],
          [
            { x: 600, y: 655, type: "tank" },
            { x: 800, y: 650, type: "normal" },
          ],
        ],
      },
      // Wave 2 – Seção 1
      {
        section: 1,
        hordes: [
          [
            { x: 1400, y: 650, type: "normal" },
            { x: 1600, y: 650, type: "normal" },
            { x: 1800, y: 640, type: "fast" },
          ],
          [
            { x: 1500, y: 655, type: "tank" },
            { x: 1700, y: 650, type: "normal" },
          ],
          [
            { x: 1300, y: 650, type: "normal" },
            { x: 1550, y: 640, type: "fast" },
            { x: 1750, y: 650, type: "normal" },
          ],
        ],
      },
      // Wave 3 – Seção 2
      {
        section: 2,
        hordes: [
          [
            { x: 2500, y: 650, type: "normal" },
            { x: 2700, y: 650, type: "normal" },
          ],
          [
            { x: 2600, y: 640, type: "fast" },
            { x: 2800, y: 650, type: "normal" },
            { x: 2900, y: 655, type: "tank" },
          ],
          [
            { x: 2400, y: 650, type: "normal" },
            { x: 2650, y: 640, type: "fast" },
            { x: 2850, y: 650, type: "normal" },
          ],
        ],
      },
      // Wave 4 – Seção 3
      {
        section: 3,
        hordes: [
          [
            { x: 3600, y: 650, type: "normal" },
            { x: 3800, y: 650, type: "normal" },
            { x: 4000, y: 640, type: "fast" },
          ],
          [
            { x: 3700, y: 655, type: "tank" },
            { x: 3900, y: 650, type: "normal" },
          ],
          [
            { x: 3500, y: 650, type: "normal" },
            { x: 3750, y: 640, type: "fast" },
            { x: 3950, y: 650, type: "normal" },
          ],
        ],
      },
      // Wave 5 – Seção 4 (final)
      {
        section: 4,
        hordes: [
          [
            { x: 4700, y: 650, type: "normal" },
            { x: 4900, y: 650, type: "normal" },
          ],
          [
            { x: 4800, y: 640, type: "fast" },
            { x: 5000, y: 650, type: "normal" },
            { x: 5100, y: 655, type: "tank" },
          ],
          [
            { x: 4600, y: 650, type: "normal" },
            { x: 4850, y: 640, type: "fast" },
            { x: 5050, y: 650, type: "normal" },
          ],
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
  }

  // ─────────────────────────────────────────────────────────────
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
    this.load.image("punch1", "NES_Vigilante_Punch_1.png");
    this.load.image("punch2", "NES_Vigilante_Punch_2.png");
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

  // ─────────────────────────────────────────────────────────────
  create() {

this.game.socket.on("scene0", (state) => {

  if (state.player) {
    try {
      if (state.player.id === this.game.socket.id) return;

      let remotePlayer = this.remotePlayers.find(
        (p) => p.id === state.player.id,
      );

      if (!remotePlayer) {
        remotePlayer = this.add
          .sprite(state.player.x, state.player.y, "character", 0)
          .setPipeline("Light2D");
        this.remotePlayers.push({
          id: state.player.id,
          sprite: remotePlayer,
        });
      }

      remotePlayer.sprite.setPosition(state.player.x, state.player.y);

      if (state.player.animation)
        remotePlayer.sprite.anims.play(state.player.animation, true);
      else if (state.player.texture)
        remotePlayer.sprite.setTexture(state.player.texture);
    } catch (e) {
      console.error("Error updating remote player:", e);
    }
  }
});


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

    this.load.spritesheet("enemy", "Machine_guy_sprite_sheet.png", {
      frameWidth: 180,
      frameHeight: 90,
    });

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
    this.player = this.physics.add.sprite(150, 656, "marquinhos_idle", 0);
    this.player.setScale(4.5);
    this.player.setOrigin(0.5, 1);
    this.player.body.setSize(15, 30);
    this.player.body.setOffset(1, 1);
    this.player.setBounce(0);
    this.physics.world.gravity.y = 0;
    this.player.body.setAllowGravity(false);
    this.player.setCollideWorldBounds(true);
    this.player.lastStreetPosition = { x: 150, y: 656 };
    this.limitLineY = this.player.y - 40;

    // Desenhar linha para visualização da barreira
    this.limitLine = this.add.graphics();
    this.limitLine.beginPath();
    this.limitLine.moveTo(0, this.limitLineY);
    this.limitLine.lineTo(this.tilemap.widthInPixels, this.limitLineY);
    this.limitLine.closePath();
    this.limitLine.strokePath();

    // ── Animações do player ──────────────────────────────────
    this.anims.create({
      key: "standing-still",
      frames: this.anims.generateFrameNumbers("marquinhos_idle", {
        start: 0,
        end: 3,
      }),
      frameRate: 8,
      repeat: -1,
    });
    this.anims.create({
      key: "idle-frame0",
      frames: [{ key: "marquinhos_idle", frame: 0 }],
      frameRate: 1,
      repeat: 0,
    });
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
      key: "punching",
      frames: [
        { key: "marquinhos_punch1", frame: 0 },
        { key: "marquinhos_punch1", frame: 1 },
        { key: "marquinhos_punch2", frame: 0 },
        { key: "marquinhos_punch2", frame: 1 },
        { key: "marquinhos_idle", frame: 0 },
      ],
      frameRate: 10,
      repeat: 0,
      onComplete: () => this.player.anims.play("idle-frame0", true),
    });
    this.anims.create({
      key: "kicking",
      frames: [
        { key: "marquinhos_kick1", frame: 0 },
        { key: "marquinhos_kick1", frame: 1 },
        { key: "marquinhos_idle", frame: 0 },
      ],
      frameRate: 10,
      repeat: 0,
      onComplete: () => this.player.anims.play("idle-frame0", true),
    });

    // ── Animações do inimigo ─────────────────────────────────
    // [FIX 1] frames corretos por animação
    this.anims.create({
      key: "enemy_idle",
      frames: this.anims.generateFrameNumbers("enemy", { start: 0, end: 5 }),
      frameRate: 8,
      repeat: -1,
    });
    this.anims.create({
      key: "enemy_run",
      // frames 6-14: inclui run + walk, transição mais suave
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
        fast: { scale: 4, health: 2, speed: 140, damage: 1, tint: 0xff6666 },
        tank: { scale: 4, health: 6, speed: 50, damage: 2, tint: 0x6699ff },
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

      enemy.anims.play("enemy_idle");
      return enemy;
    };

    // Usar OVERLAP em vez de collider para os inimigos não empurrarem o player
    // O collider causava o push físico; overlap detecta sem aplicar força
    this.physics.add.overlap(this.player, this.enemies);

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
    this.cameras.main.startFollow(this.player);
    this.cameras.main.setZoom(0.5);

    // ── Colisões tilemap ─────────────────────────────────────
    this.layercasas.setCollisionByProperty({ collides: true });
    this.physics.add.collider(this.player, this.layercasas);
    this.layerMarquinhosDojo.setCollisionByProperty({ collides: true });
    this.physics.add.collider(this.player, this.layerMarquinhosDojo);
    this.layerrua.setCollisionByProperty({ collides: true });
    this.physics.add.collider(this.player, this.layerrua);

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
          if (vx > 0 && this.player.x >= this.waveRightBound) vx = 0;
          if (vx < 0 && this.player.x <= this.waveLeftBound) vx = 0;
        }

        this.player.setVelocity(vx, vy);
        if (vx < 0) this.player.flipX = true;
        else if (vx > 0) this.player.flipX = false;
        this.player.anims.play("running", true);
      } else {
        this.player.setVelocity(0, 0);
        this.player.anims.play("standing-still", true);
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
          !this.player.anims.isPlaying ||
          this.player.anims.currentAnim.key !== "running"
        ) {
          this.player.setVelocity(0);
          this.player.anims.play("punching", true);
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
          !this.player.anims.isPlaying ||
          this.player.anims.currentAnim.key !== "running"
        ) {
          this.player.setVelocity(0);
          this.player.anims.play("kicking", true);
          this._dealDamage(80, 2, 200);
        }
      })
      .on("pointerup", () => this.kickButton.clearTint())
      .setScrollFactor(0)
      .setDepth(10);

    // ── HUD ──────────────────────────────────────────────────
    this._buildWaveHUD();

    // ── Inicia primeira wave ─────────────────────────────────
    this.time.delayedCall(800, () => this._startWave(0));

    this.game.socket.on("scene0", (state) => {
      if (state.player) {
        // ...
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
      const camH = this.cameras.main.height / zoom;
      const targetX = Phaser.Math.Clamp(
        this.player.x - camW / 2,
        0,
        this.tilemap.widthInPixels - camW,
      );
      const targetY = Phaser.Math.Clamp(
        this.player.y - camH / 2,
        0,
        this.tilemap.heightInPixels - camH,
      );

      // Tween da câmera até a posição do player antes de ligar o follow
      this.tweens.add({
        targets: this.cameras.main,
        scrollX: targetX,
        scrollY: targetY,
        duration: 500,
        ease: "Cubic.InOut",
        onComplete: () => {
          // Só liga o follow depois do tween acabar — sem salto
          this.cameras.main.startFollow(this.player, true, 0.1, 0.1);
        },
      });
    });
  }

  /** Todas as waves concluídas. */
  _onAllWavesCleared() {
    this._showVictoryBanner();
    this.cameras.main.startFollow(this.player, true, 0.08, 0.08);
    // this.time.delayedCall(3000, () => this.scene.start("scene1"));
  }

  // ═══════════════════════════════════════════════════════════
  //  DANO
  // ═══════════════════════════════════════════════════════════

  _dealDamage(range, dmg, knockback) {
    if (!this.enemies) return;
    this.enemies.children.iterate((enemy) => {
      if (!enemy || !enemy.active || enemy._dying) return;

      const dist = Phaser.Math.Distance.Between(
        this.player.x,
        this.player.y,
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

      // Knockback
      const dir = enemy.x < this.player.x ? -1 : 1;
      enemy.setVelocityX(knockback * dir);

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

    try {
      this.game.socket.emit("scene0", this.game.room, {
        player: {
          id: this.game.socket.id,
          x: this.player.x,
          y: this.player.y,
          texture: "character",
          animation: this.player.anims.currentAnim
            ? this.player.anims.currentAnim.key
            : null,
        },
      });
    } catch (e) {
      console.error("Error updating player:", e);
    }

    try {
      this.game.socket.emit("scene0", this.game.room, {
        player: {
          x: this.player.x,
          y: this.player.y,
          key: this.player.anims.currentAnim.key,
          frame: this.player.anims.currentFrame.index,
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

        if (this.player.x >= nextSection.start) {
          this._transitioningWave = true; // trava o guard
          this._destroyGoIndicator();
          this.waveCleared = false;

          // Tween suave de câmera até a nova seção e só então inicia a wave
          this.cameras.main.stopFollow();
          const zoom = this.cameras.main.zoom;
          const camW = this.cameras.main.width / zoom;
          const targetY = Phaser.Math.Clamp(
            this.player.y - this.cameras.main.height / zoom / 2,
            0,
            this.tilemap.heightInPixels - this.cameras.main.height / zoom,
          );
          this.tweens.add({
            targets: this.cameras.main,
            scrollX: nextSection.start,
            scrollY: targetY,
            duration: 700,
            ease: "Cubic.InOut",
            onComplete: () => {
              this._startWave(nextWaveIndex);
            },
          });
        }
      } else if (
        this.player.x >=
        this.mapSections[this.mapSections.length - 1].end - 100
      ) {
        this._transitioningWave = true;
        this._destroyGoIndicator();
        this._onAllWavesCleared();
      }
    }

    // ── Barreira superior da rua ─────────────────────────────
    if (this.player.y < this.limitLineY) {
      this.player.y = this.limitLineY;
      this.player.body.velocity.y = Math.max(0, this.player.body.velocity.y);
    }

    // ── Y-sorting ────────────────────────────────────────────
    this.player.setDepth(this.player.y);
    if (this.enemies) {
      this.enemies.children.iterate((e) => {
        if (e && e.active) e.setDepth(e.y);
      });
    }

    // ── Animação idle ────────────────────────────────────────
    if (
      this.player.body.velocity.x === 0 &&
      this.player.body.velocity.y === 0 &&
      this.player.anims.currentAnim &&
      this.player.anims.currentAnim.key !== "punching" &&
      this.player.anims.currentAnim.key !== "kicking" &&
      this.player.anims.currentAnim.key !== "idle-frame0"
    ) {
      this.player.anims.play("standing-still", true);
    }

    // ── IA dos inimigos ──────────────────────────────────────
    if (this.enemies && this.enemies.children) {
      this.enemies.children.iterate((enemy) => {
        if (!enemy || !enemy.active || enemy._dying) return;

        const dist = Phaser.Math.Distance.Between(
          enemy.x,
          enemy.y,
          this.player.x,
          this.player.y,
        );
        const attackRange = 60;

        if (dist > attackRange) {
          // Perseguir
          this.physics.moveToObject(enemy, this.player, enemy.speed);
          if (
            !enemy.anims.currentAnim ||
            enemy.anims.currentAnim.key !== "enemy_run"
          ) {
            enemy.anims.play("enemy_run", true);
          }
          enemy.flipX = this.player.x < enemy.x;
          enemy.state = "chasing";
        } else {
          // Para completamente ao atacar — sem empurrar o player
          enemy.setVelocity(0, 0);
          enemy.body.setImmovable(true);

          if (enemy.state !== "attacking") {
            enemy.state = "attacking";

            // UMA animação de ataque completa (frames 15-22)
            enemy.anims.play("enemy_attack", true);

            // Aplica dano no pico do ataque (frame ~4 da animação = ~330ms)
            this.time.delayedCall(330, () => {
              if (!enemy || !enemy.active || enemy._dying) return;
              const d = Phaser.Math.Distance.Between(
                enemy.x,
                enemy.y,
                this.player.x,
                this.player.y,
              );
              if (d < attackRange) {
                console.log(`Player levou ${enemy.damage} de dano!`);
                // TODO: implementar HP do player
              }
            });

            // Duração total do ataque = 8 frames a 12fps ≈ 667ms
            // Depois volta ao idle para reavaliar
            this.time.delayedCall(680, () => {
              if (enemy && enemy.active && !enemy._dying) {
                enemy.body.setImmovable(false);
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
