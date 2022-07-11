<template>
    <div class="container-addTask">
        <Illlustration11 />

        <form @submit.prevent="handleSubmitAddTask">
            <input type="text" name="inputTitle" v-model="title" placeholder="Title">
            <textarea name="description" cols="30" v-model="description" rows="4"></textarea>

            <p>Enter at most 5 labels!</p>
            <input type="text" name="inputTask" v-model="tag" placeholder="Tags">
            <button class="btn-addTag" @click="addTag" type="button">
                <font-awesome-icon icon="fa-solid fa-plus" />
            </button>
            <div class="container-tags">
                <ul>
                    <li v-for="(Tag, index) in tags" :key="index">
                        {{ Tag }}
                    </li>
                </ul>
            </div>
            <button class="btn-submitAddTask" type="submit">Add Task</button>
        </form>
    </div>
</template>
<script>
import './addTask.scss'
import Illlustration11 from '../../Illustrations/illlustration1.vue'
import { ref } from '@vue/reactivity'
import { useStore } from 'vuex'

export default {
    name: 'AddTask',
    components: {
        Illlustration11
    },
    setup() {
        const title = ref('')
        const description = ref('')
        const tags = ref([])
        const tag = ref('')
        const store = useStore()

        const addTag = () => {
            tags.value.push(tag.value)
            tag.value = ''
        }

        const handleSubmitAddTask = () => {
            const object = {
                title: title.value,
                description: description.value,
                tags: tags.value,
                done: false
            }
            store.dispatch('actionSendNewTaskFirestore', object)
            title.value = ''
            description.value = ''
            tags.value = []
            tag.value = ''
            store.value = ''
        }

        return {
            title,
            description,
            tags,
            tag,
            addTag,
            handleSubmitAddTask,
        }
    }
}
</script>
