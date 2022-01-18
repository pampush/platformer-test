class SecretBlock {
  constructor(scene) {
    const secretBlockObjects = scene.map.getObjectLayer("secretBlock").objects;
    const secretBlockCoordinates = scene.tileset.texCoordinates[2]; // 962 is the tile index in tiled for the secretBlock
    //const secretBlockRoot = scene.platform.getTileAt(76, 23); // Get the root of the secretBlock with tile pos

    this.scene = scene;
    for (const secretBlockObject of secretBlockObjects) {
      console.log(secretBlockObject);
      this.sprite = scene.add
        .tileSprite(secretBlockObject.x, secretBlockObject.y, 16, 16, "tiles")
        .setOrigin(0, 10)
        .setTilePosition(secretBlockCoordinates.x, secretBlockCoordinates.y);
    }
  }
}

export default SecretBlock;
