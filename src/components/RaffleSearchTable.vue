<script lang="ts" setup>
  import { ref } from 'vue'
  import { NButton } from 'naive-ui'
  import { useRaffleStore } from '@/stores/raffle.store'
  import { storeToRefs } from 'pinia'
  
  const raffleStore = useRaffleStore()
  const raffleSearchId = ref(null)
  
  const searchRaffle = () => {
    raffleStore.searchRaffle(raffleSearchId.value)
  }

  const getATicket = () => {
    console.log('buying')
  }

// Bookmarks de rifas
</script>
<template>
  <div class="raffle-search-table-comp">
    <n-card title="Buscar sorteo" style="margin-bottom: 16px">
      <n-space vertical>
        <n-input-group>
          <n-input v-model:value="raffleSearchId" type="text" placeholder="Escribe el Id. del sorteo a buscar" />
          <n-button type="primary" ghost @click="searchRaffle">
            Buscar
          </n-button>
        </n-input-group>
      </n-space>
    </n-card>

    <n-card title="Resultado" style="margin-bottom: 16px">
      <n-button @click="getATicket()" type="success" size="small">
        Comprar un boleto
      </n-button> 
      <n-tabs type="line" animated>
        <n-tab-pane name="details" tab="Detalles">
          {{raffleStore.selectedRaffle?.title}}
        </n-tab-pane>
        <n-tab-pane name="tickets" tab="Boletos">
          Boletos
        </n-tab-pane>
        <n-tab-pane name="log" tab="Acciones">
          Comentarios y logs
        </n-tab-pane>
      </n-tabs>
    </n-card>
  </div>
</template>

