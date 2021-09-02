class GameOver extends Phaser.Scene {
  constructor() {
    super({ key: 'GameOver' });
  }

  preload() {
    this.load.image('gameOver', '../dist/assets/gameOver.png');
    this.load.image('restartBtn', '../dist/assets/restartBtn.png');
    this.load.image('bg1', '../dist/assets/bg1.jpg');
    this.load.image('bg2', '../dist/assets/bg2.png');
  }

  create() {
    this.bg1 = this.add.tileSprite(300, 200, 1000, 580, 'bg1');
    this.bg2 = this.add.tileSprite(300, 200, 1000, 580, 'bg2');

    this.gameOver = this.add.image(this.game.config.width * 0.5, 120, 'gameOver');
    this.gameOver.setOrigin(0.5);

    this.restartBtn = this.add.sprite(
      this.game.config.width * 0.5,
      this.game.config.height - 170,
      'restartBtn'
    );

    this.restartBtn.setInteractive();

    this.restartBtn.on("pointerup", function() {
      this.restartBtn.setTexture("restartBtn");
      this.scene.start("Game");
    }, this);
  }

  update() {
    this.bg1.tilePositionX += 2;
    this.bg2.tilePositionX += 1;
  }
}