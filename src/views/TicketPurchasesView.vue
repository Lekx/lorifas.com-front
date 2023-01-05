<script lang="ts" setup>
import { defineComponent } from 'vue';
import GenericHeader from '@/components/GenericHeader.vue'
import {router} from '@/router'

const handleCreateBtn = () => {
  router.push('/raffle/search')
}
</script>
<template>
  <div class="ticket-purchases comp-wrapper">
    <n-card>
      <GenericHeader showCreateBtn pageTitle="Mis boletos comprados" pageSubtitle="" createBtnTxt="¡Quiero Participar!"  @handleCreateBtn="handleCreateBtn" @handleBackBtn="handleBackBtn" />
      Mis compras realizadas
    </n-card>
  </div>
</template>