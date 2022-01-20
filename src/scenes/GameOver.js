// eslint-disable-next-line no-undef
class GameOver extends Phaser.Scene {
  constructor() {
    super("GameOver");
  }
  init(data) {
    console.log(data);
    this.score = data.score;
    this.game = data.game;
  }
  create() {
    const screenCenterX =
      this.cameras.main.worldView.x + this.cameras.main.width / 2;
    const screenCenterY =
      this.cameras.main.worldView.y + this.cameras.main.height / 2;
    this.cameras.main.setBackgroundColor("#000");
    this.add
      .text(screenCenterX, screenCenterY, `GAME OVER \n SCORE: ${this.score}`)
      .setOrigin(0.5);

    this.time.addEvent({
      delay: 1500,
      loop: false,
      callback: () => {
        console.log(this.game.isActive("Game"));
        this.scene.start("Game");
      },
    });
  }
}

export default GameOver;
