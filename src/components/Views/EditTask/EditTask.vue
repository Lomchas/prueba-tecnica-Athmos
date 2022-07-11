<template>
    <div class="container-editTask">
        <form @submit.prevent="handleSubmitEditTask">
            <input type="text" name="inputTitle" v-model="title" placeholder="Title">
            <textarea name="description" cols="30" v-model="description" rows="4"></textarea>

            <p>Enter at most 5 labels!</p>
            <input type="text" :class="[tags.length === 5 ? 'hidden' : '']" name="inputTask" v-model="tag"
                placeholder="Tags">
            <button class="btn-addTag" @click="addTag" type="button">
                <font-awesome-icon icon="fa-solid fa-plus" />
            </button>
            <div class="container-tags">
                <ul>
                    <li v-for="(Tag, index) in tags" :key="index">{{ Tag }}</li>
                </ul>
            </div>
            <label class="labelInputDone" for="inputCheckDone">
                the task is done?
                <input type="checkbox" v-model="done" name="inputDone" id="inputCheckDone">
            </label>
            <button class="btn-submitAddTask" type="submit">Edit Task</button>
        </form>

    </div>
</template>
<script>
import './editTask.scss'
import { useStore } from 'vuex'
import { computed, ref } from 'vue'


export default {
    name: 'EditTask',
    components: {

    },
    setup() {
        const store = useStore()
        const title = ref('')
        const description = ref('')
        const tags = ref([])
        const tag = ref('')
        const done = ref('')
        const idLocalS = localStorage.getItem('idEditedTask')

        const addTag = () => {
            tags.value.push(tag.value)
            tag.value = ''
        }


        const handleSubmitEditTask = () => {
            const object = {
                title: title.value,
                description: description.value,
                tags: tags.value,
                done: done.value
            }

            console.log(idLocalS)

            try {
                store.dispatch('UpdateTaskEdited', object, idLocalS)
            } catch (err) {

            }

        }

        return {
            title,
            description,
            tags,
            tag,
            addTag,
            handleSubmitEditTask,
            done,
            store,
            idLocalS
        }
    },
    mounted() {
        const store = useStore()

        store.dispatch('actionGetTaskEdited', this.idLocalS)
    }
}
</script>