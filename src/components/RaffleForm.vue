<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { FormInst, FormValidationError, FormItemRule } from 'naive-ui'
import { useRaffleStore } from '@/stores/raffle.store'
import { Gifts, TrashAltRegular } from '@vicons/fa'
import { Icon } from '@vicons/utils'
import { useNotification, useLoadingBar } from 'naive-ui'
import {router} from '@/router'
import { useRoute, useRouter } from 'vue-router'
const routerSync = useRouter()
const route = useRoute()

const raffleStore = useRaffleStore()
// if(!raffleStore.raffles.length){
//   raffleStore.getRaffles()
// }
// raffleStore.getRaffles()


const formRef = ref<FormInst | null>(null)

const errorMessage = 'Campo obligatorio'
let formIsFilled = false
const validateForm = () => {
  formRef.value?.validate((errors: any) =>{
    formIsFilled = errors === undefined ? true : false
  })
}

const requiredFieldRule = {
  required: true,
  message: errorMessage,
  trigger: ['blur', 'input'],
}

const requiredFieldValidator = {
    required: true,
    message: errorMessage,
    trigger: ['blur', 'input'],
    validator (rule: FormItemRule, value: string) {
      if (!value)
        return new Error('Error is required')
      return true
    },
  }

  const privacyType = [
    {label: 'Privado', value: 1},
    {label: 'Publico', value: 2}
  ]

  const statusTypes = [
    {label: 'Nuevo', value: 1},
    {label: 'Seminuevo', value: 2},
    {label: 'Viejo', value: 3}
  ]

  const prizeTypes = [
    {label: 'Primer premio', value: 1},
    {label: 'Segundo lugar', value: 2},
    {label: 'Tercer lugar', value: 3}
  ]

  const raffleMechanism = [
    {label: 'Sorteo propio', value: 'own'},
    {label: 'Loteria nacional', value: 'lnm'},
    {label: 'Sorteos Tec', value: 'tec'},
    {label: 'Sorteo Melate', value: 'mel'}
  ]
  

  const formValue:any = reactive({
    raffle: {
      title: null,
      description: null,
      celebrationDate: null,
      ticketsQty: null,
      ticketPrice: null,
      raffleType: null,
      privacyType: null,
      status: 0,
      keywordSearch: null
    },
    prizes: [],
    detail: {
      saleType: null,
      salesEndDate: null,
      organizer: null,
      organizerContact: null,
      awardAddress: null,
      prizeAddress: null,
    }
  })
  const removePrize = (index: number) => {
    formValue.prizes.splice(index, 1)
  }

  const addPrize = () => {
    formValue.prizes.push({
      name: null,
      details: null,
      status: null,
      price: null,
      pic1Url: null,
      pic2Url: null,
      pic3Url: null,
      prizeType: null,
    })
  }
  const fillForm = () => {
    formValue.raffle.title = 'Gran sorteo para salir de pobre'
    formValue.raffle.description = 'No dejes pasar esta oportunidad, solo hay 100 participantes y puedes llevarte uno de dos premios!'
    formValue.raffle.celebrationDate = 1669934466000
    formValue.raffle.ticketsQty = 100
    formValue.raffle.ticketPrice = 150
    formValue.raffle.raffleType = 'tec'
    formValue.raffle.privacyType = 2
    formValue.raffle.keywordSearch = 'lorifas.com'

    formValue.detail.salesEndDate = 1669934466000
    formValue.detail.saleType = 'Para adquirir tus boletos, aparta uno de la lista y podras ver el numero de cuenta donde puedes depositar o transferir, hecho esto regresa a tu seccion de boletos para adjuntar el recibo y asi puedas finalizar la compra'
    formValue.detail.organizer = 'Milpremios.com'
    formValue.detail.organizerContact = 'hugo@milpremios.com'
    formValue.detail.awardAddress = '-'
    formValue.detail.prizeAddress = '-'

    addPrize()
    formValue.prizes[0].name = 'PS4 PRO 1TB'
    formValue.prizes[0].details = 'Incluye 2 controles, 2 juegos y sus cables weon'
    formValue.prizes[0].status = 2
    formValue.prizes[0].price = 7800
    formValue.prizes[0].prizeType = 1
    formValue.prizes[0].pic1Url = 'https://image.shutterstock.com/image-photo/chengdu-china-august-12-2019-260nw-1477267487.jpg'
    
    addPrize()
    formValue.prizes[1].name = 'Gansito'
    formValue.prizes[1].details = 'El segundo lugar se lleva un gansito bien congelado'
    formValue.prizes[1].status = 1
    formValue.prizes[1].price = 1200
    formValue.prizes[1].prizeType = 2
  }

  const prefillForm = () => {
    formValue.raffle.title = raffleStore.selectedRaffle.title
    formValue.raffle.description = raffleStore.selectedRaffle.description
    formValue.raffle.celebrationDate = (new Date(raffleStore.selectedRaffle.celebrationDate)).getTime()
    formValue.raffle.ticketsQty = parseInt(raffleStore.selectedRaffle.ticketsQty)
    formValue.raffle.ticketPrice = parseFloat(raffleStore.selectedRaffle.ticketPrice)
    formValue.raffle.raffleType = raffleStore.selectedRaffle.raffleType
    formValue.raffle.privacyType = raffleStore.selectedRaffle.privacyType
    formValue.raffle.keywordSearch = raffleStore.selectedRaffle.keywordSearch

    formValue.detail.salesEndDate = (new Date(raffleStore.selectedRaffle.salesEndDate)).getTime()
    formValue.detail.saleType = raffleStore.selectedRaffle.saleType
    formValue.detail.organizer = raffleStore.selectedRaffle.organizer
    formValue.detail.organizerContact = raffleStore.selectedRaffle.organizerContact
    formValue.detail.awardAddress = raffleStore.selectedRaffle.awardAddress
    formValue.detail.prizeAddress = raffleStore.selectedRaffle.prizeAddress

    formValue.prizes = raffleStore.selectedRaffle.Prizes.map((p: any)=>{
      return {
        ...p,
        price: parseFloat(p.price)
      }
    })
  }
  let idRaffle: any = null;
  const checkSelectedRaffle = async () => {

    await routerSync.isReady();
    idRaffle = route.params.id

    if(!idRaffle) return
    if(!raffleStore.selectedRaffle) await raffleStore.fetchSelectedRaffle(idRaffle)
    prefillForm()
  }

  onMounted(async () => {
    await checkSelectedRaffle()
  })

  const rules = {
    raffle: {
      title: requiredFieldValidator,
      description: requiredFieldValidator,
      celebrationDate: requiredFieldValidator,
      ticketsQty: requiredFieldValidator,
      ticketPrice: requiredFieldValidator,
      raffleType: requiredFieldValidator,
      privacyType: requiredFieldValidator
    },
    prizes: {
      name: requiredFieldValidator,
      details: requiredFieldValidator,
      status: requiredFieldValidator,
      price: requiredFieldValidator,
      // pictures: requiredFieldValidator,
      prizeType: requiredFieldValidator
    },
    detail: {
      salesEndDate: requiredFieldValidator,
      saleType: requiredFieldValidator,
      organizerContact: requiredFieldValidator,
      organizer: requiredFieldValidator
    }
  }
  
  const notification = useNotification()
  const loadingBar = useLoadingBar()
  const saveForm = async () => {
    loadingBar.start()

    try {
      const data = {
        ...formValue.value?.model.raffle,
        ...formValue.value?.model.detail,
        prizes: formValue.value?.model.prizes
      }
      let response = null
      if(idRaffle)
        response = await raffleStore.updateRaffle(data)
      else
        response = await raffleStore.createRaffle(data)

      notification.success({
        content: response.message,
        duration: 6000,
      })
      raffleStore.getRaffles()
      goToList()
    } catch (error) {
      notification.error({
        content: `Error, intenta de nuevo.${error}`,
        duration: 6000,
      })
    } finally {
      loadingBar.finish()
    }
    // validateForm()
    // console.log('after >>',formIsFilled)
  }

  const goToList = () => {
    router.push('/raffle/list')
  }
