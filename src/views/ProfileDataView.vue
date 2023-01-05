<script lang="ts" setup>
import { defineComponent } from 'vue';
import GenericHeader from '@/components/GenericHeader.vue'
import {router} from '@/router'

const handleCreateBtn = () => {
  router.push('/profile/:id/account/form')
}
</script>
<template>
  <div class="profile-data comp-wrapper">
    <n-card>
      <GenericHeader showCreateBtn pageTitle="Mi perfil" createBtnTxt="Modificar" btnColor="info" @handleCreateBtn="handleCreateBtn" />
      Aqui puedo modificar mi cuenta
    </n-card>
  </div>
</template>
