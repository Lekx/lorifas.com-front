<script lang="ts" setup>
  import { defineProps, toRefs, defineEmits, onMounted, ref, watch} from "vue"
  import { DateTime } from 'luxon'

  const props = defineProps({
    showCelebrationModal: Boolean,
    raffle: Object
  })

  const { showCelebrationModal, raffle } = toRefs(props)

  const ticketsRef = [{label: 'one', value: 1}]
  const raffleRef = ref()
  const selectedValue = ref()
  
  watch(() => raffle, (newVal, oldVal) => {
    raffleRef.value = newVal;
  });

  const emit = defineEmits(['hideCelebrationModal'])

  const hideCelebrationModal= () => {
    emit('hideCelebrationModal')
  }
  
</script>
<template>
  <n-modal :show="showCelebrationModal" preset="dialog" title="Dialog" :show-icon="true" type="info" :on-close="hideCelebrationModal" style="width: 600px">
    <template #header>
      <div>Celebración de sorteo</div>
    </template>

    <n-grid x-gap="20" y-gap="5" cols="3">
        <n-gi :span="1"><strong>Forma del sorteo</strong><br>{{raffleRef?.raffleType}}</n-gi>
        <n-gi :span="1"><strong>Fecha y hora del sorteo</strong><br>{{DateTime.fromISO(raffleRef?.celebrationDate).toLocaleString(DateTime.DATETIME_MED)}}</n-gi>
        <n-gi :span="1"><strong>Boletos</strong><br>{{raffleRef?.ticketsQty}}</n-gi>

        <n-gi :span="3"><strong>Titulo</strong><br>{{raffleRef?.title}}<hr></n-gi>
        <n-gi :span="3"><strong>Elige los ganadores de los respectivos premios</strong><br><small>cosas cosas cosas mas cosas de las cosas</small></n-gi>
        <template v-if="raffleRef !== undefined">

          <n-gi :span="1"  v-for="(prize, idx) in raffleRef.Prizes" :key="idx">
          <strong>{{prize.prizeType}}: {{prize.name}}</strong>
            <n-select
              v-model:value="selectedValue"
              filterable
              placeholder="Selecciona el boleto ganador"
              :options="ticketsRef"
            />
          </n-gi>
        </template>
        <!-- <n-gi :span="1"><strong>Premio # 2</strong></n-gi>
        <n-gi :span="1"><strong>Premio # 3</strong></n-gi> -->
    </n-grid>
    <template #action>
      <n-space>
        <n-button @click="hideCelebrationModal">
          Cancelar
        </n-button>
        <n-button @click="hideCelebrationModal">
          Guardar
        </n-button>
      </n-space>
    </template>
  </n-modal>
</template>

