import Phaser from 'phaser';

/**
 * HomeScene: presents level/location/time-of-day options to start a battle
 */
export default class HomeScene extends Phaser.Scene {
  constructor() {
    super({ key: 'HomeScene' });
  }

  create() {
    const { width: cw, height: ch } = this.scale;

    // Title
    this.add.text(cw / 2, ch * 0.1, 'PharmQuest', {
      fontFamily: 'Arial',
      fontSize: '48px',
      color: '#ffffff',
      align: 'center'
    }).setOrigin(0.5);

    // Button configurations for each background variant
    const buttonConfigs: Array<{
      x: number;
      y: number;
      label: string;
      timeOfDay: 'day' | 'night';
      location: 'hospital' | 'pharm';
    }> = [
      { x: cw * 0.25, y: ch * 0.3, label: 'Hospital - Day',   timeOfDay: 'day',   location: 'hospital' },
      { x: cw * 0.75, y: ch * 0.3, label: 'Hospital - Night', timeOfDay: 'night', location: 'hospital' },
      { x: cw * 0.25, y: ch * 0.5, label: 'Pharmacy - Day',   timeOfDay: 'day',   location: 'pharm'    },
      { x: cw * 0.75, y: ch * 0.5, label: 'Pharmacy - Night', timeOfDay: 'night', location: 'pharm'    },
    ];

    // Create interactive buttons
    buttonConfigs.forEach(cfg => {
      const btn = this.add.text(cfg.x, cfg.y, cfg.label, {
        fontSize: '24px',
        color: '#000000',
        backgroundColor: '#ffffff',
        padding: { x: 12, y: 8 },
        align: 'center'
      })
      .setOrigin(0.5)
      .setInteractive({ useHandCursor: true });

      // Hover effects
      btn.on('pointerover', () => btn.setStyle({ backgroundColor: '#eeeeee' }));
      btn.on('pointerout',  () => btn.setStyle({ backgroundColor: '#ffffff' }));

      // On click: start BattleScene with chosen parameters
      btn.on('pointerup', () => {
        this.scene.start('BattleScene', {
          level:     1,
          timeOfDay: cfg.timeOfDay,
          location:  cfg.location
        });
      });
    });
  }
}
