<script lang="ts" setup>
  import { h, ref, nextTick, toRefs } from 'vue'
  import { NButton, DataTableColumns, DropdownOption, NIcon, NDropdown } from 'naive-ui'
  import { useRaffleStore } from '@/stores/raffle.store'
  import { storeToRefs } from 'pinia'
  import { globalDict, raffleStatuses } from '@/_helpers/utils'
  import { useNotification, useLoadingBar } from 'naive-ui'
  import { DateTime } from 'luxon'
  import { Icon } from '@vicons/utils'
  import type { Component } from 'vue'

  import { Edit, TicketAlt, TrashAltRegular, Gifts, ClipboardList, EllipsisV, ExchangeAlt} from '@vicons/fa'
  import { router } from '@/router'

  import RaffleDetailModal from './RaffleDetailModal.vue'
  import GenericAlertModal from './GenericAlertModal.vue'
  import RaffleCelebrationModal from './RaffleCelebrationModal.vue'
  const notification = useNotification()
  const loadingBar = useLoadingBar()
  const renderIcon = (icon: Component) => {
    return () => {
      return h(NIcon, null, { default: () => h(icon) })
    }
  }

  const statusSubMenu = raffleStatuses.map((item) => {return {
    label: item,
    key: item
  }})

  const menuOptions = [
    { label: 'Detalles', key: 'details', icon: renderIcon(ClipboardList) },
    { label: 'Modificar', key: 'modify', icon: renderIcon(Edit) },
    { label: 'Eliminar', key: 'delete', icon: renderIcon(TrashAltRegular) },
    { label: 'Cambiar estatus', key: 'publish', icon: renderIcon(ExchangeAlt), children: statusSubMenu},
    { type: 'divider'},
    { label: 'Lista de boletos', key: 'tickets', icon: renderIcon(TicketAlt) },
    { label: 'Celebrar sorteo', key: 'celebrate', icon: renderIcon(Gifts) },
  ]

  const raffleStore = useRaffleStore()
  const loadRaffles = async () => {
    if(!raffleStore.raffles || !raffleStore.raffles.length)
      await raffleStore.getRaffles()
  }

  loadRaffles();

  const renderMenuBtn = () => {
    return h(
      NButton, 
      {
        size: 'small'
      }, 
      renderIcon(EllipsisV)
    )
  }

  const renderDropdownMenu = (rowData: any) => {
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
  let showDetailsModal = ref(false)
  let showCelebrationModal = ref(false)
  let genericAlertModalTxt = ref("");
  let showAlertModal = ref(false)
  let selectedMenuItem:any = null
  const handleMenuClick = (menu: string, rowData:any) => {
    raffleStore.selectedRaffle = rowData
    selectedMenuItem = menu
    switch (menu) {
      case 'details':
        showDetailsModal.value = true
        break
      case 'modify':
        router.push({ name: 'raffleFormUrl', params: { id: rowData.id }})
        break
      case 'Publicado':
      case 'Celebrado':
      case 'Borrador':
      case 'Suspendido':
        genericAlertModalTxt.value = "Si PUBLICAS este sorteo estara disponible para que los usuarios puedan buscarlo y apartar boletos. Podrás volver a cambiar el estatus a BORRADOR solo si ningun usuario ha apartado su boleto, quieres continuar?";
        showAlertModal.value = true;
        break
      case 'tickets':
        router.push({ name: 'raffleTicketsUrl', params: { id: rowData.id }})
        // router.push(`/raffle/${rowData.id}/tickets`)
        // push router to check tickets table
        break
      case 'delete':
        genericAlertModalTxt.value = "Si borras este sorteo no podras recuperar la información, quieres continuar?";
        showAlertModal.value = true;
        break
      case 'celebrate':
        showCelebrationModal.value = true;
        break
      default:
        console.log(menu)
    }
  }


  const handleAlertCallback = async (confirmAction = false) => {
    if(confirmAction)
      if(selectedMenuItem === 'delete')
        await deleteRaffle()
      else
        await updateRaffleStatus()

    showAlertModal.value = false
    raffleStore.selectedRaffle = null
    genericAlertModalTxt.value = ""
  }

  const updateRaffleStatus = async () => {
    loadingBar.start()
    try {
      const raffleStatusIdx = raffleStatuses.indexOf(selectedMenuItem)
      if(raffleStatusIdx < 0) throw new Error("Estatus incorrecto");
      
      raffleStore.selectedRaffle.status = raffleStatusIdx
      const response = await raffleStore.updateRaffle(raffleStore.selectedRaffle)
      notification.success({
        content: response.message,
        duration: 6000,
      })
    } catch (error) {
      notification.error({
        content: `Error, intenta de nuevo. ${error}`,
        duration: 6000,
      })
    } finally {
      loadingBar.finish()
    }
  }

  const deleteRaffle = async () => {
    loadingBar.start()
    try {
      const response = await raffleStore.deleteRaffle()
      notification.success({
        content: response.message,
        duration: 6000,
      })
    } catch (error) {
      notification.error({
        content: `Error, intenta de nuevo. ${error}`,
        duration: 6000,
      })
    } finally {
      loadingBar.finish()
    }
  }

  
  const hideCelebrationModal = () => {
    showCelebrationModal.value = false
    // raffleStore.selectedRaffle = null
  }

  const clearData = () => {
    showDetailsModal.value = false
    raffleStore.selectedRaffle = null
  }

  const columns: DataTableColumns<any> = [
    { title: 'Sorteo', key: 'title' },
    { title: 'Boletos', key: 'ticketsQty' },
    { title: 'Cierre ventas', key: 'salesEndDate', render(row){ return h('label', DateTime.fromISO(row.salesEndDate).toLocaleString(DateTime.DATETIME_MED))}},
    { title: 'Fecha del Sorteo', key: 'celebrationDate', render(row){ return h('label', DateTime.fromISO(row.celebrationDate).toLocaleString(DateTime.DATETIME_MED))}},
    { title: 'Creacion', key: 'title' },
    { title: 'Premios', key: 'Prizes', 
      render (row){
        return h ('strong', row.Prizes.length)
      }
    },
    { title: 'Estado', key: 'status', render(row){ return h('strong', raffleStatuses[row.status])} },
    { title: '', key: 'actions', render(row) { return renderDropdownMenu(row) } }
  ]
  
</script>
<template>
  <div class="raffle-table-comp">
    <n-data-table
      :columns="columns"
      :data="raffleStore.raffles"
    />

    <RaffleDetailModal :raffle="raffleStore.selectedRaffle" :showDetailsModal="showDetailsModal" @hideRaffleDetails="clearData"/>
    <RaffleCelebrationModal :raffle="raffleStore.selectedRaffle" :showCelebrationModal="showCelebrationModal" @hideCelebrationModal="hideCelebrationModal"/>

    <GenericAlertModal @handlePositiveCallback="handleAlertCallback(true)" @handleNegativeCallback="handleAlertCallback"  @hideGenericAlertModal="handleAlertCallback" :showAlertModal="showAlertModal" :content="genericAlertModalTxt" />
  </div>
</template>

