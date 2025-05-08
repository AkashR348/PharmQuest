<!-- src/views/HomePage.vue -->
<template>
  <div>
    <div class="homepage-bg"></div>
    <ion-page>
      <ion-content :fullscreen="true">
        <div
          class="play-hitbox"
          @click="startBattle"
          tabindex="0"
          aria-label="Start PharmQuest"
        ></div>
      </ion-content>
    </ion-page>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';
import {
  IonPage,
  IonContent
} from '@ionic/vue';

type Location = 'hospital' | 'pharm';
type TimeOfDay = 'day' | 'night';

export default defineComponent({
  name: 'HomePage',
  components: {
    IonPage,
    IonContent,
  },
  setup() {
    const router = useRouter();

    function startBattle() {
      // Determine day or night based on local system time
      const hour = new Date().getHours();
      const timeOfDay: TimeOfDay = (hour >= 6 && hour < 18) ? 'day' : 'night';

      // Randomly choose location: hospital or pharmacy
      const location: Location = (Math.random() < 0.5) ? 'hospital' : 'pharm';

      // Start game with chosen parameters
      router.push({
        path: '/game',
        query: {
          location,
          timeOfDay,
          level: '1'
        }
      });
    }

    return { startBattle };
  }
});
</script>

<style>
.homepage-bg {
  position: fixed;
  inset: 0;
  width: 100vw;
  height: 100vh;
  z-index: 0;
  background-image: url('/assets/sprites/homepage.png');
  background-size: cover;
  background-position: center 68%;
  background-repeat: no-repeat;
}
.play-hitbox {
  position: absolute;
  left: 49.5%;
  top: 83%;
  width: 295px;
  height: 101px;
  transform: translate(-50%, 0);
  cursor: pointer;
  z-index: 3;

}
.start-button-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2;
  pointer-events: none;
  display: none; /* Hide the old button container */
}
.start-button-container ion-button {
  pointer-events: auto;
}
ion-content {
  --background: transparent !important;
  background: transparent !important;
}
@media (max-width: 600px) {
  .homepage-bg {
    background-image: url('/assets/sprites/homepageMobile.png');
    background-position: center ;
    background-size: contain;
    background-color: #073D44;
  }
  .play-hitbox {
  position: absolute;
  left: 49.5%;
  top: 75%;
  width: 22vh;
  height: 8vh;
  transform: translate(-50%, 0);
  cursor: pointer;
  z-index: 3;
  background: rgba(255,0,0,0.2); /* For debugging, remove when done */


}
}
</style>
  