<!-- src/views/HomePage.vue -->
<template>
    <ion-page>
      <ion-header>
        <ion-toolbar>
          <ion-title>PharmQuest</ion-title>
        </ion-toolbar>
      </ion-header>
  
      <ion-content class="ion-padding">
        <div class="start-button-container">
          <ion-button
            expand="block"
            color="primary"
            @click="startBattle()"
          >
            Start PharmQuest
          </ion-button>
        </div>
      </ion-content>
    </ion-page>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  import { useRouter } from 'vue-router';
  import {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButton
  } from '@ionic/vue';
  
  type Location = 'hospital' | 'pharm';
  type TimeOfDay = 'day' | 'night';
  
  export default defineComponent({
    name: 'HomePage',
    components: {
      IonPage,
      IonHeader,
      IonToolbar,
      IonTitle,
      IonContent,
      IonButton
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
  
  <style scoped>
  .start-button-container {
    display: flex;
    height: 100%;
    justify-content: center;
    align-items: center;
  }
  </style>
  