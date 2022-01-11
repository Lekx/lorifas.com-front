<template>
  <div class="the-alert">
    <b-alert
      v-model="showBottom"
      class="position-fixed fixed-bottom m-auto rounded-2 w-50 mb-5"
      style="z-index: 2000;"
      :variant="alert.type"
    >
      {{alert.msg}}
    </b-alert>
  </div>
</template>

<script>
export default {
  name: 'TheAlert',
  props: {
    alert: Object
  },
  data () {
    return {
      showBottom: true
    }
  }
}
</script>

<style lang="scss">
  @import '@/assets/styles/alert.scss'
</style>
