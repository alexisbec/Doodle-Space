class Title extends Phaser.Scene {
  constructor() {
    super({ key: 'Title' });
  }

  preload() {
    this.load.image('logo', '../dist/assets/logo.png');
    this.load.image('startBtn', '../dist/assets/startBtn.png');
    this.load.image('bg1', '../dist/assets/bg1.jpg');
    this.load.image('bg2', '../dist/assets/bg2.png');
  }

  create() {
    this.bg1 = this.add.tileSprite(300, 200, 1000, 580, 'bg1');
    this.bg2 = this.add.tileSprite(300, 200, 1000, 580, 'bg2');

    this.logo = this.add.image(this.game.config.width * 0.5, 120, 'logo');
    this.logo.setOrigin(0.5);

    this.startBtn = this.add.sprite(
      this.game.config.width * 0.5,
      this.game.config.height - 170,
      "startBtn"
    );

    this.startBtn.setInteractive();

    this.startBtn.on("pointerup", function() {
      this.startBtn.setTexture("startBtn");
      this.scene.start("Game");
    }, this);
  }

  update() {
    this.bg1.tilePositionX += 2;
    this.bg2.tilePositionX += 1;
  }
}