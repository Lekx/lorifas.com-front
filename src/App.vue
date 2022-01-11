<template>
  <div id="app">
    <router-view/>
    <TheAlert :alert="alert" v-if="alert && alert.secs > 0"/>
    <TheLoader v-if="isLoading"/>
  </div>
</template>
<script>
import TheLoader from '@/components/TheLoader.vue'
import TheAlert from '@/components/TheAlert.vue'
import { mapGetters } from 'vuex'

export default {
  name: 'Main',
  components: {
    TheAlert,
    TheLoader
  },
  data () {
    return {
    }
  },
  methods: {
    init () {
      window.addEventListener('scroll', function () {
        var nav = document.getElementById('main-menu')
        if (document.documentElement.scrollTop > 400) {
          nav.classList.add('scrolled')
        } else {
          nav.classList.remove('scrolled')
        }
      })
    }
  },
  mounted () {
    // this.init()
  },
  computed: {
    ...mapGetters({
      isLoading: 'getLoaderState',
      alert: 'getAlert'
    })
  }
}
</script>
<style lang="scss">
  @import '@/assets/styles/main.scss'
</style>
