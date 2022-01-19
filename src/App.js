import Phaser from "phaser";

import Game from "./scenes/Game.js";
import GameOver from "./scenes/GameOver.js";

import { useEffect } from "react";
import "./App.css";
const config = {
  width: 640,
  height: 480,
  parent: "mario",
  backgroundColor: "#FFFFAC",
  title: "Tilemap",
  url: "webtips.dev",
  pixelArt: true,
  physics: {
    default: "arcade",
    arcade: {
      // debug: true, // Set it to true if you want debugger enabled by default
      gravity: {
        y: 1000,
      },
    },
  },
  scene: [Game, GameOver],
};

function App() {
  useEffect(() => {
    new Phaser.Game(config);
    return () => {};
  }, []);
  return (
    <>
      <div id="mario">
        <div className="game-over">Game Over</div>
        <div class="score">
          Score: <span class="score-amount">0</span>
        </div>
      </div>
    </>
  );
}

export default App;
