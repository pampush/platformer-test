class Castle {
  constructor(scene) {
    const tileMapLayer = scene.map
      .createLayer("castle", scene.tileset)
      .setDepth(1);

    tileMapLayer.setX(scene.cameras.main.worldView.x);
  }
}

export default Castle;
