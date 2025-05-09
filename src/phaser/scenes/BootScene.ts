// src/phaser/scenes/BootScene.ts
import Phaser from 'phaser';
import { InitBattleData } from '@/phaser/GameEngine';

export default class BootScene extends Phaser.Scene {
    // This scene is responsible for loading all assets and setting up the game.
    constructor() { super({ key: 'BootScene' }); }

preload() {
    // in BootScene.preload()

// Player sheets are 64×96px per frame (4×2×32, 6×2×48, etc.)
this.load.spritesheet('player_idle',   'assets/sprites/player/idle@2x.png',   { frameWidth: 230, frameHeight: 545 });
this.load.spritesheet('player_hit',    'assets/sprites/player/hit@2x.png',    { frameWidth: 287, frameHeight: 562 });

// Pill Phantom & Dosage Dice sheets are 64×64px per frame
this.load.spritesheet('phantom_idle',   'assets/sprites/pillphantom/idle@2x.png',   { frameWidth: 235, frameHeight: 343 });
this.load.spritesheet('phantom_attack', 'assets/sprites/pillphantom/attack@2x.png', { frameWidth: 245, frameHeight: 768 });
this.load.spritesheet('phantom_defeat', 'assets/sprites/pillphantom/defeat@2x.png', { frameWidth: 286, frameHeight: 311 });

this.load.spritesheet('dice_idle',   'assets/sprites/dosagedice/idle@2x.png',   { frameWidth: 227, frameHeight: 192 });
this.load.spritesheet('dice_attack', 'assets/sprites/dosagedice/attack@2x.png', { frameWidth: 208, frameHeight: 193 });
this.load.spritesheet('dice_defeat', 'assets/sprites/dosagedice/defeat@2x.png', { frameWidth: 189, frameHeight: 259 });

    // Load the question bank
    this.load.json('questions', 'assets/questions.json');

        // load all four backgrounds
        this.load.image('bg_hospital_night', 'assets/sprites/hospital_night.png');
        this.load.image('bg_hospital_day',   'assets/sprites/hospital_day.png');
        this.load.image('bg_pharm_night',    'assets/sprites/pharm_night.png');
        this.load.image('bg_pharm_day',      'assets/sprites/pharm_day.png');




    this.load.image('player_attack0', 'assets/sprites/player/player_attack0.png');
    this.load.image('player_attack1', 'assets/sprites/player/player_attack1.png');
    this.load.image('player_attack2', 'assets/sprites/player/player_attack2.png');
    this.load.image('player_attack3', 'assets/sprites/player/player_attack3.png');
    this.load.image('player_attack4', 'assets/sprites/player/player_attack4.png');
   
  this.load.image('player_defeat0', 'assets/sprites/player/player_defeat0.png');
  this.load.image('player_defeat1', 'assets/sprites/player/player_defeat1.png');
  this.load.image('player_defeat2', 'assets/sprites/player/player_defeat2.png');
  this.load.image('player_defeat3', 'assets/sprites/player/player_defeat3.png');

  this.load.image('home_bg', 'assets/sprites/homepage.png');
  this.load.image('start_button', 'assets/sprites/startButton.png');
  }

  create() {
    // You can make the loaded questions accessible via cache:
    const questions = this.cache.json.get('questions') as any[];
    console.log(`Loaded ${questions.length} questions`);


// ─── Player Animations ──────────────────────────
    this.anims.create({
      key: 'player_idle',
      frames: this.anims.generateFrameNumbers('player_idle', { start: 0, end: 3 }),
      frameRate: 5,
      repeat: -1
    });
    this.anims.create({
      key: 'player_attack',
      frames: [
        { key: 'player_attack0' },
        { key: 'player_attack1' },
        { key: 'player_attack2' },
        { key: 'player_attack3' },
        { key: 'player_attack4' }
      ],
      frameRate: 6,
      repeat: 0
    });
    this.anims.create({
      key: 'player_hit',
      frames: this.anims.generateFrameNumbers('player_hit', { start: 0, end: 2 }),
      frameRate: 4,
      repeat: 0
    });
    this.anims.create({
      key: 'player_defeat',
      frames: [
        { key: 'player_defeat0' },
        { key: 'player_defeat1' },
        { key: 'player_defeat2' },
        { key: 'player_defeat3' }
      ],
      frameRate: 8,
      repeat: 0
    });

    // ─── Pill Phantom Animations ────────────────────
    this.anims.create({
      key: 'phantom_idle',
      frames: this.anims.generateFrameNumbers('phantom_idle', { start: 0, end: 3 }),
      frameRate: 4,
      repeat: -1
    });
    this.anims.create({
      key: 'phantom_attack',
      frames: this.anims.generateFrameNumbers('phantom_attack', { start: 0, end: 3 }),
      frameRate: 6,
      repeat: 0
    });
    this.anims.create({
      key: 'phantom_defeat',
      frames: this.anims.generateFrameNumbers('phantom_defeat', { start: 0, end: 5 }),
      frameRate: 6,
      repeat: 0
    });

    // ─── Dosage Dice Animations ─────────────────────
    this.anims.create({
      key: 'dice_idle',
      frames: this.anims.generateFrameNumbers('dice_idle', { start: 0, end: 3 }),
      frameRate: 6,
      repeat: -1
    });
    this.anims.create({
      key: 'dice_attack',
      frames: this.anims.generateFrameNumbers('dice_attack', { start: 0, end: 3 }),
      frameRate: 10,
      repeat: 0
    });
    this.anims.create({
      key: 'dice_defeat',
      frames: this.anims.generateFrameNumbers('dice_defeat', { start: 0, end: 4 }),
      frameRate: 8,
      repeat: 0
    });

  const initData = this.registry.get('initData') as InitBattleData | undefined;




 console.log('player idle texture:', this.textures.exists('player_idle'));
console.log('player attack0 texture:', this.textures.exists('player_attack0'));
console.log('player attack1 texture:', this.textures.exists('player_attack1'));
console.log('player attack2 texture:', this.textures.exists('player_attack2'));
console.log('player attack3 texture:', this.textures.exists('player_attack3'));
console.log('player attack4 texture:', this.textures.exists('player_attack4'));
console.log('player defeat0 texture:', this.textures.exists('player_defeat0'));
console.log('player defeat1 texture:', this.textures.exists('player_defeat1'));
console.log('player defeat2 texture:', this.textures.exists('player_defeat2'));
console.log('player defeat3 texture:', this.textures.exists('player_defeat3'));
console.log('player hit texture:', this.textures.exists('player_hit'));
console.log('phantom idle texture:', this.textures.exists('phantom_idle'));
console.log('phantom attack texture:', this.textures.exists('phantom_attack'));
console.log('phantom defeat texture:', this.textures.exists('phantom_defeat'));
console.log('dice idle texture:', this.textures.exists('dice_idle'));
console.log('dice attack texture:', this.textures.exists('dice_attack'));
console.log('dice defeat texture:', this.textures.exists('dice_defeat'));



if (initData) {
    // jump straight into the battle the user requested
    this.scene.start('BattleScene', initData);
  } else {
    // normal flow: go to main menu
    this.scene.start('HomeScene');
  }

  }
}

