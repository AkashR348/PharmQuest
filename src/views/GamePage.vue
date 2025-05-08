<!-- src/views/GamePage.vue -->
<template>
    <ion-page class="game-page">
      <canvas ref="gameCanvas" class="game-canvas" />
    </ion-page>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import { useRoute } from 'vue-router';
  import { IonPage } from '@ionic/vue';
  
  type Location = 'hospital' | 'pharm';
  type TimeOfDay = 'day' | 'night';
  
  const route = useRoute();
  const gameCanvas = ref<HTMLCanvasElement|null>(null);
  
  onMounted(async () => {
    if (!gameCanvas.value) return;
  
    // 1️⃣ Pull your init data
    const initData = {
      location:  (route.query.location  as Location) || 'hospital',
      timeOfDay: (route.query.timeOfDay as TimeOfDay) || 'day',
      level:     +(route.query.level   || 1),
    };
  
    // 2️⃣ Dynamically import the Phaser bootstrap
    const { createGame } = await import('@/phaser/GameEngine');
    
    // 3️⃣ Now instantiate only when we need it
    const game = createGame(gameCanvas.value, initData);
  
    // 4️⃣ Tear down on unmount
    return () => { game.destroy(true); };
  });
  </script>
  
  <style scoped>
  .game-canvas {
    width: 100%;
    height: 100%;
    display: block;
  }
  .game-page {
    --ion-background-color: #000;
  }
  </style>
  