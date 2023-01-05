<template>
  <div class="home comp-wrapper">
    <n-card title="Home-kit"> 
    <div>
      <ul>
        <li>Listar todas las rifas Publicas</li>
        <li>Buscar rifas - Publicas y Privadas</li>
        <li>Crear una rifa - Publica o privada</li>
      </ul>
    </div>
    <div>
      <h3></h3>
      <p></p>
    </div>
    <div>
      <h3>Detalle de rifa</h3>
      <ul>
        <li>Datos completos de la rifa</li>
        <li>Solicitar participacion</li>
        <li>Aceptar/rechazar invitacion</li>
        <li>Ver ganadores</li>
        <li>Ver participantes</li>
      </ul>
    </div>
    <div>
      <h3>Perfil de rifador</h3>
      <ul>
        <li>Ver resumen de rifas</li>
      </ul>
    </div>
    <div>
      <h3>Mi Perfil</h3>
      <ul>
        <li>Actualizar datos cuenta</li>
        <li>Actualizar datos personales</li>
        <li>Configuaracion de cuentas</li>
        <li>Cerrar sesion</li>
      </ul>
    </div>
    <div>
      <h3>Auth</h3>
      <ul>
        <li>Iniciar sesion</li>
      </ul>
    </div>
    <div>
      <h3>Landing page</h3>
      <ul>
        <li>Highlights de la pagina</li>

        <n-button @click="handleClick" type="primary">
         show a notification
        </n-button>
      </ul>
    </div>
  </n-card>
  </div>

</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useNotification } from 'naive-ui'
// import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src

export default defineComponent({
  name: 'HomeView',
  components: {
    // HelloWorld,
  },
  setup(){
    const notification = useNotification()
    return {
      handleClick () {
        notification.warning({
          content: 'wakawaka...'
        })
      }
    }
    
  }
});
</script>
