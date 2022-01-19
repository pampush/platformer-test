class SecretBlock {
  constructor(scene, ee) {
    this.scene = scene;
    this.sprites = {};
    this.ee = ee;

    this.secretObjects = scene.map.getObjectLayer("secret").objects;

    const secretCoordinates = scene.tileset.texCoordinates[2]; // 962 is the tile index in tiled for the secret
    //const secretRoot = scene.platform.getTileAt(76, 23); // Get the root of the secret with tile pos
    for (const secretObject of this.secretObjects) {
      this.sprites[secretObject.name] = scene.add
        .tileSprite(secretObject.x, secretObject.y, 16, 16, "tiles")
        .setOrigin(0, 1)
        .setTilePosition(secretCoordinates.x, secretCoordinates.y)
        .setData({ id: secretObject.name });
    }
  }

  collideWith(gameObject) {
    this.player = gameObject;
    for (const tileSprite of Object.values(this.sprites)) {
      this.scene.physics.add.existing(tileSprite, true);
      this.collider = this.scene.physics.add.collider(
        tileSprite,
        gameObject,
        () => this.rollSecret(tileSprite, this.collider),
        null,
        this
      );
    }
    return this;
  }

  rollSecret(tileSprite, collider) {
    //if(tileSprite.getData('id') !== )
    const secretCoordinates = this.scene.tileset.texCoordinates[1];
    if (this.scene.player.sprite.body.touching.up) {
      tileSprite.setTilePosition(secretCoordinates.x, secretCoordinates.y);
      //collider.destroy();
      this.ee.emit("rollSecret", tileSprite.getData("id"));
    }
  }
}

export default SecretBlock;
