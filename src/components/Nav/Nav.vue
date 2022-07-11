<template>
    <div class="container-nav">
        <nav>
            <div class="container-logo">
                <img src="../../Image/Logo.png" alt="Logo">
            </div>
            <ul :class="[ BarChecked ? 'items_nav noAuth barsActive' : '', 'items_nav noAuth']" v-if="isAuth === false">
                <li>
                    <router-link class="router-link" to="/login" exact>LogIn</router-link>
                </li>
                <li>
                    <router-link class="router-link" to="/signup">SignUp</router-link>
                </li>
            </ul>
            <ul :class="[ BarChecked ? 'items_nav isAuth barsActive' : '', 'items_nav isAuth']" v-if="isAuth">
                <li>
                    <router-link class="router-link" to=/home>
                        Estate Task
                    </router-link>
                </li>
                <li>
                    <router-link class="router-link" to=/addTask>
                        Add Task
                    </router-link>
                </li>
                <li>
                    <router-link class="router-link" to=/app/details>
                        Estate Details
                    </router-link>

                </li>
                <li>
                    <router-link class="router-link" to=/app/distribution>
                        Distribution
                    </router-link>

                </li>
                <li>
                    <router-link class="router-link" to=/app/closure>
                        Closure
                    </router-link>
                </li>
            </ul>
            <div class="container-user" v-if="isAuth">
                <div class="dropdown">
                    <button class="btn dropdown-toggle button-Name" type="button" id="dropdownMenuButton1"
                        data-bs-toggle="dropdown" aria-expanded="false">
                        {{ nameUser }}
                    </button>
                    <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                        <li>
                            <button type="button" class="button_logOut" @click="FunctionLogOut">
                                LogOut
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="bars-container">
                <label class="labelBars" for="inputBar">
                    <font-awesome-icon icon="fa-solid fa-bars" />
                    <input type="checkbox" v-model="BarChecked" name="inputBars" id="inputBar">
                </label>
            </div>
        </nav>
    </div>
</template>

<script>
import { computed, ref } from '@vue/runtime-core'
import Swal from 'sweetalert2'
import { useStore } from 'vuex'
import './nav.scss'
import { useRouter } from 'vue-router'

export default {
    name: 'Nav',
    components: {
    },
    setup() {
        const store = useStore()
        const router = useRouter()
        const BarChecked = ref(false)

        const FunctionLogOut = () => {
            Swal.fire({
                title: 'Do you want Logout?',
                showCancelButton: true,
                confirmButtonText: 'LogOut',
            }).then((result) => {
                if (result.isConfirmed) {
                    store.dispatch('logOut')
                    Swal.fire('You LogOut', '', 'success')
                    router.push('/login')
                }
            })
        }
        return {
            FunctionLogOut,
            isAuth: computed(() => store.state.isAuth),
            nameUser: computed(() => store?.state?.user?.displayName),
            BarChecked
        }
    },
    mounted() {
    },
}
</script>
