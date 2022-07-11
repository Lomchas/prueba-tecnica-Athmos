<template>
    <div class="container-home">
        <Illustration2/>
        <App/>
    </div>
</template>
<script>
import './appHome.scss'
import App from '../AppTask/App.vue'
import Illustration2 from '../../Illustrations/illustration2.vue'
import { useStore } from 'vuex'

export default {
    name: 'Home',
    components: {
    App,
    Illustration2,
},
    setup() {
        
    },
    beforeMount() {
        const store = useStore()

        try {
            store.dispatch('actionGetFirestore')
        }
        catch (err) {
            console.log(err)
        }
    },
}
</script>
