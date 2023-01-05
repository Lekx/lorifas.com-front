<script lang="ts" setup>
import { defineComponent,ref, reactive } from 'vue';
import RaffleTicketTable from '@/components/RaffleTicketTable.vue'
import GenericHeader from '@/components/GenericHeader.vue'
import {router} from '@/router'
const ticketTableRef = ref();
const handleCreateBtn = () => {
  ticketTableRef.value.showAddPurchase()
}
const handleBackBtn = () => {
  router.push('/raffle/list')
}
</script>
<template>
  <div class="raffle-ticket-list comp-wrapper">
    <n-card>
      <GenericHeader showCreateBtn showBackBtn pageTitle="Gestion de boletos" pageSubtitle="" createBtnTxt="¡Vender boleto!"  @handleCreateBtn="handleCreateBtn" @handleBackBtn="handleBackBtn" />
      <RaffleTicketTable ref="ticketTableRef"/>
    </n-card>
  </div>
</template>
