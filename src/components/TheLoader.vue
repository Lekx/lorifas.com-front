<template>
  <div class="loader">
    <div>
      <b-spinner class="ml-auto"></b-spinner>
      <strong>Cargando...</strong>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TheLoader'
}
</script>

<style lang="scss">
  @import '@/assets/styles/loader.scss'
</style>
