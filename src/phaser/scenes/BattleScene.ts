// src/phaser/scenes/BattleScene.ts
import Phaser from 'phaser';

interface BattleData {
  level: number;
  timeOfDay: 'day' | 'night';
  location: 'hospital' | 'pharm';
}

export default class BattleScene extends Phaser.Scene {
  private level!: number;
  private timeOfDay!: 'day' | 'night';
  private location!: 'hospital' | 'pharm';
  private questions!: any[];
  private currentQuestion!: any;
  private playerHP = 100;
  private enemyHP = 50;

  // display objects
  private bgImage!: Phaser.GameObjects.Image;
  private playerSprite!: Phaser.GameObjects.Sprite;
  private enemySprite!: Phaser.GameObjects.Sprite;
  private playerBar!: Phaser.GameObjects.Graphics;
  private enemyBar!: Phaser.GameObjects.Graphics;
  private questionBg?: Phaser.GameObjects.Rectangle;
  private promptText?: Phaser.GameObjects.Text;
  private choiceTexts: Phaser.GameObjects.Text[] = [];
  private choiceBgs: Phaser.GameObjects.Rectangle[] = [];

  constructor() {
    super({ key: 'BattleScene' });
  }

  init(data: BattleData) {
    this.level     = data.level;
    this.timeOfDay = data.timeOfDay;
    this.location  = data.location;
  }

  create() {
    const { width: w, height: h } = this.scale;
  
    // 0️⃣ Reset health
    this.playerHP = 100;
    this.enemyHP  = 50 * this.level;
  
    // 1️⃣ Background (depth 0)
    const bgKey = `bg_${this.location}_${this.timeOfDay}`;
    this.bgImage = this.add.image(0, 0, bgKey)
      .setOrigin(0)
      .setDisplaySize(w, h)
      .setDepth(0);
    
    // Listen for resize events
    this.scale.on('resize', this.resize, this);
  
    // Place player and enemy sprites lower
    const spriteY = h * 0.7; // 70% down the screen

    this.playerSprite = this.add
      .sprite(100, spriteY, 'player_idle', 0)
      .setScale(0.5)
      .play('player_idle');

    const enemyKey = this.level === 1 ? 'phantom_idle' : 'dice_idle';
    this.enemySprite = this.add
      .sprite(w - 100, spriteY, enemyKey, 0)
      .setScale(0.5)
      .play(enemyKey);
  
    // 4️⃣ HP bars (depth 2)
    this.playerBar = this.add.graphics().setDepth(2);
    this.enemyBar  = this.add.graphics().setDepth(2);
    this.redrawBars();
  
    // 5️⃣ Prompt text (depth 2)
    this.questions = this.cache.json.get('questions') as any[];
    this.askQuestion();
  }

  private resize(gameSize: Phaser.Structs.Size) {
    const width = gameSize.width;
    const height = gameSize.height;

    // Resize background
    if (this.bgImage) {
      this.bgImage.setDisplaySize(width, height);
    }

    // Reposition player and enemy sprites
    if (this.playerSprite) {
      this.playerSprite.y = height * 0.7;
    }
    if (this.enemySprite) {
      this.enemySprite.x = width - 100;
      this.enemySprite.y = height * 0.7;
    }

    // Redraw HP bars
    if (this.playerBar && this.enemyBar) {
      this.redrawBars();
    }

    // Reposition question and choices
    if (this.questionBg) {
      this.questionBg.x = width / 2;
      this.questionBg.y = height * 0.13;
      this.questionBg.setSize(width * 0.85, height * 0.10);
    }
    if (this.promptText) {
      this.promptText.x = width / 2;
      this.promptText.y = height * 0.13;
      this.promptText.setFontSize(Math.round(height * 0.04));
      this.promptText.setWordWrapWidth(width * 0.8);
    }
    // Choices
    const startY = height * 0.25;
    const gapY = height * 0.07;
    this.choiceTexts.forEach((txt, i) => {
      txt.x = width / 2;
      txt.y = startY + i * gapY;
      txt.setFontSize(Math.round(height * 0.035));
    });
    this.choiceBgs.forEach((bg, i) => {
      bg.x = width / 2;
      bg.y = startY + i * gapY;
      bg.width = width * 0.7;
      bg.height = height * 0.07;
    });
  }

  /** redraw both HP bars based on current values */
  private redrawBars() {
    // player bar (green, left)
    this.playerBar.clear();
    this.playerBar.fillStyle(0x00ff00);
    this.playerBar.fillRect(20, 20, Math.max(0, this.playerHP), 12);

    // enemy bar (red, right)
    this.enemyBar.clear();
    this.enemyBar.fillStyle(0xff0000);
    this.enemyBar.fillRect(
      this.scale.width - 20 - Math.max(0, this.enemyHP),
      20,
      Math.max(0, this.enemyHP),
      12
    );
  }

