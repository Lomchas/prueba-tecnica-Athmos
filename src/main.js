import { createApp } from 'vue'
import App from './App.vue'
import router from './Router'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faGoogle, faFacebook } from '@fortawesome/free-brands-svg-icons'
import { faPlus, faMagnifyingGlass, faCheck, faTrash, faPencil, faThumbsUp, faBars } from '@fortawesome/free-solid-svg-icons'
import store from './Store'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './Firebase/config'


library.add
  (
    faGoogle,
    faFacebook,
    faPlus,
    faMagnifyingGlass,
    faCheck, faTrash,
    faPencil,
    faThumbsUp,
    faBars
  )


onAuthStateChanged(auth, (user) => {
  createApp(App)
    .component('font-awesome-icon', FontAwesomeIcon)
    .use(router)
    .use(store)
    .mount('#app')

  if (user?.uid) {
    store.commit('setUser', user)
    store.commit('VerifyAuth', true)
    store.commit('setDisplayName', user.displayName)

  }
  else {
    store.commit('setUser', null)
  }

})


