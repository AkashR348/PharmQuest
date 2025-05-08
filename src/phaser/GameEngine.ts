// src/phaser/GameEngine.ts
import Phaser from 'phaser';
import BootScene   from './scenes/BootScene';
import HomeScene   from './scenes/HomeScene';
import BattleScene from './scenes/BattleScene';
import ScoreScene  from './scenes/ScoreScene';

export interface InitBattleData {
  level: number;
  timeOfDay: 'day' | 'night';
  location: 'hospital' | 'pharm';
}

/**
 * Creates the Phaser.Game instance.
 * @param canvas The <canvas> element to render into.
 * @param initData Optional data: if present, BootScene will skip the menu
 *                 and start straight into BattleScene with these params.
 */
export function createGame(
  canvas: HTMLCanvasElement,
  initData?: InitBattleData
) {
  const game = new Phaser.Game({
    type: Phaser.WEBGL,
    canvas,
    width:  canvas.clientWidth,
    height: canvas.clientHeight,
    scene:  [BootScene, HomeScene, BattleScene, ScoreScene],
    scale: {
      mode: Phaser.Scale.RESIZE,
      autoCenter: Phaser.Scale.CENTER_BOTH,
    },
  });

  // store it in the global registry so BootScene can pick it up
  if (initData) {
    game.registry.set('initData', initData);
  }

  return game;
}
