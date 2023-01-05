<template>
  <div class="login comp-wrapper">
    <n-card title="Iniciar sesion">
      <LoginThirdParty/>
      <!-- <n-button>Google</n-button>
      <n-button>Facebook</n-button>   -->
    </n-card>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
// import LoginForm from '@/components/LoginForm.vue'
import LoginThirdParty from '@/components/LoginThirdParty.vue'

export default defineComponent({
  name: 'LoginFormView',
  components: {
    LoginThirdParty
  },
});
</script>
