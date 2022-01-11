<template>
  <div id="webpage">
    <WebpageNavBar />
    <WebpageHeader />
    <WebpageServices />
    <WebpageContact />
    <WebpageFooter />
  </div>
</template>

<script>
// @ is an alias to /src
import WebpageNavBar from '@/components/webpage/WebpageNavBar.vue'
import WebpageHeader from '@/components/webpage/WebpageHeader.vue'
import WebpageServices from '@/components/webpage/WebpageServices.vue'
import WebpageContact from '@/components/webpage/WebpageContact.vue'
import WebpageFooter from '@/components/webpage/WebpageFooter.vue'

export default {
  name: 'WebpageLayout',
  components: {
    WebpageNavBar,
    WebpageHeader,
    WebpageServices,
    WebpageContact,
    WebpageFooter
  }
}
</script>
