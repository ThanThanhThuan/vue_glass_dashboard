<template>
  <!-- Background is always visible -->
  <div class="background"></div>
  <div class="orb orb-1"></div>
  <div class="orb orb-2"></div>
  <div class="orb orb-3"></div>
  
  <!-- Router View without the complex slot for now to test -->
  <router-view />
</template>

<style>
/* Reset any body opacity that might have been stuck */
body {
  opacity: 1 !important;
  visibility: visible !important;
}
</style>