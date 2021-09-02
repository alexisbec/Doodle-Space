class Game extends Phaser.Scene {
  constructor() {
    super({ key: 'Game' })
  }

  preload() {
    this.load.spritesheet('ship', '../dist/assets/spaceship.png', {
      frameWidth: 64,
      frameHeight: 29
    });

    this.load.spritesheet('enemy_1', '../dist/assets/enemy_1.png', {
      frameWidth: 40,
      frameHeight: 30
    });

    this.load.spritesheet('enemy_2', '../dist/assets/enemy_2.png', {
      frameWidth: 40,
      frameHeight: 30
    });

    this.load.spritesheet('enemy_3', '../dist/assets/enemy_3.png', {
      frameWidth: 40,
      frameHeight: 30
    });

    this.load.spritesheet('explosion', '../dist/assets/explosions.png', {
      frameWidth: 32,
      frameHeight: 32
    });

    this.load.audio('sndExp1', '../dist/assets/sndExp1.wav');
    this.load.audio('sndExp2', '../dist/assets/sndExp2.wav');
    this.load.audio('sndBullet', '../dist/assets/sndBullet.wav');

    this.load.image('bullet', '../dist/assets/bullet.png');
    this.load.image('bg1', '../dist/assets/bg1.jpg');
    this.load.image('bg2', '../dist/assets/bg2.png');
  }

  create() {
    this.bg1 = this.add.tileSprite(300, 200, 1000, 580, 'bg1');
    this.bg2 = this.add.tileSprite(300, 200, 1000, 580, 'bg2');

    this.anims.create({
      key: "ship",
      frames: this.anims.generateFrameNumbers("ship"),
      frameRate: 20,
      repeat: -1
    });

    this.player = new Player(
      this,
      this.game.config.width * 0.5,
      this.game.config.height * 0.5,
      'ship'
    );

    this.keyUp = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
    this.keyDown = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
    this.keyLeft = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
    this.keyRight = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    this.keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

    this.anims.create({
      key: "enemy_1",
      frames: this.anims.generateFrameNumbers("enemy_1"),
      frameRate: 20,
      repeat: -1
    });

    this.anims.create({
      key: "enemy_2",
      frames: this.anims.generateFrameNumbers("enemy_2"),
      frameRate: 20,
      repeat: -1
    });

    this.anims.create({
      key: "enemy_3",
      frames: this.anims.generateFrameNumbers("enemy_3"),
      frameRate: 20,
      repeat: -1
    });

    this.anims.create({
      key: "explosion",
      frames: this.anims.generateFrameNumbers("explosion"),
      frameRate: 20,
      repeat: 0
    });

    this.sfx = {
      explosions: [
        this.sound.add("sndExp1"),
        this.sound.add("sndExp2")
      ],
      bullet: this.sound.add("sndBullet")
    };

    this.enemies = this.add.group();
    this.enemyBullets = this.add.group();
    this.playerBullets = this.add.group();

    this.time.addEvent({
      delay: 800,
      callback: function() {
        let enemy;

        if (Phaser.Math.Between(0, 10) >= 3) {
          enemy = new EnemyOne(
            this,
            800,
            Phaser.Math.Between(0, this.game.config.height - 30)
          );
        } else if (Phaser.Math.Between(0, 10) >= 7) {
          enemy = new EnemyTwo(
            this,
            800,
            Phaser.Math.Between(0, this.game.config.height - 30)
          );
        } else {
          enemy = new EnemyThree(
            this,
            800,
            Phaser.Math.Between(0, this.game.config.height - 30)
          );
        }

        if (enemy !== null) {
          enemy.setScale(Phaser.Math.Between(10, 15) * 0.1);
          this.enemies.add(enemy);
        }
      },
      callbackScope: this,
      loop: true
    });

    this.physics.add.collider(this.playerBullets, this.enemies, function(playerBullet, enemy) {
      if (enemy) {
        if (enemy.onDestroy !== undefined) {
          enemy.onDestroy();
        }

        enemy.explode(true);
        playerBullet.destroy();
      }
    });

    this.physics.add.overlap(this.player, this.enemyBullets, function(player, bullet) {
      if (!player.getData("isDead") &&
          !bullet.getData("isDead")) {
        player.explode(false);
        player.onDestroy();
        bullet.destroy();
      }
    });

    this.physics.add.overlap(this.player, this.enemies, function(player, enemy) {
      if (!player.getData("isDead") && !enemy.getData("isDead")) {
        player.explode(false);
        enemy.explode(true);
        player.onDestroy();
      }
    });
  }

  update() {
    this.bg1.tilePositionX += 2;
    this.bg2.tilePositionX += 1;

    if (!this.player.getData('isDead')) {
      this.player.update();

      if (this.keyUp.isDown) {
        this.player.moveUp();
      } else if (this.keyDown.isDown) {
        this.player.moveDown();
      }

      if (this.keyLeft.isDown) {
        this.player.moveLeft();
      } else if (this.keyRight.isDown) {
        this.player.moveRight();
      }

      if (this.keySpace.isDown) {
        this.player.setData("isShooting", true);
      } else {
        this.player.setData("timerShootTick", this.player.getData("timerShootDelay") - 1);
        this.player.setData("isShooting", false);
      }
    }

    for (var i = 0; i < this.enemies.getChildren().length; i++) {
      var enemy = this.enemies.getChildren()[i];

      enemy.update();

      if (enemy.x < -enemy.displayWidth ||
        enemy.x > this.game.config.width + enemy.displayWidth ||
        enemy.y < -enemy.displayHeight * 4 ||
        enemy.y > this.game.config.height + enemy.displayHeight) {
        if (enemy) {
          if (enemy.onDestroy !== undefined) {
            enemy.onDestroy();
          }
          enemy.destroy();
        }
      }
    }

    for (var i = 0; i < this.playerBullets.getChildren().length; i++) {
      var bullet = this.playerBullets.getChildren()[i];
      bullet.update();

      if (bullet.x < -bullet.displayWidth ||
        bullet.x > this.game.config.width + bullet.displayWidth ||
        bullet.y < -bullet.displayHeight * 4 ||
        bullet.y > this.game.config.height + bullet.displayHeight) {
        if (bullet) {
          bullet.destroy();
        }
      }
    }
  }
}