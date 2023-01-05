<script lang="ts" setup>
  import { DateTime } from 'luxon'
  import { h, ref } from 'vue'
  import { DataTableColumns, NIcon } from 'naive-ui'
  import { NButton } from 'naive-ui'
  import { defineProps, reactive, toRefs, defineEmits } from "vue";
  import { 
   Trophy, Medal, Award, HandshakeSlash, Handshake
  } from '@vicons/fa'

  const props = defineProps({
    showDetailsModal: Boolean,
    raffle: Object
  })
  const { showDetailsModal, raffle } = toRefs(props)
  // console.log(showDetailsModal)
  const emit = defineEmits(['hideRaffleDetails', 'goToTickets', 'modifyRaffle'])

  const renderPurchaseConfirmed = (purchaseConfirmed) => {
    const icon = purchaseConfirmed ? Handshake : HandshakeSlash
    if(purchaseConfirmed)
      return h(NIcon, { color: 'green', size: '18px'}, { default: () => h(Handshake) })

    return h(NIcon, { size: '18px'}, { default: () => h(HandshakeSlash) })
  }
  // const renderPrizeIcons = (idPrize) => {
  //   let prize = raffle?.Prizes.filter(item=>item.id === idPrize)
  //   if(!prize.length) return ""
  //   prize = prize[0]
  //   let icon = Trophy

  //   if(prize.prizeType === 1) icon = Trophy
  //   else if(prize.prizeType === 2) icon = Medal
  //   else if(prize.prizeType === 3) icon = Award
  //   else return ""

  //   return h(NIcon, null, { default: () => h(icon) })
  // }

  const ticketColumns: DataTableColumns<any> = [
    { title: '', key: 'purchaseConfirmed', render (row){
        return h ('strong', [renderPurchaseConfirmed(row.purchaseConfirmed)])
      }},
    { title: 'N. boleto', key: 'ticketNumber', 
    },
    { title: 'F. de compra', key: 'purchaseDate', render(row){ return h('label', row.purchaseDate ? DateTime.fromISO(row.purchaseDate).toLocaleString(DateTime.DATETIME_MED) : 'Pago pendiente')} },
    // { title: 'Nota', key: 'note' },
    { title: 'Comprador', key: 'nonUserBuyer', 
      render (row){
        return h ('strong', row.nonUserBuyer)
      }
    },
  ]

  const clearData = () => {
    emit('hideRaffleDetails')
  }
