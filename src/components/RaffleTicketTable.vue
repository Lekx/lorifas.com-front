<script lang="ts" setup>
  import { h, ref, defineProps, toRefs, defineExpose, reactive, onMounted} from 'vue'
  import { FormInst, NButton, DataTableColumns, DropdownOption, NIcon, NDropdown, FormItemRule, useNotification, useLoadingBar } from 'naive-ui'
  import { useRaffleStore } from '@/stores/raffle.store'
  import { useTicketStore } from '@/stores/ticket.store'
  import { storeToRefs } from 'pinia'
  import { globalDict } from '@/_helpers/utils'
  import { Gifts, ArrowLeft } from '@vicons/fa'
  import { Icon } from '@vicons/utils'
  import type { Component } from 'vue'
  import RaffleDetailModal from './RaffleDetailModal.vue'
  import { useRoute } from 'vue-router'
  import { 
    Edit, TicketAlt, Handshake, HandshakeSlash, 
  ClipboardList, EllipsisV, ThumbsUpRegular, Trophy, Medal, Award
  } from '@vicons/fa'
  import { DateTime } from 'luxon'
  import { router } from '@/router'
  import { useRouter } from 'vue-router'
  const routerSync = useRouter()
  const route = useRoute()

  const raffleStore = useRaffleStore()
  const ticketStore = useTicketStore()

  const renderIcon = (icon: Component) => {
    return () => {
      return h(NIcon, null, { default: () => h(icon) })
    }
  }
  
  
  let showTicketFormModal = ref(false)
  onMounted(async () => {
    if(raffleStore.selectedRaffle) return;
    await routerSync.isReady();
    raffleStore.fetchSelectedRaffle(route.params.id)
  })

  const zeroPad = raffleStore.selectedRaffle?.ticketsQty.toString().length
  
  const availableTickets = [...Array(raffleStore.selectedRaffle?.ticketsQty).fill().map((x, y) => {
    return {label: `Boleto #${String(y+1).padStart(zeroPad, '0')}`, value: String(y+1).padStart(zeroPad, '0') }
  })]
  
  const menuOptions = [
    { label: 'Modificar', key: 'modify', icon: renderIcon(Edit) },
    { label: 'Confirmar compra', key: 'publish', icon: renderIcon(Handshake) },
    { label: 'Liberar', key: 'delete', icon: renderIcon(HandshakeSlash) }
  ]

  const renderMenuBtn = () => {
    return h(NButton, { size: 'small' }, renderIcon(EllipsisV))
  }

  const renderPrizeIcons = (idPrize) => {
    let prize = raffleStore.selectedRaffle?.Prizes.filter(item=>item.id === idPrize)
    if(!prize.length) return ""
    prize = prize[0]
    let icon = Trophy

    if(prize.prizeType === 1) icon = Trophy
    else if(prize.prizeType === 2) icon = Medal
    else if(prize.prizeType === 3) icon = Award
    else return ""

    return h(NIcon, null, { default: () => h(icon) })
  }

  const renderDropdownMenu = (rowData) => {
    return h(
      NDropdown,
      {
        options: menuOptions,
        trigger: "click",
        onSelect: (menu) => { handleMenuClick(menu, rowData) }
      },
      renderMenuBtn
    )
  }

  const handleMenuClick = (menu: string, rowData) => {
    switch (menu) {
      case 'modify':
        setUpdateTicket(rowData)
        break
      case 'confirmPurchase':
        // call store and make an update publishing it
        break
      case 'removePendingPurchase':
        // push router to check tickets table
        break
      default:

    }
  }
  const columns: DataTableColumns<any> = [
    { title: 'N. boleto', key: 'ticketNumber', 
      render (row){
        return h ('strong', [row.ticketNumber, renderPrizeIcons(row.idPrize)])
      }
    },
    { title: 'F. de compra', key: 'purchaseDate', render(row){ return h('label', row.purchaseDate ? DateTime.fromISO(row.purchaseDate).toLocaleString(DateTime.DATETIME_MED) : 'Pago pendiente')} },
    { title: 'Confirmado', key: 'purchaseConfirmed' },
    { title: 'Nota', key: 'note' },
    { title: 'Comprador', key: 'nonUserBuyer', 
      render (row){
        return h ('strong', row.nonUserBuyer)
      }
    },
    { title: '', key: 'actions', render(row) { return renderDropdownMenu(row) } }
  ]

  const showAddPurchase = () => {
    showTicketFormModal.value = true
  }

  // RAFFLE FORM
  const notification = useNotification()
  const loadingBar = useLoadingBar()
  const ticketFormRef = ref<FormInst | null>(null)

  let ticketFormValue = ref({
    ticketsNumbers: null,
    purchaseConfirmed: false,
    note: null,
    nonUserBuyer: null
  })
  const validatorErrorMessage = 'Campo obligatorio'
  const requiredFieldValidator = {
    required: true,
    message: validatorErrorMessage,
    trigger: ['blur', 'input'],
    validator (rule: FormItemRule, value: string) {
      if (!value)
        return new Error('Error is required')
      return true
    },
  }
  const ticketFormRules = {
    ticketsNumbers: requiredFieldValidator,
    nonUserBuyer: requiredFieldValidator
  }

  const createPurchase = async () => {
    loadingBar.start()
    try {
      const tickets: any[] = []
      ticketFormRef.value?.model.ticketsNumbers.map((ticketNum)=> {
          tickets.push( { 
            ticketNumber: ticketNum, 
            purchaseConfirmed: ticketFormRef.value?.model.purchaseConfirmed,
            nonUserBuyer: ticketFormRef.value?.model.nonUserBuyer,
            note: ticketFormRef.value?.model.note,
            idRaffle: raffleStore.selectedRaffle?.id,
            purchaseDate: ticketFormRef.value?.model.purchaseConfirmed ? new Date() : null
          })
      })
      const response = await ticketStore.saveTicketPurchase(tickets)
      notification.success({
        content: response.message,
        duration: 6000,
      })
      closeTicketFormModal()
    } catch (error) {
      notification.error({
        content: `Error, intenta de nuevo.${error}`,
        duration: 6000,
      })
    } finally {
      loadingBar.finish()
    }
  }

  let isUpdating = ref(false)
  const savePurchase = () => {
    isUpdating.value ? updatePurchase() : createPurchase()
  }
  
  const setUpdateTicket = (selectedTicket: any) => {
    isUpdating.value = true
    showTicketFormModal.value = true
    ticketFormValue.value = {
      // ticketsNumbers: [{label: `Boleto #${selectedTicket.ticketNumber}`, value: selectedTicket.ticketNumber}],
      ticketsNumbers: [selectedTicket.ticketNumber],
      purchaseConfirmed: selectedTicket.purchaseConfirmed,
      note: selectedTicket.note,
      nonUserBuyer: selectedTicket.nonUserBuyer
    }

  }

  const updatePurchase = async () => {
    loadingBar.start()
    try {
      const ticket: any = { 
          ticketNumber: ticketFormRef.value?.model.ticketsNumbers[0], 
          purchaseConfirmed: ticketFormRef.value?.model.purchaseConfirmed,
          nonUserBuyer: ticketFormRef.value?.model.nonUserBuyer,
          note: ticketFormRef.value?.model.note,
          idRaffle: raffleStore.selectedRaffle?.id,
          purchaseDate: ticketFormRef.value?.model.purchaseConfirmed ? ticketFormRef.value?.model.purchaseDate : null
      }

      const response = await ticketStore.updateTicketPurchase(ticket)
      notification.success({content: response.message, duration: 6000})
      
      closeTicketFormModal()
    } catch (error) {
      notification.error({
        content: `Error, intenta de nuevo.${error}`,
        duration: 6000,
      })
    } finally {
      loadingBar.finish()
    }
  }

  const cancelPurchase = () => {
    ticketFormValue.value.ticketsNumbers = null
    ticketFormValue.value.purchaseConfirmed = null
    ticketFormValue.value.note = null
    ticketFormValue.value.nonUserBuyer = null
    showTicketFormModal.value = false
  }
  const showDetailsModal = ref(false)
  const closeTicketFormModal = async () => {
    showTicketFormModal.value = false
    await raffleStore.fetchSelectedRaffle()

  }
  const closeDetailsModal = () => {
    showDetailsModal.value = false
  }
  const showDetails = () => {
    showDetailsModal.value = true
  }
  const goToList = () => {
    router.push('/raffle/list')
  }
  defineExpose({
    showAddPurchase,
  });
