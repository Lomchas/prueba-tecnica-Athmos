
<template>
  <div class="container-app">
    <NavVue></NavVue>
    <router-view />
  </div>
</template>

<script>
import NavVue from './components/Nav/Nav.vue'

export default {
  name: 'App',
  components: {
    NavVue
  },
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Finlandica:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&display=swap');

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Finlandica', sans-serif;
}

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  width: 100%;
  height: 100%;
  padding: 5rem 0;
  background: #BADAFF;
  color: #2c3e50;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.container-app {
  width: 80%;
  height: 100%;
  background: #fcfcfcda;
  padding-bottom: 3rem;
  border: none;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.281);
}


@media screen and (max-width: 1000px) {
  #app {
    width: 100%;
    height: 100%;
    padding: 2rem 0;
  }

  .container-app {
    width: 85%;
    height: 100%;
    padding-bottom: 3rem;
  }

}

@media screen and (max-width: 700px) {
  #app {
    width: 100%;
    height: 100%;
    padding: 1rem 0;
  }

  .container-app {
    width: 90%;
    height: 100%;
    padding-bottom: 2rem;
    position: relative;
}
}

@media screen and (max-width: 500px) {
  #app {
    width: 100%;
    height: 100%;
    padding: 1rem 0;
  }

  .container-app {
    width: 95%;
    height: 100%;
    padding-bottom: 1rem;
  }
}
</style>
