<template>
    <div class="container-login">
        <illlustration1 />
        <div class="container-form">
            <h3 class="title_form">Log In</h3>
            <form @submit.prevent="handleSubmit">
                <input type="email" v-model="email" class="item_input input_email" name="email" id="input-email"
                    placeholder="Email">
                <input type="password" autocomplete="none" v-model="password" class="item_input input_password"
                    name="password" id="input-password" placeholder="Password">
                <button type="submit">Login</button>
                <div v-if="error">{{ error }}</div>
            </form>
            <div class="container-auth-buttons">
                <button class="button_auth google" @click="handleGoogle" type="button">
                    <font-awesome-icon icon="fa-brands fa-google" />
                </button>
            </div>
            <hr>
            <span>Don't you have an account? - <router-link class="link-router" to="/signUp">Sign Up!</router-link>
            </span>
        </div>
    </div>
</template>


<script>
import './login.scss'
import { ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router';
import Swal from 'sweetalert2';
import Illlustration1 from '../../Illustrations/illlustration1.vue';


export default {
    name: 'Login',
    components: {
        Illlustration1
    },
    setup() {
        const email = ref('');
        const password = ref('')
        const store = useStore()
        const router = useRouter()
        const error = ref(null)


        const handleSubmit = async () => {
            if (email.value.length === 0 || password.value.length === 0) {
                Swal.fire('You must fill in all the fields')
            }
            else {
                try {
                    await store.dispatch('logIn', {
                        email: email.value,
                        password: password.value
                    })
                    email.value = ''
                    password.value = ''


                }
                catch (err) {
                    console.log(err.message)

                }
            }
        }

        const handleGoogle = async () => {
            try{
                await store.dispatch('actionGoogle')
            }catch(err) {
                console.log(err.message)
            }
        }

        return {
            handleGoogle,
            handleSubmit,
            email,
            password,
            error
        }
    }
}
</script>
