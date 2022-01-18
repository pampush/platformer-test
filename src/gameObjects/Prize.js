class Prize {
  constructor(scene, ee, playerSprite, secret) {
    this.scene = scene;
    this.sprites = [];
    this.ee = ee;
    this.playerSprite = playerSprite;
    this.gameObjectWithBody = {};
    this.secretBlock = secret;

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

    for (const tileSprite of this.sprites) {
      ee.once("rollSecret", (id) => {
        if (id !== tileSprite.getData("id")) return;
        this.ee.emit("attachCollider", tileSprite);

        this.scene.tweens.add({
          targets: tileSprite,
          ease: "Power1",
          y: "-=16",
          duration: 500,
          //onComplete: () => tileSprite.destroy(),
        });

        this.enableOverlapWith(playerSprite);
        //tileSprite.setY(this.prizeObjects[0].y - 32);
      });
    }
  }

  enableOverlapWith(gameObject) {
    this.player = gameObject;
    for (const tileSprite of this.sprites) {
      this.scene.physics.add.existing(tileSprite, false);
      //this.scene.physics.add.collider(tileSprite, this.secretBlock);

      this.scene.physics.add.overlap(
        tileSprite,
        gameObject,
        () => this.collect(tileSprite),
        null,
        this
      );
    }
    return this;
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
}

export default Prize;
