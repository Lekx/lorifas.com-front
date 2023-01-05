<script lang="ts" setup>
import { defineComponent } from 'vue';
import GenericHeader from '@/components/GenericHeader.vue'
import {router} from '@/router'

const handleCreateBtn = () => {
  router.push('/profile/:id/summary/form')
}
</script>
<template>
  <div class="profile-summary comp-wrapper">
    <n-card>
      <GenericHeader showCreateBtn pageTitle="Mi perfil publico" createBtnTxt="Modificar" btnColor="info" @handleCreateBtn="handleCreateBtn"/>
      Esto es mi perfil publico que se mostrara a todas las pesonas
    </n-card>
  </div>
</template>
