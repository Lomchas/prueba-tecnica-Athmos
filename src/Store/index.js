import { createStore } from "vuex";
import { auth, db, google, taskRef } from "../Firebase/config";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { useRouter } from "vue-router";
import Swal from "sweetalert2";
import { addDoc, collection, doc, getDoc, getDocs, setDoc, updateDoc } from "firebase/firestore";

const store = createStore({
    state: {
        user: null,
        displayName: 'UserName',
        isAuth: false,
        task: [],
        taskItsGonnaBeEdited: []
    },
    mutations: {
        setUser(state, payload) {
            state.user = payload,
                console.log('user state changed', state.user)
        },
        VerifyAuth(state, payload) {
            state.isAuth = payload
        },
        setDisplayName(state, payload) {
            state.displayName = payload
        },
        getTask(state, payload) {
            state.task = payload
        },
        setTaskItsGonnaBeEdited(state, payload) {
            state.taskItsGonnaBeEdited = payload
        }
    },
    actions: {
        logIn(context, { email, password }) {
            console.log('LogIn actions')
            signInWithEmailAndPassword(auth, email, password)
                .then(async ({ user }) => {
                    context.commit('setUser', user)
                    context.commit('VerifyAuth', true)
                    console.log('solicitud completed')
                    Swal.fire(
                        'Login successfully',
                        `Welcome ${user.displayName}`,
                        'success'
                    )
                    location.reload()
                })
                .catch((err) => {
                    const object = err.message
                    const message = (messages) => {
                        if (messages == 'Firebase: Error (auth/user-not-found).') {
                            return "User not Found, If you haven't registered yet, click on 'Sign Up!'."
                        }
                        else {
                            return messages
                        }
                    }
                    Swal.fire({
                        icon: 'error',
                        title: 'Failed to Login',
                        text: message(object)
                    })
                })
        },

        signUp(context, { name, email, password }) {
            console.log('signUp actions')

            createUserWithEmailAndPassword(auth, email, password)
                .then(async ({ user }) => {
                    await updateProfile(auth.currentUser, { displayName: name })
                    context.commit('setUser', user)

                    Swal.fire({
                        text: 'Account Created successfully',
                        icon: 'success'
                    })
                    location.reload()
                })
                .catch((err) => {
                    const object = err.message
                    const message = (messages) => {
                        if (messages == 'Firebase: Error (auth/email-already-in-use).') {
                            return "Email already in use, if it's yours then click on 'Log-In'."
                        }
                        else {
                            return messages
                        }
                    }
                    Swal.fire({
                        icon: 'error',
                        title: 'Failed to Login',
                        text: message(object)
                    })
                })
        },

        async logOut(context) {
            console.log('logOut action')
            await signOut(auth)
            context.commit('VerifyAuth', false)
            location.reload()
        },

        actionGoogle(context) {
            signInWithPopup(auth, google)
                .then(({ user }) => {
                    context.commit('setUser', user)
                    Swal.fire(
                        'Login successfully',
                        `Welcome ${user.displayName}`,
                        'success'
                    )
                    location.reload()
                })
                .catch(err => {
                    Swal.fire({
                        icon: 'error',
                        title: 'Failed to Login',
                        text: err.message
                    })
                })
        },

        async actionGetFirestore(contex) {
            let documents = []
            const data = await getDocs(collection(db, 'Task-Users-Athmos'))
            data.forEach((doc) => {
                let docData = doc.data()
                docData.id = doc.id
                documents.push({
                    ...docData
                })

            })

            contex.commit('getTask', documents)
            console.log(documents)
        },

        actionSendNewTaskFirestore(context, task) {
            addDoc(collection(db, 'Task-Users-Athmos'), task)
                .then((res) => {
                    Swal.fire({
                        text: 'Task Created successfully',
                        icon: 'success'
                    })
                })
                .catch((err) => {
                    Swal.fire({
                        icon: 'error',
                        title: 'Failed to Login',
                        text: err.message
                    })
                })
        },

        async actionGetTaskEdited(context, id) {
            let taskEdit = doc(taskRef, id)
            let task = await getDoc(taskEdit)
            context.commit('setTaskItsGonnaBeEdited', task.data())
        },

        async UpdateTaskEdited(context, newTask, id) {
            let taskUpdate = doc(taskRef, id)
             await updateDoc(taskUpdate, newTask)
             .then(() => {
                Swal.fire({
                    icon: 'success',
                    text: 'The Task hs been update successfully'
                })
             })
             .catch((err) => {
                console.log(err)
             })
        }

    },
    getters: {

    }
})




export default store