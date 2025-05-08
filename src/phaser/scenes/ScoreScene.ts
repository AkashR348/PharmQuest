// src/phaser/scenes/ScoreScene.ts
import Phaser from 'phaser';

interface ScoreData {
  didWin: boolean;
  level: number;
  timeOfDay: 'day' | 'night';
  location: 'hospital' | 'pharm';
}

export default class ScoreScene extends Phaser.Scene {
  private didWin!: boolean;
  private level!: number;
  private timeOfDay!: 'day' | 'night';
  private location!: 'hospital' | 'pharm';

  constructor() {
    super({ key: 'ScoreScene' });
  }

  init(data: ScoreData) {
    this.didWin     = data.didWin;
    this.level      = data.level;
    this.timeOfDay  = data.timeOfDay;
    this.location   = data.location;
  }

  create() {
    const { width: w, height: h } = this.scale;
    const titleText = this.didWin ? 'Victory!' : 'Defeat';

    // Title
    this.add.text(w / 2, h * 0.2, titleText, {
      fontSize: '48px',
      color: '#ffffff',
      align: 'center'
    }).setOrigin(0.5);

    // Level info
    this.add.text(w / 2, h * 0.35, `Level ${this.level}`, {
      fontSize: '24px',
      color: '#ffffff',
      align: 'center'
    }).setOrigin(0.5);

    // Next / Retry button
    const nextLabel = this.didWin ? 'Next Level' : 'Retry Level';
    const nextBtn = this.add.text(w / 2, h * 0.6, nextLabel, {
      fontSize: '32px',
      color: '#ffffff',
      backgroundColor: '#0008',
      padding: { x: 12, y: 6 }
    })
    .setOrigin(0.5)
    .setInteractive({ useHandCursor: true })
    .on('pointerup', () => {
      const nextLevel = this.didWin ? this.level + 1 : this.level;
      this.scene.start('BattleScene', {
        level: nextLevel,
        timeOfDay: this.timeOfDay,
        location: this.location
      });
    })
    .on('pointerover', () => nextBtn.setStyle({ backgroundColor: '#3333' }))
    .on('pointerout',  () => nextBtn.setStyle({ backgroundColor: '#0008' }));

    // Return Home button
    const homeBtn = this.add.text(w / 2, h * 0.75, 'Return Home', {
      fontSize: '24px',
      color: '#ffffff',
      backgroundColor: '#0008',
      padding: { x: 12, y: 6 }
    })
    .setOrigin(0.5)
    .setInteractive({ useHandCursor: true })
    .on('pointerup', () => {
      this.scene.start('HomeScene');
    })
    .on('pointerover', () => homeBtn.setStyle({ backgroundColor: '#3333' }))
    .on('pointerout',  () => homeBtn.setStyle({ backgroundColor: '#0008' }));
  }
}
