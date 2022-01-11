<template>
  <div id="the-navbar">
    <b-navbar toggleable="lg" fixed="top" >
      <b-navbar-brand href="#">lorifas.com</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav class="ml-auto">
          <b-nav-item href="#">Inicio</b-nav-item>
          <b-nav-item href="#">Que somos?</b-nav-item>
          <b-nav-item href="#">Servicios</b-nav-item>
          <b-nav-item href="#">Contacto</b-nav-item>
          <b-nav-item href="#">Ver Rifas</b-nav-item>
          <b-nav-item href="#">Ingresar</b-nav-item>
<!--           <b-nav-item-dropdown text="Lang" right>
            <b-dropdown-item href="#">EN</b-dropdown-item>
            <b-dropdown-item href="#">ES</b-dropdown-item>
            <b-dropdown-item href="#">RU</b-dropdown-item>
            <b-dropdown-item href="#">FA</b-dropdown-item>
          </b-nav-item-dropdown> -->
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
export default {
  name: 'WebpageNavBar',
  props: {
  }
}
</script>