</script>
<template>
  <div class="raffle-ticket-table-comp">
    <div class="skelton-wrapper" v-if="!raffleStore.selectedRaffle" style="margin-top: 40px;">
      <n-skeleton text style="width: 50%"/>
      <n-skeleton text :repeat="4"/>
      <n-skeleton text style="width: 20%"/>
    </div>
    <div class="data-wrapper" v-else>
      <h3>
        Boletos de {{ raffleStore.selectedRaffle?.title }}
        <n-button
          text
          tag="a"
          type="info"
          size="tiny"
          @click="showDetails"
        >
        (detalles de rifa)
        </n-button>
      </h3>
      <p>Solo se muestran los boletos apartados y comprados. Aún te quedan <strong>{{ raffleStore.selectedRaffle?.ticketsQty - raffleStore.selectedRaffle?.Tickets.length }} por vender!</strong></p>
      <n-space justify="space-between">

        <!-- <n-button @click="showAddPurchase()" type="success" size="small">
          Vender boleto
        </n-button>  -->
        <n-button @click="closeSales()" type="error" size="small">
          Cerrar venta
        </n-button> 
      </n-space>
      <!-- <n-button @click="endRaffle()" type="error">
        Finalizar sorteo
      </n-button> -->
      <n-data-table
        :columns="columns"
        :data="raffleStore.selectedRaffle?.Tickets"
      />
    </div>
    <n-modal v-model:show="showTicketFormModal" preset="dialog" title="Dialog" :show-icon="false" :on-close="cancelPurchase" style="width: 600px">
      <template #header>
        <div>Compra de boleto(s)</div>
      </template>
      <n-form
        ref="ticketFormRef"
        :model="ticketFormValue"
        :rules="ticketFormRules"
      >
        <n-form-item label="Boletos a comprar" path="ticketsNumbers" show-require-mark>
          <n-select
            multiple
            filterable
            v-model:value="ticketFormValue.ticketsNumbers"
            :options="availableTickets"
            :disabled="isUpdating"
          />
        </n-form-item>
        <n-form-item label="Nombre completo del comprador" path="nonUserBuyer" show-require-mark>
          <n-input v-model:value="ticketFormValue.nonUserBuyer" type="text" placeholder="Nombre del comprador" /><br><br>
        </n-form-item>
        <n-form-item label="Notas de la compra" path="note">
          <n-input v-model:value="ticketFormValue.note" type="textarea" placeholder="Datos personales, notas, ine..." /><br><br>
        </n-form-item>
        <n-form-item label="Es una compra confirmada" path="purchaseConfirmed">
          <n-switch v-model:value="ticketFormValue.purchaseConfirmed" />
        </n-form-item>

      </n-form>
      <template #action>
        <n-button @click="cancelPurchase">
          Cancelar
        </n-button>
        <n-button @click="savePurchase">
          Guardar
        </n-button>
      </template>
    </n-modal>
    
    <RaffleDetailModal :raffle="raffleStore.selectedRaffle" :showDetailsModal="showDetailsModal" @hideRaffleDetails="closeDetailsModal"/>
  </div>
</template>

