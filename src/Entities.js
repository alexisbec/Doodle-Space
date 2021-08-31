class Entity extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, key, type) {
    super(scene, x, y, key);

    this.scene = scene;
    this.scene.add.existing(this);
    this.scene.physics.world.enableBody(this, 0);
    this.setData('type', type);
    this.setData('isDead', false);
  }
}

class Player extends Entity {
  constructor(scene, x, y, key) {
    super(scene, x, y, key, 'Player');

    this.setData('speed', 200);
    this.play('ship');
    this.setData("isShooting", false);
    this.setData("timerShootDelay", 10);
    this.setData("timerShootTick", this.getData("timerShootDelay") - 1);
  }

  moveUp() {
    this.body.velocity.y = -this.getData("speed");
  }
  
  moveDown() {
    this.body.velocity.y = this.getData("speed");
  }
  
  moveLeft() {
    this.body.velocity.x = -this.getData("speed");
  }
  
  moveRight() {
    this.body.velocity.x = this.getData("speed");
  }

  update() {
    this.body.setVelocity(0, 0);

    this.x = Phaser.Math.Clamp(this.x, 0, this.scene.game.config.width - 35);
    this.y = Phaser.Math.Clamp(this.y, 0, this.scene.game.config.height - 20);

    if (this.getData("isShooting")) {
      if (this.getData("timerShootTick") < this.getData("timerShootDelay")) {
        this.setData("timerShootTick", this.getData("timerShootTick") + 0.5);
      } else {
        var laser = new PlayerLaser(this.scene, this.x, this.y);
        this.scene.playerLasers.add(laser);

        this.setData("timerShootTick", 0);
      }
    }
  }
}

class PlayerLaser extends Entity {
  constructor(scene, x, y) {
    super(scene, x, y, 'bullet');
    this.body.velocity.x = 200
  }
}

class EnemyOne extends Entity {
  constructor(scene, x, y) {
    super(scene, x, y, 'enemy_1');

    this.body.velocity.x = -Phaser.Math.Between(100, 150);
    this.play('enemy_1');
  }
}

class EnemyTwo extends Entity {
  constructor(scene, x, y) {
    super(scene, x, y, 'enemy_2');

    this.body.velocity.x = -Phaser.Math.Between(100, 150);
    this.play('enemy_2');
  }
}

class EnemyThree extends Entity {
  constructor(scene, x, y) {
    super(scene, x, y, 'enemy_3');

    this.body.velocity.x = -Phaser.Math.Between(100, 150);
    this.play('enemy_3');
  }
}