</script>
<template>
  <div class="raffle-form-comp">
    
    <p>Llena los campos obligatorios, si no tienes algun dato a la mano, no te preocupes guarda un borrador y vuelve a completar tu sorteo cuando quieras.</p>
    <n-form
        ref="formRef"
        :model="formValue"
        :rules="rules"
        size="large"
      >
      <n-grid x-gap="20" y-gap="10" cols="1 600:2">
        <n-gi :span="2">
          <h3>1.- Detalles del Sorteo</h3>
        </n-gi>
        <n-gi :span="1">
          <n-form-item label="Forma de sorteo" path="raffle.raffleType" show-require-mark>
            <n-select
            v-model:value="formValue.raffle.raffleType"
            placeholder="Selecciona un mecanismo para elegir al ganador"
            :options="raffleMechanism"
            />
          </n-form-item>
        </n-gi>
        <n-gi :span="1">
          <n-form-item label="Fecha y hora del sorteo" path="raffle.celebrationDate" show-require-mark>
            <n-date-picker v-model:value="formValue.raffle.celebrationDate" type="datetime" clearable />
          </n-form-item>
        </n-gi>
        <n-gi :span="2">
          <n-form-item label="Título" path="raffle.title" show-require-mark>
            <n-input v-model:value="formValue.raffle.title" placeholder="Dale un nombre al tu sorteo" />
          </n-form-item>
        </n-gi>
        <n-gi :span="2">
          <n-form-item label="Descripción" path="raffle.description" show-require-mark>
            <n-input
              v-model:value="formValue.raffle.description"
              placeholder="A grandes rasgos explica de que se trata"
              type="textarea"
              :autosize="{
                minRows: 3,
                maxRows: 5
              }"
            />
          </n-form-item>
        </n-gi>
        <n-gi :span="1">
          <n-form-item label="Tipo de sorteo" path="raffle.privacyType" show-require-mark>
            <n-select
            v-model:value="formValue.raffle.privacyType"
            placeholder="Elige la privacidad de tu sorteo"
            :options="privacyType"
            />
          </n-form-item>
        </n-gi>
        <n-gi :span="1">
          <n-form-item label="Identificador de sorteo" path="raffle.keywordSearch">
            <n-input v-model:value="formValue.raffle.keywordSearch" placeholder="Escribe un identificador para tu sorteo" maxlength="11"/>
          </n-form-item>
        </n-gi>
        <n-gi :span="1">
          <n-form-item label="Total de boletos" path="raffle.ticketsQty" show-require-mark>
            <n-input-number clearable :precision="0" v-model:value="formValue.raffle.ticketsQty" :show-button="false" placeholder="1000"/>
          </n-form-item>
        </n-gi>
        <n-gi :span="1">
          <n-form-item label="Precio del boleto" path="raffle.ticketPrice" show-require-mark>
            <n-input-number clearable :precision="2" v-model:value="formValue.raffle.ticketPrice" :show-button="false" placeholder="0.00">
              <template #prefix>
                $
              </template>
            </n-input-number>
          </n-form-item>
        </n-gi>
        <n-gi :span="1">
          <n-form-item label="Fecha de cierre de venta de boletos" path="detail.salesEndDate" show-require-mark>
            <n-date-picker v-model:value="formValue.detail.salesEndDate" type="datetime" clearable />
          </n-form-item>
        </n-gi>


        <n-gi :span="2">
          <h3>2.- Informacion adicional</h3>
        </n-gi>
        <n-gi :span="2">
          <n-form-item label="Como comprar el boleto?" path="detail.saleType" show-require-mark>
            <n-input v-model:value="formValue.detail.saleType" placeholder="En persona, por transferencia, QR, etc..." />
          </n-form-item>
        </n-gi>
        <n-gi :span="1">
          <n-form-item label="Organizador" path="detail.organizer" show-require-mark>
            <n-input v-model:value="formValue.detail.organizer" placeholder="Persona o establecimiento que celebra el sorteo" />
          </n-form-item>
        </n-gi>
        <n-gi :span="1">
          <n-form-item label="Contacto para dudas" path="detail.organizerContact" show-require-mark>
            <n-input v-model:value="formValue.detail.organizerContact" placeholder="Teléfono, correo o red social" />
          </n-form-item>
        </n-gi>
        <n-gi :span="2">
          <n-form-item label="Dirección donde se puede ver el premio" path="detail.prizeAddress">
            <n-input v-model:value="formValue.detail.prizeAddress" placeholder="Calle y numero, colonia, cp, ciudad y estado" />
          </n-form-item>
        </n-gi>
        <n-gi :span="2">
          <n-form-item label="Dirección donde se hará la premiación" path="detail.awardAddress">
            <n-input v-model:value="formValue.detail.awardAddress" placeholder="Calle y numero, colonia, cp, ciudad y estado" />
          </n-form-item>
        </n-gi>
        <!-- add prizes button -->
        <n-gi :span="2">
          <h3>3.- Premio(s)</h3>
          <n-button @click="addPrize()" type="success">
            +
          </n-button>
        </n-gi>
      </n-grid>

      <n-grid x-gap="20" y-gap="10" cols="1 600:6" v-for="(prize, index) in formValue.prizes" :key="index">
        <n-gi :span="4" >
          <h4 class="title-with-icon">
            <Icon size="28">
              <Gifts />
            </Icon>
            <label v-if="formValue.prizes[index].prizeType" class="m-5">
              {{ prizeTypes[formValue.prizes[index].prizeType-1].label }}
            </label>
            <n-button text @click="removePrize(index)" type="error" class="remove-btn">
              <Icon size="15">
                <TrashAltRegular />
              </Icon>
            </n-button>
          </h4>
        </n-gi>


        <n-gi :span="4">
          <n-form-item label="Nombre" :path="`prizes[${index}].name`" :rule="requiredFieldValidator" show-require-mark>
            <n-input v-model:value="prize.name" placeholder="Qué cosa estas sorteando?"/>
          </n-form-item>
        </n-gi>
        <n-gi :span="2">
          <n-form-item label="Orden" :path="`prizes[${index}].prizeType`" :rule="requiredFieldValidator" show-require-mark>
            <n-select
            v-model:value="prize.prizeType"
            placeholder="Que numero de premio es"
            :options="prizeTypes"
            />
          </n-form-item>
        </n-gi>



        <n-gi :span="6">
          <n-form-item label="Detalles" :path="`prizes[${index}].details`" :rule="requiredFieldValidator" show-require-mark>
            <n-input
              v-model:value="prize.details"
              placeholder="Describe detalladamente el articulo que estas sorteando"
              type="textarea"
              :autosize="{
                minRows: 3,
                maxRows: 5
              }"
            />
          </n-form-item>
        </n-gi>
        <n-gi :span="2">
          <n-form-item label="Estado" :path="`prizes[${index}].status`" :rule="requiredFieldValidator" show-require-mark>
            <n-select
            v-model:value="prize.status"
            placeholder="Estado en el que se encuentra el artículo"
            :options="statusTypes"
            />
          </n-form-item>
        </n-gi>
        <n-gi :span="2">
          <n-form-item label="Precio aproximado" :path="`prizes[${index}].name`" :rule="requiredFieldValidator" show-require-mark>
            <n-input-number clearable :precision="2" v-model:value="prize.price" :show-button="false" placeholder="0.00">
              <template #prefix>
                $
              </template>
            </n-input-number>
          </n-form-item>
        </n-gi>

        <n-gi :span="2">
          <n-form-item label="Foto" path="prizes.pictureUrl">
            <n-upload
              action="https://www.mocky.io/v2/5e4bafc63100007100d8b70f"
              :headers="{
                'naive-info': 'hello!'
              }"
              :data="{
                'naive-data': 'cool! naive!'
              }"
            >
              <n-button>Subir</n-button>
            </n-upload>
          </n-form-item>
        </n-gi>
      </n-grid>

      <n-grid x-gap="20" y-gap="10" cols="1 600:2">
        <n-gi :span="2">
          <n-space justify="center">
            <!-- TEST FIELD TEST FIELD -->
            <n-form-item>
              <n-button @click="goToList()" type="secondary">
                Cancelar
              </n-button>
            </n-form-item>
            <n-form-item>
              <n-button @click="fillForm()" type="warning">
                fill
              </n-button>
            </n-form-item>

            <n-form-item>
              <n-button @click="saveForm()" type="info">
                Guardar Borrador
              </n-button>
            </n-form-item>
            <!-- <n-form-item>
              <n-button @click="saveForm(true)" type="primary" :disabled="!formIsFilled">
                Guardar y Publicar
              </n-button>
            </n-form-item> -->
          </n-space>
        </n-gi>
      </n-grid>      
    </n-form>
  </div>
</template>