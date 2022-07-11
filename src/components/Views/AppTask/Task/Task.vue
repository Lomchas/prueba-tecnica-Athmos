<template>
    <div class="container-card-task">
        <div class="accordion">
            <h2 class="accordion-header" id="flush-headingOne">
                <div class="accordion-button collapsed" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne"
                    aria-expanded="false" aria-controls="flush-collapseOne">
                    <button type="button" :class="[taskProp.done ? 'complete' : '', 'checkBox-task']">
                        <font-awesome-icon icon="fa-solid fa-check" />
                    </button>
                    <h2 class="title-card-task">
                        {{ taskProp.title }}
                    </h2>
                </div>
            </h2>
            <div id="flush-collapseOne" class="accordion-collapse collapse" aria-labelledby="flush-headingOne"
                data-bs-parent="#accordionFlushExample">
                <div class="accordion-body">
                    <div class="info-task">
                        <p class="description-task">
                            {{ taskProp.description }}
                        </p>
                        <div class="container-tags">
                            <ul>
                                <li v-for="(tag, index) in taskProp.tags" :key="index">{{ tag }}</li>
                            </ul>
                        </div>
                    </div>
                    <hr>
                    <div class="container-actions-task">
                        <button type="button" v-on:click="SendIDLocalS(taskProp.id)" class="buttonEdit btn-act">
                            <font-awesome-icon icon="fa-solid fa-pencil" />
                            edit
                        </button>
                        <button type="button" class="buttonDelete btn-act">
                            <font-awesome-icon icon="fa-solid fa-trash" />
                            delete
                        </button>
                        <button type="button"
                            :class="[taskProp.done ? 'buttonComplete btn-act done' : '', 'buttonComplete btn-act']">
                            <font-awesome-icon icon="fa-solid fa-thumbs-up" />
                            complete
                        </button>
                    </div>
                    <hr>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { computed, ref } from '@vue/runtime-core'
import { useRouter } from 'vue-router'
export default {
    name: 'Task',
    components: {

    },
    props: {
        taskProp: Object
    },
    setup() {

        const router = useRouter()
        const SendIDLocalS = (id) => {
            localStorage.setItem('idEditedTask', id)      
            router.push(`/editTask/${id}`)
        }

        return {
            SendIDLocalS,
        }
    }
}
</script>