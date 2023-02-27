<template>
  <h1>Список задач</h1>

  <create-task  @create-task="createTask"/>

  <task-categories-chips :tasks="tasks" @switch-category="switchCategory"/>
  <hr>

  <v-progress-circular v-if="loading" color="primary" indeterminate :size="60" :width="8" class="loader"></v-progress-circular>
  <h1 v-else-if="tasks?.length === 0 && !loading" class="no-tasks-title">Задач нет</h1>
  <task-list v-else :tasks="selectedTasks"/>

</template>

<script>
import TaskCategoriesChips from "@/components/TaskCategoriesChips";
import TaskList from "@/components/TaskList";
import CreateTask from "@/components/CreateTask";
import {useStore} from "vuex";
import {computed, onMounted, ref} from "vue";
export default {
  setup() {
    const store = useStore()

    const tasks = computed(() => store.getters.getTasks)
    const selectedCategory = ref('all')
    const loading = ref(true)

    const selectedTasks = computed(() => {
      if (selectedCategory.value === 'all') return store.getters.getTasks?.reverse()
      else if (selectedCategory.value === 'active') return store.getters.getTasks?.reverse().filter(task => task.status === 'active')
      else if (selectedCategory.value === 'done') return store.getters.getTasks?.reverse().filter(task => task.status === 'done')
    })

    function switchCategory(category) {
      selectedCategory.value = category
    }

    async function createTask(task) {
      await store.dispatch('createTask', task)
    }

    onMounted(async () => {
      await store.dispatch('loadTasks')
      loading.value = false
    })

    return {createTask, tasks, switchCategory, selectedTasks, loading}
  },
  name: "HomePage",
  components: {CreateTask, TaskList, TaskCategoriesChips}
}
</script>

<style scoped>

</style>