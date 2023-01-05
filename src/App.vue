<script lang="ts" setup>
  import MenuMain from '@/components/MenuMain.vue'
</script>
<template>
  <MenuMain/>
  <main>
    <n-loading-bar-provider>
      <n-notification-provider>
        <router-view/>
      </n-notification-provider>
    </n-loading-bar-provider>
  </main>
</template>