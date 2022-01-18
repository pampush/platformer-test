class Blocks {
  constructor(scene) {
    this.scene = scene;

    this.blocks = this.scene.physics.add.group({
      immovable: true,
      allowGravity: false,
    });

    // const blockObjects = this.scene.map.getObjectLayer("shroom").objects;
    // console.log(blockObjects);
    const blockObjects = this.scene.map.createFromObjects("shroom");

    for (const block of blockObjects) {
      block
        .setTexture("tiles")
        .setScale(1) // setTexture resets the scale to .5 so this is needed
        .setOrigin(0)
        .setDepth(-1);
      this.blocks.add(block);
    }
  }
}

export default Blocks;
