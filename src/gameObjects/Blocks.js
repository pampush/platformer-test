class Blocks {
  constructor(scene) {
    this.scene = scene;
    this.sprites = [];

    // this.group = this.scene.physics.add.staticGroup({
    //   key: "shroom",
    // });

    this.flagObjects = scene.map.getObjectLayer("shroom").objects;
    const flagCoordinates = scene.tileset.texCoordinates[4]; // 962 is the tile index in tiled for the flag
    //const flagRoot = scene.platform.getTileAt(76, 23); // Get the root of the flag with tile pos

    this.scene = scene;
    for (const flagObject of this.flagObjects) {
      console.log(flagObject);
      this.sprites.push(
        scene.add
          .tileSprite(flagObject.x, flagObject.y, 16, 16, "tiles")
          .setOrigin(0, 1)
          .setTilePosition(flagCoordinates.x, flagCoordinates.y)
      );
    }
  }

  collideWith(gameObject) {
    this.player = gameObject;
    for (const tileSprite of this.sprites) {
      this.scene.physics.add.existing(tileSprite, true);
      this.scene.physics.add.collider(tileSprite, gameObject);
    }
    return this;
  }

  update() {}
}

export default Blocks;
