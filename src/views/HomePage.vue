<!-- src/views/HomePage.vue -->
<template>
  <div>
    <div class="homepage-bg"></div>
    <ion-page>
      
      <ion-content :fullscreen="true">
        <ion-header collapse="condense">
          <ion-toolbar>
            <ion-title size="large">PharmQuest</ion-title>
          </ion-toolbar>
        </ion-header>
        <div class="start-button-container">
          <img src="/assets/sprites/startButton.png" alt="Start Button" class="start-button" @click="startGame" />
        </div>
      </ion-content>
    </ion-page>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';
import {
  IonPage,
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar
} from '@ionic/vue';

export default defineComponent({
  name: 'HomePage',
  components: {
    IonPage,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
  },
  setup() {
    const router = useRouter();

    const startGame = () => {
      router.push('/game');
    };

    return { startGame };
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
  background-color: #00354C;
}

.start-button-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 150vh;
}
.start-button {
  width: 260px;
  max-width: 90vw;
  height: auto;
  cursor: pointer;
  transition: transform 0.2s;
}
.start-button:hover {
  transform: scale(1.05);
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
  .start-button-container {
    justify-content: center;
    align-items: flex-end;
    padding-bottom: 18vh;   /* Adjust as needed */
   padding-left: 38vw;
    height: 95vh;
    width: 100vw;
  }

  .start-button {
    width: 40vw;
    max-width: 420px;
    min-width: 180px;
    height: auto;
  
}
}
</style>
  