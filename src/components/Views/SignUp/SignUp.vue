<template>
    <div class="container-signIn">
        <illlustration1 />
        <div class="container-form">
            <h3 class="title_form">Sign Up</h3>
            <form @submit.prevent="handleSubmit">
                <input v-model="name" type="text" class="item_input input-name" name="name" id="input-name"
                    placeholder="Name">
                <input v-model="email" type="email" class="item_input input_email" name="email" id="input-email"
                    placeholder="Email">
                <input v-model="pass1" type="Password" autocomplete="none" class="item_input input_password"
                    name="password1" id="input-password1" placeholder="Password">
                <input v-model="pass2" type="Password" autocomplete="none" class="item_input input_password"
                    name="password2" id="input-password2" placeholder="password again">
                <button type="submit">Sign-Up Now!</button>
                <div v-if="error">{{ error }}</div>
            </form>
            <hr>
            <span>Do you already have an account? - <router-link class="link-router" to="/">Log-In</router-link></span>
        </div>
    </div>
</template>


<script>
import './signUp.scss'
import { ref } from 'vue';
import { useStore } from 'vuex';
import Swal from 'sweetalert2';
import Illlustration1 from '../../Illustrations/illlustration1.vue';

export default {
    name: 'SignUp',
    components: {
        Illlustration1
    },
    setup() {
        const name = ref('');
        const email = ref('');
        const pass1 = ref('');
        const pass2 = ref('');
        const store = useStore()
        const error = ref(null)


        const handleSubmit = async () => {
            if (name.value.length === 0 || email.value.length === 0 || pass1.value.length === 0 || pass2.value.length === 0) {
                Swal.fire('You must fill in all the fields')
            }
            else if (pass1.value.length < 6 || pass2.value.length < 6) {
                Swal.fire({
                    text: 'the password must have at least 6 characters',
                    icon: 'error'
                })
                if (pass1.value !== pass2.value) {
                    Swal.fire({
                        text: "Passwords don't match",
                        icon: 'error'
                    })
                }
            }
            else {
                try {
                    await store.dispatch('signUp', {
                        name: name.value,
                        email: email.value,
                        password: pass1.value
                    })
                    name.value = ''
                    email.value = ''
                    pass1.value = ''
                    pass2.value = ''

                }
                catch (err) {
                    console.log(err.message)
                }
            }
        }
        return { handleSubmit, name, email, pass1, pass2, error }
    }
}
</script>