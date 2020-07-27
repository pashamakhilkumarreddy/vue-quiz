<template>
  <header>
    <nav class="navbar" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <a href="#" class="navbar-item">
          <img src="https://bulma.io/images/bulma-logo.png" alt="Logo" />
        </a>
        <a href="#" class="navbar-item">
          Quiz App
        </a>
        <a role="button" :class="['navbar-burger', 'burger', showNavbar ? 'is-active' : '']"
        aria-label="menu" aria-expanded="false" data-target="main-navbar"
        @click="toggleNavbarBurger">
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>
      <div id="main-navbar" :class="{ 'navbar-menu': true, 'is-active': showNavbar}" >
          <div class="navbar-start">
              <a href="" class="navbar-item">
                  Home
              </a>
          </div>
      </div>
    </nav>
  </header>
</template>
<style scoped>
header {
    border-bottom: 1px solid #f7f7f7;
    box-shadow: 0 1px 0.5rem 1px rgba(0, 0, 0, 0.2);
}

a.navbar-item:hover {
    background-color: #fafafa !important;
    color: #3273dc;
}
</style>
<script>
export default {
  name: 'Header',
  data() {
    return {
      showNavbar: false,
    };
  },
  methods: {
    toggleNavbarBurger() {
      this.showNavbar = !this.showNavbar;
    },
  },
};
</script>
