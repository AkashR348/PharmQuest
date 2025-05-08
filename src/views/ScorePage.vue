<!-- src/views/ScorePage.vue -->
<template>
    <ion-page>
      <ion-header>
        <ion-toolbar>
          <ion-title>Battle Result</ion-title>
        </ion-toolbar>
      </ion-header>
  
      <ion-content class="ion-padding result-content">
        <div class="result-container">
          <ion-icon
            :name="didWin ? 'trophy' : 'sad-outline'"
            :color="didWin ? 'success' : 'danger'"
            size="large"
          />
          <h2>{{ didWin ? 'Victory!' : 'Defeat' }}</h2>
          <p>Level: {{ level }}</p>
          <ion-button
            expand="block"
            color="primary"
            @click="goHome"
          >
            {{ didWin ? 'Next Level' : 'Retry' }}
          </ion-button>
        </div>
      </ion-content>
    </ion-page>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  import { useRouter, useRoute } from 'vue-router';
  import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonIcon } from '@ionic/vue';
  
  export default defineComponent({
    name: 'ScorePage',
    components: { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonIcon },
    setup() {
      const router = useRouter();
      const route = useRoute();
      const didWin = (route.query.didWin === 'true');
      const level = parseInt(route.query.level as string) || 1;
  
      function goHome() {
        if (didWin) {
          // increment level
          router.push({ path: '/', query: {} });
        } else {
          router.push({ path: '/game', query: route.query });
        }
      }
  
      return { didWin, level, goHome };
    }
  });
  </script>
  
  <style scoped>
  .result-content {
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
  }
  .result-container {
    max-width: 300px;
    width: 100%;
  }
  h2 {
    margin: 16px 0;
  }
  </style>