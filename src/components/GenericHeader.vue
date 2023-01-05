<script lang="ts" setup>
  import { defineProps, toRefs, defineEmits, onMounted } from "vue";

  const props = defineProps({
    btnColor: String,
    pageTitle: String,
    pageSubtitle: String,
    createBtnTxt: String,
    showCreateBtn: Boolean,
    showBackBtn: Boolean
  })

  const { btnColor, pageTitle, pageSubtitle, createBtnTxt, showBackBtn, showCreateBtn } = toRefs(props)

  let btnType = 'primary'
  if(btnColor.value !== undefined) btnType = btnColor.value
  
  const emit = defineEmits(['handleBackBtn', 'handleCreateBtn'])

  const handleBack = () => {
    emit('handleBackBtn')
  }

  const handleCreate= () => {
    emit('handleCreateBtn')
  }

  const toggleActionButtons = () => {
    if(!showBackBtn.value){
      const elem = document.querySelector('.n-page-header__back')
      elem.remove()
    }
    if(!showCreateBtn.value){
      const elem = document.querySelector('.n-page-header__extra')
      elem.remove()
    }
  }

  onMounted(() => {
     toggleActionButtons()
  })
</script>
<template>
  <n-page-header :subtitle="pageSubtitle" @back="handleBack">
    <template #title>
      {{ pageTitle }}
    </template>
    <template #extra >
      <n-button @click="handleCreate" :type="btnType">{{createBtnTxt}}</n-button>
    </template>
  </n-page-header>
</template>

