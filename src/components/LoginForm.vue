<template>
  <div class="login-form-comp">
    <h3>Iniciar sesion</h3>
    <n-form
        ref="formRef"
        :model="userForm"
        :rules="rules"
        size="large"
      >
      <n-grid x-gap="20" y-gap="5" cols="1" >
        <n-gi :span="2">
          <n-form-item label="Correo electronico" path="email" show-require-mark>
            <n-input v-model:value="userForm.email" placeholder="Ingresa tu correo electronico" />
          </n-form-item>
        </n-gi>
        <n-gi :span="2">
          <n-form-item label="Contrasena" path="password" show-require-mark>
            <n-input type="password" v-model:value="userForm.password" placeholder="Ingresa tu contrasena" />
          </n-form-item>
        </n-gi>
        
        <n-gi :span="2" align="center">
            <p> Si aun no tienes una cuenta registrate aqui</p>
        </n-gi>
        <n-gi :span="2">
          <n-space justify="center">
            <n-form-item>
              <n-button @click="handleValidateClick" type="primary">
                Iniciar sesion
              </n-button>
            </n-form-item>
          </n-space>
        </n-gi>
        <n-gi :span="2" align="center">
            <p> Recuperar mi contrasena</p>

        </n-gi>
      </n-grid>
    </n-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { FormInst, useMessage } from 'naive-ui'

export default defineComponent({
  setup () {
    const formRef = ref<FormInst | null>(null)
    const message = useMessage()
    const errorMessage = 'Campo obligatorio';
    const requiredFieldValidator = {
        required: true,
        message: errorMessage,
        trigger: 'blur'
      }
    return {
      formRef,
      
      userForm: ref({
        password: null,
        email: null
      }),
      rules: {
        password: requiredFieldValidator,
        email: requiredFieldValidator
      },
      handleValidateClick (e: MouseEvent) {
        e.preventDefault()
        formRef.value?.validate((errors) => {
          if (!errors) {
            message.success('Valid')
          } else {
            console.log(errors)
            message.error('Invalid')
          }
        })
      }
    }
  }
})
</script>
