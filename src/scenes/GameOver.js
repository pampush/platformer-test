// eslint-disable-next-line no-undef
class GameOver extends Phaser.Scene {
  constructor() {
    super("GameOver");
  }

  create() {
    const screenCenterX =
      this.cameras.main.worldView.x + this.cameras.main.width / 2;
    const screenCenterY =
      this.cameras.main.worldView.y + this.cameras.main.height / 2;
    this.cameras.main.setBackgroundColor("#000");
    this.add.text(screenCenterX, screenCenterY, "GAME OVER").setOrigin(0.5);
    //document.getElementsByClassName("game-over")[0].classList.add("visible");
  }
}

export default GameOver;