  /** pick a random question and display prompt + choices */
  private askQuestion() {
    if (this.questionBg) {
      this.questionBg.destroy();
      this.questionBg = undefined;
    }
    if (this.promptText) {
      this.promptText.destroy();
      this.promptText = undefined;
    }

    // clear old choices
    this.choiceTexts.forEach(t => t.destroy());
    this.choiceTexts = [];

    // choose random question
    this.currentQuestion = Phaser.Utils.Array.GetRandom(this.questions);

    // Question background box
    this.questionBg = this.add.rectangle(
      this.scale.width / 2,
      this.scale.height * 0.13,
      this.scale.width * 0.85,
      this.scale.height * 0.16, // Increased height
      0x222244,
      0.85
    ).setOrigin(0.5);

    // Question text
    const questionY = this.scale.height * 0.13;
    const isLong = this.currentQuestion.prompt.length > 60;
    const fontSize = isLong
      ? Math.round(this.scale.height * 0.032)
      : Math.round(this.scale.height * 0.04);

    this.promptText = this.add.text(
      this.scale.width / 2,
      questionY,
      this.currentQuestion.prompt,
      {
        fontFamily: 'Arial Black, Arial, sans-serif',
        fontSize: `${fontSize}px`,
        color: '#fff',
        fontStyle: 'bold',
        align: 'center',
        wordWrap: { width: this.scale.width * 0.8 }
      }
    )
    .setOrigin(0.5)
    .setShadow(2, 2, '#000', 4, true, true);

    // Choices
    const startY = this.scale.height * 0.25; // 25% from the top
    const gapY = this.scale.height * 0.07;   // 7% of height between choices
    this.currentQuestion.choices.forEach((choice: string, i: number) => {
      // Background for each choice
      const choiceBg = this.add.rectangle(
        this.scale.width / 2,
        startY + i * gapY,
        this.scale.width * 0.7,      // 70% of width
        this.scale.height * 0.07,    // 7% of height
        0x333355,
        0.85
      ).setOrigin(0.5).setStrokeStyle(2, 0xffffff, 0.3);

      // Make the box interactive
      choiceBg.setInteractive({ useHandCursor: true })
        .on('pointerover', () => {
          choiceBg.setFillStyle(0x5555aa, 1);
          txt.setStyle({ color: '#ffff88' });
          txt.setScale(1.08);
        })
        .on('pointerout', () => {
          choiceBg.setFillStyle(0x333355, 0.85);
          txt.setStyle({ color: '#fff' });
          txt.setScale(1);
        })
        .on('pointerup', () => this.submitAnswer(choice));

      this.choiceBgs.push(choiceBg);

      // Choice text
      const txt = this.add.text(
        this.scale.width / 2,
        startY + i * gapY,
        choice,
        {
          fontFamily: 'Arial',
          fontSize: `${Math.round(this.scale.height * 0.035)}px`, // 3.5% of height
          color: '#fff',
          align: 'center'
        }
      )
      .setOrigin(0.5)
      .setDepth(1) // Ensure text is above the box
      .setInteractive({ useHandCursor: true })
      .on('pointerover', () => {
        choiceBg.setFillStyle(0x5555aa, 1);
        txt.setStyle({ color: '#ffff88' });
        txt.setScale(1.08);
      })
      .on('pointerout', () => {
        choiceBg.setFillStyle(0x333355, 0.85);
        txt.setStyle({ color: '#fff' });
        txt.setScale(1);
      })
      .on('pointerup', () => this.submitAnswer(choice));

      this.choiceTexts.push(txt);
    });
  }

  /**
   * Handle an answer tap: animate, apply damage/recoil,
   * then either proceed or end battle.
   */
  private submitAnswer(answer: string) {
    // disable further input until we process this answer
    this.choiceTexts.forEach(t => t.disableInteractive());

    const correct = answer === this.currentQuestion.answer;
    if (correct) {
      // 🎯 correct → enemy takes damage, play attack anim
      const dmg = this.difficultyToDamage(this.currentQuestion.difficulty);
      this.enemyHP = Math.max(0, this.enemyHP - dmg);
      this.redrawBars();

      this.playerSprite.play('player_attack');
      this.playerSprite.once(
        Phaser.Animations.Events.ANIMATION_COMPLETE + '-player_attack',
        () => {
          // check for victory
          if (this.enemyHP <= 0) {
            this.scene.start('ScoreScene', {
              didWin: true,
              level: this.level,
              timeOfDay: this.timeOfDay,
              location: this.location
            });
          } else {
            // back to idle and next question
            this.playerSprite.play('player_idle');
            this.askQuestion();
          }
        }
      );
    } else {
      // ❌ wrong → enemy attacks, then player takes recoil, maybe defeat anim
      this.playerHP = Math.max(0, this.playerHP - 10);
      this.redrawBars();

      // Play enemy attack animation first
      this.enemySprite.play(this.level === 1 ? 'phantom_attack' : 'dice_attack');
      this.enemySprite.once(
        Phaser.Animations.Events.ANIMATION_COMPLETE + '-' + (this.level === 1 ? 'phantom_attack' : 'dice_attack'),
        () => {
          // Switch enemy back to idle
          this.enemySprite.play(this.level === 1 ? 'phantom_idle' : 'dice_idle');
          // Now play player hit animation
          this.playerSprite.play('player_hit');
          this.playerSprite.once(
            Phaser.Animations.Events.ANIMATION_COMPLETE + '-player_hit',
            () => {
              if (this.playerHP <= 0) {
                this.playerSprite.play('player_defeat');
                this.playerSprite.once(
                  Phaser.Animations.Events.ANIMATION_COMPLETE + '-player_defeat',
                  () => {
                    this.scene.start('ScoreScene', {
                      didWin: false,
                      level: this.level,
                      timeOfDay: this.timeOfDay,
                      location: this.location
                    });
                  }
                );
              } else {
                // no defeat yet, just ask again
                this.playerSprite.play('player_idle');
                this.askQuestion();
              }
            }
          );
        }
      );
    }
  }

  /** map difficulty string to damage value */
  private difficultyToDamage(diff: string): number {
    switch (diff) {
      case 'easy':   return 5;
      case 'medium': return 10;
      case 'hard':   return 20;
      default:       return 5;
    }
  }
}
