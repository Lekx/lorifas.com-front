<script lang="ts" setup>
  import { router } from '@/router'
  import { useAuthStore } from '@/stores/auth.store'
  const { user, logout } = useAuthStore();

  const doLogout = () => {
    logout()
  }

  const handleMenuSelection = (key: string | number)  => {
    switch (key) {
      case 'logout':
         doLogout()
        break;
      default:
        router.push(key)
        break;
    }
  }
  
  let publicMenu = [
    {
      title: {
        label: 'Inicio',
        url: "/"
      }
    },
    {
      title: {
        label: 'Nosotros',
        url: "/about"
      }
    },
  ]

  let userMenu = [
    {
      title: {
        label: 'Participar'
      },
      options: [
        {
          label: 'Buscar Sorteo',
          key: "/raffle/search",
        }
      ]
    },
    {
      title: {
        label: 'Iniciar sesion',
        key: "/login"
      },
      options: [

      ]
    },
  ]

  if(user) {
    userMenu = [
      {
        title: {
          label: 'Participar'
        },
        options: [
          {
            label: 'Buscar Sorteo',
            key: "/raffle/search",
          },
          {
            label: 'Mis boletos',
            key: "/tickets/purchases"
          }
        ]
      },
      {
        title: {
          label: 'Gestionar'
        },
        options: [
          {
            label: 'Mis Sorteos',
            key: "/raffle/list"
          },
          {
            label: 'Crear Sorteo',
            key: "/raffle/form"
          }
        ]
      },
      {
        title: {
          label: 'Perfil',
        },
        options: [
          {
            label: 'Perfil publico',
            key: "/profile/:id/summary"
          },
          {
            label: 'Mi cuenta',
            key: "/profile/:id/account"
          },
          {
            label: 'Logout',
            key: 'logout'
          }
        ]
      },
    ]
  }
  
</script>
<template>
  <nav id="main-menu">
    <n-space justify="space-between">
      <n-space justify="space-between">
        <div class="logo-wrapper">
          <img src="@/assets/imgs/lorifas.com-logo.png" @click="handleMenuSelection('/')"  >
        </div>
        <n-dropdown v-for="(menu, idx) of publicMenu" :options="menu.options" :key="idx">
          <n-button
            text
            tag="button"
            type="secondary"
            @click="handleMenuSelection(menu.title.url)"          
          >
            {{menu.title.label}}
          </n-button>
        </n-dropdown>
      </n-space>
      <n-space justify="space-between">
        <n-dropdown v-for="(menu, idx) of userMenu" :options="menu.options" :key="idx" @select="handleMenuSelection">
          <n-button
            text
            tag="a"
            :href="menu.title.url"
            type="secondary"
          >
            {{menu.title.label}}
          <n-avatar
          style="margin-left:10px;"
          round
          lazy
          size="small"
          :src="user?.picture"
          v-if="menu.title.label === 'Perfil' && user"
          /> 
          </n-button>
        </n-dropdown>

      </n-space>
    </n-space>
  </nav>
</template>