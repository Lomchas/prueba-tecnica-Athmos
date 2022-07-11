<template>
    <div class="container-App-Task">
        <div class="container-head-task">
            <div class="accordion-item">
                <h2 class="accordion-header" id="headingOne">
                    <button class="accordion-button" type="button" data-bs-toggle="collapse"
                        data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                        <div class="text-head">
                            <h1>1</h1>
                            <div class="instructions">
                                <h2>Immediate Steps</h2>
                                <p>these your immediate steps to complete</p>
                            </div>
                            <div class="progress-task">
                                <span class="values-progress-task">{{ `${howManytaskDone.length}/${howManyTask} task
                                left` }}</span>
                                <div class="progress">
                                    <div class="progress-bar" role="progressbar" :style="{ width: amountDone + '%' }"
                                        aria-valuenow="{{howManytaskDone.length}}" aria-valuemin="0"
                                        aria-valuemax="{{howManyTask}}">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </button>
                </h2>
                <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne"
                    data-bs-parent="#accordionExample">
                    <div class="accordion-body">
                        <div class="container-actions-task">
                            <div class="dropdown">
                                <button class="btn dropdown-toggle" type="button" id="dropdownMenuButton1"
                                    data-bs-toggle="dropdown" aria-expanded="false">
                                    Show all Task
                                </button>
                                <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                    <li>
                                        <button type="button" class="btn">
                                            Show all Task
                                        </button>
                                    </li>
                                    <li>
                                        <button type="button" class="btn">
                                            Complete
                                        </button>
                                    </li>
                                    <li>
                                        <button type="button" class="btn">
                                            Incomplete
                                        </button>

                                    </li>
                                </ul>
                            </div>
                            <div class="searcher-task">
                                <form>
                                    <input type="text" class="input-searcher-task" placeholder="Search Task">
                                    <button type="submit" class="btn-search">
                                        <font-awesome-icon icon="fa-solid fa-magnifying-glass" />
                                    </button>
                                </form>
                            </div>
                            <router-link to="/addTask" class="btn btn-add-task">
                                <font-awesome-icon icon="fa-solid fa-plus" />
                                Add Task
                            </router-link>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="container-all-task">
            <Task v-for="(taskShare, index) in tasks" :key="index" :taskProp="taskShare" />
        </div>
    </div>

</template>
<script>
import { ref } from '@vue/reactivity'
import './app.scss'
import Task from './Task/Task.vue'
import { computed } from '@vue/runtime-core'
import { useStore } from 'vuex'


export default {
    name: 'AppTask',
    components: {
        Task,
    },
    setup() {
        const store = useStore()
        const tasks = computed(() => store.state.task)
        const howManyTask = computed(() => tasks.value.length)
        const howManytaskDone = computed(() => tasks.value.filter((task) => task.done === true))
        const amountDone = computed(() => ((howManytaskDone.value.length * 100) / howManyTask.value))

        return {
            store,
            tasks,
            howManyTask,
            howManytaskDone,
            amountDone
        }
    },
}
</script>
