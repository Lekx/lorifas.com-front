<template>
  <div id="raffles">
    <RafflesNavBar />
    <router-view/>
    <WebpageFooter />
  </div>
</template>

<script>
import RafflesNavBar from '@/components/raffles/RafflesNavBar.vue'
import WebpageFooter from '@/components/webpage/WebpageFooter.vue'

export default {
  name: 'RafflesLayout',
  components: {
    RafflesNavBar,
    WebpageFooter
  }
}
</script>