</script>
<template>
  <n-modal :show="showDetailsModal" preset="dialog" title="Dialog" :show-icon="true" type="info" :on-close="clearData" style="width: 600px">
    <template #header>
      <div>Detalles de sorteo</div>
    </template>
    <n-tabs type="line" animated>
      <n-tab-pane name="details" tab="General">
        <n-grid x-gap="20" y-gap="5" cols="2">
            <n-gi :span="1"><strong>Forma del sorteo</strong><br>{{raffle?.raffleType}}</n-gi>
            <n-gi :span="1"><strong>Fecha y hora del sorteo</strong><br>{{DateTime.fromISO(raffle?.celebrationDate).toLocaleString(DateTime.DATETIME_MED)}}</n-gi>

            <n-gi :span="2"><strong>Titulo</strong><br>{{raffle?.title}}</n-gi>
            <n-gi :span="2"><strong>Descripcion</strong><br>{{raffle?.description}}</n-gi>

            <n-gi :span="1"><strong>Tipo de sorteo</strong><br>{{raffle?.privacyType}}</n-gi>
            <n-gi :span="1"><strong>Id. del sorteo</strong><br>{{raffle?.keywordSearch}}</n-gi>

            <n-gi :span="1"><strong>Total de boletos</strong><br>{{raffle?.ticketsQty}}</n-gi>
            <n-gi :span="1"><strong>Precio del boleto</strong><br>{{raffle?.ticketPrice}}</n-gi>

            <n-gi :span="1"><strong>Fecha de cierre de venta de boletos</strong><br>{{DateTime.fromISO(raffle?.salesEndDate).toLocaleString(DateTime.DATETIME_MED)}}</n-gi>

            <n-gi :span="2"><strong>Como comprar el boleto?</strong><br>{{raffle?.saleType}}</n-gi>

            <n-gi :span="1"><strong>Organizador</strong><br>{{raffle?.organizer}}</n-gi>
            <n-gi :span="1"><strong>Contacto para dudas</strong><br>{{raffle?.organizerContact}}</n-gi>

            <n-gi :span="1"><strong>Dirección para ver el premio</strong><br>{{raffle?.prizeAddress}}</n-gi>
            <n-gi :span="1"><strong>Dirección de la premiación</strong><br>{{raffle?.awardAddress}}</n-gi>
        </n-grid>
      </n-tab-pane>
      <n-tab-pane name="prizes" tab="Premios">
        <n-grid x-gap="20" y-gap="5" cols="2" v-for="(prize, idx) in raffle?.Prizes" :key="idx">
          <n-gi :span="1"><strong>Nombre</strong><br>{{prize?.name}}</n-gi>
          <n-gi :span="1"><strong>Orden</strong><br>{{prize?.prizeType}}</n-gi>
          <n-gi :span="2"><strong>Detalles</strong><br>{{prize?.details}}</n-gi>
          <n-gi :span="1"><strong>Estado</strong><br>{{prize?.status}}</n-gi>
          <n-gi :span="1"><strong>Precio aproximado</strong><br>{{prize?.price}}</n-gi>
          <n-gi :span="2"><strong>Fotos</strong><br>
            <n-image
              v-if="prize?.pic1Url"
              lazy
              width="100"
              :src="prize?.pic1Url"
            />
            <n-image
              v-if="prize?.pic2Url"
              lazy
              width="100"
              :src="prize?.pic2Url"
            />
            <n-image
              v-if="prize?.pic3Url"
              lazy
              width="100"
              :src="prize?.pic3Url"
            />
          <!-- {{prize?.pic1Url}}{{prize?.pic2Url}}{{prize?.pic3Url}} -->
          </n-gi>
          <n-gi :span="2">-</n-gi>
        </n-grid>
      </n-tab-pane>
      <n-tab-pane name="tickets" tab="Boletos">
        <n-data-table
          :columns="ticketColumns"
          :data="raffle?.Tickets"
        />
      </n-tab-pane>
      <n-tab-pane name="log" tab="Bitacora">
        <!-- <n-grid x-gap="20" y-gap="5" cols="1">
          <n-gi :span="1"><strong>Se creó el sorteo: </strong><small>Dec 01, 2022, 13:20:01</small></n-gi>
          <n-gi :span="1"><strong>Fulana Gabriel comentó: </strong><small>Dec 01, 2022, 13:20:01</small><br>Este es el pinche comentario de todos los dias esta cosa no funca bien</n-gi>
          <n-gi :span="1"><strong>Compra de boleto: </strong><small>Dec 02, 2022, 13:20:01</small><br>Este es el pinche comentario de todos los dias esta cosa no funca bien</n-gi> -->
        <!-- </n-grid> -->
        <n-timeline>
          <!-- <n-timeline-item content="Oops" /> -->
            <n-timeline-item
              type="success"
              title="Se creó el sorteo"
              content=""
              time="Dec 01, 2022, 13:20:01"
              line-type="dashed"
            />
            <n-timeline-item
              title="Fulana Gabriel comentó"
              content="Este es el pinche comentario de todos los dias esta cosa no funca bien"
              time="Dec 02, 2022, 13:20:01"
            />
            <n-timeline-item
              type="info"
              title="Compra de boleto"
              content="Juan hernandez"
              time="Dec 03, 2022, 13:20:01"
            />
            <n-timeline-item
              type="info"
              title="Se cancelaron 2 boletos"
              time="Dec 04, 2022, 13:20:01"
            />
            <n-timeline-item
              type="success"
              title="La venta de boletos se termino"
              time="Dec 05, 2022, 13:20:01"
            />
            <n-timeline-item
              type="success"
              title="El sorteo se celebro"
              content="Los boletos ganadores fueron: 001, 040, 043"
              time="Dec 05, 2022, 13:20:01"
            />
          <!-- <n-timeline-item content="Oops" /> -->
        </n-timeline>
      </n-tab-pane>
      <!-- <n-tab-pane name="actions" tab="Acciones">
        <n-grid x-gap="20" y-gap="5" cols="4">
          <n-gi :span="1">
            <strong>Cambiar estatus</strong>
            <n-button @click="clearData">
              Modificar
            </n-button>
          </n-gi>
          <n-gi :span="1">
            <strong>Cambiar estatus</strong>
            <n-button @click="clearData">
              Modificar
            </n-button>
          </n-gi>
          <n-gi :span="1">
            <strong>Cambiar estatus</strong>
            <n-button @click="clearData">
              Modificar
            </n-button>
          </n-gi>
        </n-grid>
      </n-tab-pane> -->
    </n-tabs>
    <template #action>
      <n-space>
        <n-button @click="clearData">
          Lista de Boletos
        </n-button>
        <n-button @click="clearData">
          Modificar Sorteo
        </n-button>
        <!-- <n-button @click="clearData">
          Publicar
        </n-button> -->
        <n-button @click="clearData">
          Eliminar Sorteo
        </n-button>
      </n-space>
    </template>
  </n-modal>
</template>

