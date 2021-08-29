class SceneMainMenu extends Phaser.Scene {
  constructor() {
    super({ key: 'SceneMainMenu' });
  }

  preload() {
    this.load.image('btnPlay', '../dist/assets/sprBtnPlay.png');
    this.load.image('btnPlayDown', '../dist/assets/sprBtnPlayDown.png');
    this.load.image('btnPlayOver', '../dist/assets/sprBtnPlayHover.png');
  }

  create() {
    this.scene.start('SceneMain');
    console.log('hello');
  }
}