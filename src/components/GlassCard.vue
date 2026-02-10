<script setup>
import { ref } from 'vue'

const props = defineProps(['is3d'])
const card = ref(null)

const handleMove = (e) => {
  if (!props.is3d) return
  const rect = card.value.getBoundingClientRect()
  const x = e.clientX - rect.left
  const y = e.clientY - rect.top
  const centerX = rect.width / 2
  const centerY = rect.height / 2
  const rotateX = (y - centerY) / 20
  const rotateY = (centerX - x) / 20
  card.value.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`
}

const handleLeave = () => {
  if (!props.is3d) return
  card.value.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)'
}
</script>

<template>
  <div 
    ref="card" 
    class="glass-card" 
    :class="{ 'glass-card-3d': is3d }"
    @mousemove="handleMove" 
    @mouseleave="handleLeave"
  >
    <slot />
  </div>
</template>