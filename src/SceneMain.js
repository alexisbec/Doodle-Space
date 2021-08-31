class SceneMain extends Phaser.Scene {
  constructor() {
    super({ key: 'SceneMain' })
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

    this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    this.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
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

    this.enemies = this.add.group();
    this.enemyLasers = this.add.group();
    this.playerLasers = this.add.group();

    this.time.addEvent({
      delay: 1500,
      callback: function() {
        let enemy = null;

        if (Phaser.Math.Between(0, 10) >= 3) {
          enemy = new EnemyOne(
            this,
            800,
            Phaser.Math.Between(0, this.game.config.height - 10)
          );
        } else if (Phaser.Math.Between(0, 10) >= 6) {
          enemy = new EnemyTwo(
            this,
            800,
            Phaser.Math.Between(0, this.game.config.height - 10)
          );
        } else {
          enemy = new EnemyThree(
            this,
            800,
            Phaser.Math.Between(0, this.game.config.height - 10)
          );
        }
      },
      callbackScope: this,
      loop: true
    });
  }

  update() {
    this.bg1.tilePositionX += 2;
    this.bg2.tilePositionX += 1;

    if (!this.player.getData('isDead')) {
      this.player.update();
      if (this.keyW.isDown) {
        this.player.moveUp();
      }
      else if (this.keyS.isDown) {
        this.player.moveDown();
      }
      if (this.keyA.isDown) {
        this.player.moveLeft();
      }
      else if (this.keyD.isDown) {
        this.player.moveRight();
      }
    }
  }
}