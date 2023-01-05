<script lang="ts" setup>
import { defineComponent } from 'vue';
import RaffleSearchTable from '@/components/RaffleSearchTable.vue'
import GenericHeader from '@/components/GenericHeader.vue'
import {router} from '@/router'

const handleCreateBtn = () => {
  router.push('/raffle/search')
}
</script>
<template>
  <div class="raffle-search comp-wrapper">
    <RaffleSearchTable/>
  </div>
</template>