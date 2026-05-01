class scene0 extends Phaser.Scene {
  constructor() {
    super("scene0");

    this.threshold = 0.1;
    this.speed = 100;
    this.direction = undefined;

    // ===== WAVE SYSTEM =====
    // Mapa dividido em 5 seções de ~1152 pixels cada (5760 total)
    this.mapSections = [
      { start: 0, end: 1152 }, // Wave 1
      { start: 1152, end: 2304 }, // Wave 2
      { start: 2304, end: 3456 }, // Wave 3
      { start: 3456, end: 4608 }, // Wave 4
      { start: 4608, end: 5760 }, // Wave 5
    ];

    this.waveConfig = [
      // Wave 1 – Seção 1: 3 ordas
      {
        section: 0,
        hordes: [
          // Orda 1
          [
            { x: 300, y: 650, type: "normal" },
            { x: 500, y: 650, type: "normal" },
          ],
          // Orda 2
          [
            { x: 700, y: 640, type: "fast" },
            { x: 900, y: 650, type: "normal" },
          ],
          // Orda 3
          [
            { x: 600, y: 655, type: "tank" },
            { x: 800, y: 650, type: "normal" },
          ],
        ],
      },
      // Wave 2 – Seção 2: 3 ordas
      {
        section: 1,
        hordes: [
          // Orda 1
          [
            { x: 1400, y: 650, type: "normal" },
            { x: 1600, y: 650, type: "normal" },
            { x: 1800, y: 640, type: "fast" },
          ],
          // Orda 2
          [
            { x: 1500, y: 655, type: "tank" },
            { x: 1700, y: 650, type: "normal" },
          ],
          // Orda 3
          [
            { x: 1300, y: 650, type: "normal" },
            { x: 1550, y: 640, type: "fast" },
            { x: 1750, y: 650, type: "normal" },
          ],
        ],
      },
      // Wave 3 – Seção 3: 3 ordas
      {
        section: 2,
        hordes: [
          // Orda 1
          [
            { x: 2500, y: 650, type: "normal" },
            { x: 2700, y: 650, type: "normal" },
          ],
          // Orda 2
          [
            { x: 2600, y: 640, type: "fast" },
            { x: 2800, y: 650, type: "normal" },
            { x: 2900, y: 655, type: "tank" },
          ],
          // Orda 3
          [
            { x: 2400, y: 650, type: "normal" },
            { x: 2650, y: 640, type: "fast" },
            { x: 2850, y: 650, type: "normal" },
          ],
        ],
      },
      // Wave 4 – Seção 4: 3 ordas
      {
        section: 3,
        hordes: [
          // Orda 1
          [
            { x: 3600, y: 650, type: "normal" },
            { x: 3800, y: 650, type: "normal" },
            { x: 4000, y: 640, type: "fast" },
          ],
          // Orda 2
          [
            { x: 3700, y: 655, type: "tank" },
            { x: 3900, y: 650, type: "normal" },
          ],
          // Orda 3
          [
            { x: 3500, y: 650, type: "normal" },
            { x: 3750, y: 640, type: "fast" },
            { x: 3950, y: 650, type: "normal" },
          ],
        ],
      },
      // Wave 5 – Seção 5: 3 ordas
      {
        section: 4,
        hordes: [
          // Orda 1
          [
            { x: 4700, y: 650, type: "normal" },
            { x: 4900, y: 650, type: "normal" },
          ],
          // Orda 2
          [
            { x: 4800, y: 640, type: "fast" },
            { x: 5000, y: 650, type: "normal" },
            { x: 5100, y: 655, type: "tank" },
          ],
          // Orda 3
          [
            { x: 4600, y: 650, type: "normal" },
            { x: 4850, y: 640, type: "fast" },
            { x: 5050, y: 650, type: "normal" },
          ],
        ],
      },
    ];

    this.currentWave = 0;
    this.currentHorde = 0;
    this.waveActive = false;
    this.hordeActive = false;
    this.waveCleared = false;
    this.cameraLocked = false;
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

    // ===== INIMIGO =====
    this.load.spritesheet("enemy", "Machine_guy_sprite_sheet.png", {
      frameWidth: 180,
      frameHeight: 90,
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
      this.tileset4,
      this.load.image("punch1", "NES_Vigilante_Punch_1.png"),
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
    this.player.body.setOffset(3, 10);
    this.player.setBounce(0);
    this.physics.world.gravity.y = 0;
    this.player.body.setAllowGravity(false);
    this.player.setCollideWorldBounds(true);

    this.player.lastStreetPosition = { x: 150, y: 656 };

    // Linha limite horizontal fixa (onde começa a calçada da rua)
    this.limitLineY = this.player.y - 40;

    // Desenhar linha para visualização da barreira
    this.limitLine = this.add.graphics();
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

    // ===== ANIMAÇÕES DO INIMIGO =====

    // IDLE
    this.anims.create({
      key: "enemy_idle",
      frames: this.anims.generateFrameNumbers("enemy", { start: 0, end: 5 }),
      frameRate: 8,
      repeat: -1,
    });

    // RUN
    this.anims.create({
      key: "enemy_run",
      frames: this.anims.generateFrameNumbers("enemy", { start: 6, end: 14 }),
      frameRate: 10,
      repeat: -1,
    });

    // ATTACK
    this.anims.create({
      key: "enemy_attack",
      frames: this.anims.generateFrameNumbers("enemy", { start: 15, end: 22 }),
      frameRate: 10,
      repeat: 0,
    });

    // DEATH
    this.anims.create({
      key: "enemy_death",
      frames: this.anims.generateFrameNumbers("enemy", { start: 23, end: 27 }),
      frameRate: 8,
      repeat: 0,
    });

    // ===== GRUPO DE INIMIGOS =====
    this.enemies = this.physics.add.group();

    // ── SPAWN DE INIMIGO ─────────────────────
    /**
     * Tipos:
     *   "normal" – padrão                    (branco)
     *   "fast"   – mais veloz, menos HP      (vermelho)
     *   "tank"   – lento, mais HP, dano maior (azul)
     */
    this.spawnEnemy = (x, y, type = "normal") => {
      const enemy = this.enemies.create(x, y, "enemy");
      enemy.setOrigin(0.5, 0.61); // ancora no pé real do personagem
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

      enemy.anims.play("enemy_idle");
      return enemy;
    };

    this.physics.add.collider(this.player, this.enemies);

    // ── CÂMERA & MUNDO ───────────────────────
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

    // ── COLISÕES TILEMAP ─────────────────────
    this.layercasas.setCollisionByProperty({ collides: true });
    this.physics.add.collider(this.player, this.layercasas);
    this.layerMarquinhosDojo.setCollisionByProperty({ collides: true });
    this.physics.add.collider(this.player, this.layerMarquinhosDojo);
    this.layerrua.setCollisionByProperty({ collides: true });
    this.physics.add.collider(this.player, this.layerrua);

    // ── JOYSTICK ─────────────────────────────
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

        // Trava movimento durante wave ativa
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

    // ── BOTÃO SOCO ───────────────────────────
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

    // ── BOTÃO CHUTE ──────────────────────────
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

    // ── HUD ──────────────────────────────────
    this._buildWaveHUD();

    // ── PRIMEIRA WAVE ────────────────────────
    this.time.delayedCall(800, () => this._startWave(0));
  }

  // ═══════════════════════════════════════════
  // WAVE SYSTEM
  // ═══════════════════════════════════════════

  /**
   * Inicia a wave de índice `index`.
   * - Trava scroll da câmera na seção da wave
   * - Exibe banner "WAVE X"
   * - Inicia a primeira orda
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

    const waveDef = this.waveConfig[index];
    const section = this.mapSections[waveDef.section];

    // Guarda os limites da seção para travar a câmera
    this.waveLeftBound = section.start;
    this.waveRightBound = section.end;

    // Para a câmera na posição inicial da seção
    this.cameras.main.stopFollow();
    this._lockCameraX = Math.max(
      section.start,
      Math.min(
        section.end - this.cameras.main.width / this.cameras.main.zoom,
        this.player.x - this.cameras.main.width / this.cameras.main.zoom / 2,
      ),
    );
    this.cameras.main.scrollX = this._lockCameraX;

    // Banner e HUD
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
   * Inicia uma orda específica dentro da wave atual.
   */
  _startHorde(hordeIndex) {
    if (hordeIndex >= this.waveConfig[this.currentWave].hordes.length) {
      this._clearWave();
      return;
    }

    this.currentHorde = hordeIndex;
    this.hordeActive = true;

    // Atualiza HUD
    this._updateWaveHUD(
      this.currentWave + 1,
      this.waveConfig.length,
      hordeIndex + 1,
      this.waveConfig[this.currentWave].hordes.length,
    );

    // Spawna inimigos da orda com delay
    const horde = this.waveConfig[this.currentWave].hordes[hordeIndex];
    horde.forEach((cfg, i) => {
      this.time.delayedCall(500 + i * 350, () => {
        if (!this.waveActive || !this.hordeActive) return;

        const enemy = this.spawnEnemy(cfg.x, cfg.y, cfg.type);

        // Efeito de entrada
        enemy.setAlpha(0);
        this.tweens.add({
          targets: enemy,
          alpha: 1,
          duration: 200,
        });
      });
    });
  }

  /**
   * Chamado após cada morte de inimigo.
   * Se não restarem inimigos da orda atual, chama _clearHorde().
   */
  _onEnemyKilled() {
    if (!this.waveActive || !this.hordeActive) return;

    // Pequena espera para garantir que o destroy() propagou
    this.time.delayedCall(50, () => {
      const alive = this.enemies.countActive(true);
      if (alive === 0) this._clearHorde();
    });
  }

  /**
   * Orda limpa: avança para próxima orda ou wave.
   */
  _clearHorde() {
    this.hordeActive = false;

    const nextHordeIndex = this.currentHorde + 1;
    if (nextHordeIndex < this.waveConfig[this.currentWave].hordes.length) {
      // Próxima orda
      this.time.delayedCall(1500, () => {
        if (this.waveActive) this._startHorde(nextHordeIndex);
      });
    } else {
      // Wave completa
      this._clearWave();
    }
  }

  /**
   * Wave limpa:
   * - Destrava câmera
   * - Flash de vitória
   * - Inicia próxima wave após pausa
   */
  _clearWave() {
    this.waveActive = false;
    this.waveCleared = true;
    this.cameraLocked = false;

    this.cameras.main.flash(500, 200, 255, 150);
    this._showClearBanner();

    // Mostra "GO ->" para avançar
    this._showGoIndicator();

    // Retoma follow suave, mas permite avançar
    this.time.delayedCall(1000, () => {
      this.cameras.main.startFollow(this.player, true, 0.08, 0.08);
    });
  }

  /** Todas as waves da fase foram concluídas. */
  _onAllWavesCleared() {
    this._showVictoryBanner();
    this.cameras.main.startFollow(this.player, true, 0.08, 0.08);
    // Para avançar de fase: this.scene.start("scene1");
  }

  // ═══════════════════════════════════════════
  // DANO
  // ═══════════════════════════════════════════

  _dealDamage(range, dmg, knockback) {
    if (!this.enemies) return;
    this.enemies.children.iterate((enemy) => {
      if (!enemy || !enemy.active) return;

      const dist = Phaser.Math.Distance.Between(
        this.player.x,
        this.player.y,
        enemy.x,
        enemy.y,
      );
      if (dist > range) return;

      enemy.health -= dmg;

      // Flash branco de hit
      enemy.setTint(0xffffff);
      this.time.delayedCall(90, () => {
        if (!enemy || !enemy.active) return;
        const originalTint =
          enemy.type === "fast"
            ? 0xff6666
            : enemy.type === "tank"
              ? 0x6699ff
              : 0xffffff;
        enemy.setTint(originalTint);
      });

      // Knockback
      const dir = enemy.x < this.player.x ? -1 : 1;
      enemy.setVelocityX(knockback * dir);

      if (enemy.health <= 0) this._killEnemy(enemy);
    });
  }

  _killEnemy(enemy) {
    if (!enemy || !enemy.active) return;

    // Desativa colisão imediatamente
    enemy.active = false;
    enemy.body.enable = false;

    // Toca animação de morte
    enemy.anims.play("enemy_death", true);
    enemy.setVelocity(0, 0);

    // Remove após animação terminar
    this.time.delayedCall(700, () => {
      if (enemy && enemy.scene) enemy.destroy();
      this._onEnemyKilled();
    });
  }

  // ═══════════════════════════════════════════
  // HUD
  // ═══════════════════════════════════════════

  _buildWaveHUD() {
    // Indicador de wave no topo
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

    // Banner central (animado)
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
  }

  _updateWaveHUD(currentWave, totalWaves, currentHorde, totalHordes) {
    this.waveText.setText(
      `WAVE ${currentWave}/${totalWaves} - ORDA ${currentHorde}/${totalHordes}`,
    );
  }

  _showWaveBanner(waveNum) {
    this.waveBanner.setText(`— WAVE  ${waveNum} —`);
    this.waveBanner.setColor("#ffdd00");
    this.waveBanner.setScale(0.5);

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
    if (this.goIndicator) {
      this.goIndicator.destroy();
      this.goIndicator = null;
    }

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
    // Indicador "GO ->" no canto superior direito da tela
    const margin = 24;
    const x = this.cameras.main.width - margin;
    const y = margin;

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
      yoyo: true,
      repeat: -1,
    });
  }

  // ═══════════════════════════════════════════
  // UPDATE
  // ═══════════════════════════════════════════

  update() {
    // Mantém câmera travada no X durante wave ativa
    if (this.cameraLocked && this._lockCameraX !== undefined) {
      this.cameras.main.scrollX = this._lockCameraX;
    }

    // Detecta avanço para próxima wave após completar
    if (this.waveCleared && !this.waveActive) {
      const nextWaveIndex = this.currentWave + 1;
      if (nextWaveIndex < this.waveConfig.length) {
        const nextSection =
          this.mapSections[this.waveConfig[nextWaveIndex].section];
        if (this.player.x >= nextSection.start) {
          // Remove indicador GO
          if (this.goIndicator) {
            this.goIndicator.destroy();
            this.goIndicator = null;
          }
          // Inicia próxima wave
          this.waveCleared = false;
          this._startWave(nextWaveIndex);
        }
      } else if (
        this.player.x >=
        this.mapSections[this.mapSections.length - 1].end - 100
      ) {
        // Fim do mapa
        if (this.goIndicator) {
          this.goIndicator.destroy();
          this.goIndicator = null;
        }
        this._onAllWavesCleared();
      }
    }

    // Barreira superior da rua
    if (this.player.y < this.limitLineY) {
      this.player.y = this.limitLineY;
      this.player.body.velocity.y = Math.max(0, this.player.body.velocity.y);
    }

    // Y-sorting: sprites mais abaixo aparecem na frente
    this.player.setDepth(this.player.y);
    if (this.enemies) {
      this.enemies.children.iterate((e) => {
        if (e && e.active) e.setDepth(e.y);
      });
    }

    // Animação idle quando parado
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

    // ── IA DOS INIMIGOS ──────────────────────
    if (this.enemies && this.enemies.children) {
      this.enemies.children.iterate((enemy) => {
        if (!enemy || !enemy.active) return;

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
          // Atacar
          enemy.setVelocity(0, 0);
          if (enemy.state !== "attacking") {
            enemy.state = "attacking";

            // Alterna aleatoriamente entre os dois ataques
            const atkKey = Phaser.Math.Between(0, 1)
              ? "enemy_attack"
              : "enemy_attack2";
            enemy.anims.play(atkKey, true);

            this.time.delayedCall(300, () => {
              if (!enemy || !enemy.active) return;
              const d = Phaser.Math.Distance.Between(
                enemy.x,
                enemy.y,
                this.player.x,
                this.player.y,
              );
              if (d < attackRange) {
                console.log(`Player levou ${enemy.damage} de dano!`);
                // TODO: implementar HP do player aqui
              }
            });

            this.time.delayedCall(800, () => {
              if (enemy && enemy.active) enemy.state = "idle";
            });
          }
        }
      });
    }
  }
}

export default scene0;
