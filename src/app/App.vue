<script setup lang="ts">
import HeaderComponentVue from "@/entites/header/HeaderComponent.vue";
import CustomButtonVue from "@/shared/ui/CustomButton.vue";
</script>

<template>
    <div class="h-full">
        <HeaderComponentVue />
        <main class="p-3">
          <CustomButtonVue> message </CustomButtonVue>
          <!-- <router-view /> -->
        </main>
    </div>
</template>

<style>
#app {
    height: 100vh;
    width: 100vw;
}
</style>
