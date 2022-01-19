class Prize {
  constructor(scene, ee, playerSprite, secret) {
    this.scene = scene;
    this.sprites = [];
    this.ee = ee;
    this.playerSprite = playerSprite;
    this.gameObjectWithBody = {};
    this.secretBlock = secret;
    this.isPhysicsEnabled = {};

    this.prizeObjects = scene.map.getObjectLayer("prize").objects;
    const prizeCoordinates = scene.tileset.texCoordinates[440];
    for (const prizeObject of this.prizeObjects) {
      this.sprites.push(
        scene.add
          .tileSprite(prizeObject.x, prizeObject.y, 16, 16, "tiles")
          .setOrigin(0, 1)
          .setDepth(-1)
          .setTilePosition(prizeCoordinates.x, prizeCoordinates.y)
          .setData({ id: prizeObject.name })
      );
    }

    //this.group = this.scene.physics.add.group(...this.sprites);

    for (const tileSprite of this.sprites) {
      ee.on("rollSecret", (id) => {
        if (id !== tileSprite.getData("id")) return;
        tileSprite.setDepth(1);

        this.scene.tweens.add({
          targets: tileSprite,
          ease: "Power1",
          y: "-=32",
          duration: 500,
          onComplete: () => {
            this.enableOverlapWith(playerSprite, tileSprite);
            this.ee.emit("attachCollider", tileSprite);
            this.isPhysicsEnabled[id] = true;
          },
        });
      });
    }
  }

  enableOverlapWith(gameObject, tileSprite) {
    this.player = gameObject;
    this.scene.physics.add.existing(tileSprite, false);

    this.scene.physics.add.overlap(
      tileSprite,
      gameObject,
      () => this.collect(tileSprite),
      null,
      this
    );
  }

  collect(tileSprite) {
    if (!tileSprite.body.touching.none) {
      //tileSprite.body.setEnable(false);
      this.scene.tweens.add({
        targets: tileSprite,
        ease: "Power1",
        scaleX: 0,
        scaleY: 0,
        duration: 500,
        onComplete: () => tileSprite.destroy(),
      });
    }
  }

  update() {
    for (const tileSprite of this.sprites) {
      if (this.isPhysicsEnabled[tileSprite.getData("id")]) {
        if (tileSprite.body.blocked.right) {
          tileSprite.body.direction = "LEFT";
        }

        if (tileSprite.body.blocked.left) {
          tileSprite.body.direction = "RIGHT";
        }

        if (tileSprite.body.direction === "RIGHT") {
          tileSprite.body.setVelocityX(100);
        } else {
          tileSprite.body.setVelocityX(-100);
        }
      }
    }
  }

  moveTile(tileSprite) {
    let direction = -1;
    return {
      move: () => {
        if (direction > 0) tileSprite.body.setVelocityX(100);
        else tileSprite.body.setVelocityX(-100);
      },
      setDirection: (value) => (direction = value),
    };
  }
}

export default Prize;
