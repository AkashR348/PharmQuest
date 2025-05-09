<!-- src/views/HomePage.vue -->
<template>
  <div>
    <div class="homepage-bg"></div>
    <div class="start-button-container">
      <img src="/assets/sprites/startButton.png" alt="Start Button" class="start-button" @click="startGame" />
    </div>
    <ion-page>
      <ion-content :fullscreen="true">
        <ion-header collapse="condense">
          <ion-toolbar>
            <ion-title size="large">PharmQuest</ion-title>
          </ion-toolbar>
        </ion-header>
      </ion-content>
    </ion-page>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/vue';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'HomePage',
  components: {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
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

    const startGame = () => {
      router.push('/game');
    };

    return { startBattle, startGame };
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
  background-color: #003149;
  overflow: hidden;
}

.start-button-container {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 91%;
  left: 49.5%;
  transform: translate(-50%, -50%);
  width: 100vw;
  height: 100vh;
  z-index: 2;
  pointer-events: auto;
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
    background-color: #064766;
    overflow: hidden;
    
  }

 
  .start-button-container {
    align-items: flex-end;
    padding-bottom: 18vh;
    height: 100vh;
  }
}
.start-button {
  cursor: pointer;
  transition: transform 0.2s;
  width: 25%;
}
.start-button:hover {
  transform: scale(1.05);
}
</style>
  