<template>
  <ion-app>
    <!-- this is what actually mounts your routed pages -->
    <ion-router-outlet />
  </ion-app>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { IonApp, IonRouterOutlet } from '@ionic/vue';

export default defineComponent({
  name: 'App',
  components: {
    IonApp,
    IonRouterOutlet,
  },
});
</script>

<style>
/* your global styles */
</style>
