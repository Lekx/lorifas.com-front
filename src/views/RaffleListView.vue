<script lang="ts" setup>
import { defineComponent } from 'vue';
import RaffleTable from '@/components/RaffleTable.vue'
import GenericHeader from '@/components/GenericHeader.vue'
import {router} from '@/router'

const handleCreateBtn = () => {
  router.push('/raffle/form')
}
</script>
<template>
  <div class="raffle-list comp-wrapper">
    <n-card>
      <GenericHeader showCreateBtn pageTitle="Mis sorteos" pageSubtitle="" createBtnTxt="Crear sorteo"  @handleCreateBtn="handleCreateBtn" />
      <RaffleTable/>
    </n-card>
  </div>
</template>


