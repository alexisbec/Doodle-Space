window.onload = function() {
  const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 480,
    backgroundColor: "black",
    physics: {
      default: "arcade",
      arcade: {
        gravity: { x: 0, y: 0 }
      }
    },
    scene: [
      SceneMainMenu,
      SceneMain,
      SceneGameOver
    ],
    pixelArt: true,
    roundPixels: true
  }
  
  const game = new Phaser.Game(config);
}