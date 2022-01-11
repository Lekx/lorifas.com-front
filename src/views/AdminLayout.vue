<template>
  <div id="admin">
    <AdminNavBar />
    <router-view/>
    <WebpageFooter />
  </div>
</template>

<script>
import AdminNavBar from '@/components/admin/AdminNavBar.vue'
import WebpageFooter from '@/components/webpage/WebpageFooter.vue'

export default {
  name: 'AdminLayout',
  components: {
    AdminNavBar,
    WebpageFooter
  }
}
</script>
