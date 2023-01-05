<template>
  <div class="login-form-comp">
    <h3>Iniciar sesion</h3>
      <n-grid x-gap="20" y-gap="5" cols="1" >    
        <n-gi :span="2" align="center">
            <p> Inicia sesion con tu cuenta favorita</p>
        </n-gi>
        <n-gi :span="2">
          <n-space justify="center">
            <n-form-item>
              <n-button @click="googleLogin" type="secondary">
                Google
              </n-button>
            </n-form-item>
          </n-space>
        </n-gi>
        <n-gi :span="2">
          <n-space justify="center">
            <n-form-item>
              <n-button @click="facebookLogin" type="primary">
                Facebook
              </n-button>
            </n-form-item>
          </n-space>
        </n-gi>
      </n-grid>

  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { FormInst, useMessage } from 'naive-ui'
import { useAuthStore } from '@/stores/auth.store'
export default defineComponent({
  setup () {
    
    return {
      googleLogin (e: MouseEvent) {
        const { loginGoogle } = useAuthStore()
        loginGoogle()
      },
      facebookLogin (e: MouseEvent) {
        console.log('FB test')

      }
    }
  }
})
</script>
