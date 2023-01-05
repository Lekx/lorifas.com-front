<script lang="ts" setup>
import { defineComponent } from 'vue';
import RaffleForm from '@/components/RaffleForm.vue'
import GenericHeader from '@/components/GenericHeader.vue'
import {router} from '@/router'

const handleBackBtn = () => {
  router.push('/raffle/list')
}
</script>
<template>
  <div class="raffle-form comp-wrapper">
    <n-card>
      <GenericHeader showBackBtn pageTitle="Crear sorteo" pageSubtitle="" @handleBackBtn="handleBackBtn" />
      <RaffleForm/>
    </n-card>
  </div>
</template>