<script lang="ts" setup>
  import { defineProps, toRefs, defineEmits, onMounted, ref, watch} from "vue";

  const props = defineProps({
    showAlertModal: Boolean,
    content: String,
    title: String,
    positiveText: String,
    negativeText: String
  })

  const { content, title, showAlertModal, positiveText, negativeText } = toRefs(props)

  let modalTitle = ref('Confirmar acción')
  if(title.value !== undefined) modalTitle.value = title.value
  
  let modalContent = ref('Estas seguro de continuar con esta accion?')
  if(content.value && content.value !== undefined) modalContent.value = content.value

  let positiveTextModal = ref('Sí, continuar')
  if(positiveText.value !== undefined) positiveTextModal.value = positiveText.value

  let negativeTextModal = ref('Cancelar')
  if(negativeText.value !== undefined) negativeTextModal.value = negativeText.value

  const emit = defineEmits(['handlePositiveCallback', 'handleNegativeCallback'])
  
  watch(content, (newVal, oldVal) => {
    modalContent.value = newVal;
  });

  watch([() => content, () => title, () => positiveText, () => negativeText], 
  ([newContent, newTitle, newPositiveText, newNegativeText] ) => {
    modalTitle.value = newContent;
    modalContent.value = newTitle;
    positiveTextModal.value = newPositiveText;
    negativeTextModal.value = newNegativeText;
  })

  const positiveCallback = () => {
    emit('handlePositiveCallback')
  }

  const negativeCallback= () => {
    emit('handleNegativeCallback')
  }
</script>
<template>
  <n-modal
    :show="showAlertModal"
    preset="dialog"
    :title="modalTitle"
    :content="modalContent"
    :positive-text="positiveTextModal"
    :negative-text="negativeTextModal"
    @positive-click="positiveCallback"
    @negative-click="negativeCallback"
    :on-close="negativeCallback"
  />
</template>

