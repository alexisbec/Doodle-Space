class Entity extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, key, type) {
    super(scene, x, y, key);

    this.scene = scene;
    this.scene.add.existing(this);
    this.scene.physics.world.enableBody(this, 0);
    this.setData('type', type);
    this.setData('isDead', false);
  }

  explode(canDestroy) {
    if (!this.getData("isDead")) {
      this.setTexture("explosion");
      this.play("explosion");
      this.scene.sfx.explosions[Phaser.Math.Between(0, this.scene.sfx.explosions.length - 1)].play();
      if (this.shootTimer !== undefined) {
        if (this.shootTimer) {
          this.shootTimer.remove(false);
        }
      }

      this.setAngle(0);
      this.body.setVelocity(0, 0);
      this.on('animationcomplete', function() {
        if (canDestroy) {
          this.destroy();
        } else {
          this.setVisible(false);
        }
      }, this);
      this.setData("isDead", true);
    }
  }
}

class Player extends Entity {
  constructor(scene, x, y, key) {
    super(scene, x, y, key, 'Player');

    this.setData('speed', 200);
    this.play('ship');
    this.setData("isShooting", false);
    this.setData("timerShootDelay", 15);
    this.setData("timerShootTick", this.getData("timerShootDelay"));
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

  onDestroy() {
    this.scene.time.addEvent({
      delay: 1000,
      callback: function() {
        this.scene.scene.start("SceneGameOver");
      },
      callbackScope: this,
      loop: false
    });
  }

  update() {
    this.body.setVelocity(0, 0);

    this.x = Phaser.Math.Clamp(this.x, 0, this.scene.game.config.width - 35);
    this.y = Phaser.Math.Clamp(this.y, 0, this.scene.game.config.height - 20);

    if (this.getData("isShooting")) {
      if (this.getData("timerShootTick") < this.getData("timerShootDelay")) {
        this.setData("timerShootTick", this.getData("timerShootTick") + 0.5);
      } else {
        let bullet = new PlayerBullet(this.scene, this.x, this.y);
        this.scene.playerBullets.add(bullet);

        this.scene.sfx.bullet.play();
        this.setData("timerShootTick", 0);
      }
    }
  }
}

class PlayerBullet extends Entity {
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