<template>
  <button class="task__category__chips" @click.stop="$emit('switch-category', 'all')">
    <span class="task__category__counter">{{allTasks}}</span>
    Все
  </button>

  <button class="task__category__chips" @click.stop="$emit('switch-category', 'active')">
    <span class="task__category__counter">{{activeTasks}}</span>
    Активные
  </button>

  <button class="task__category__chips" @click.stop="$emit('switch-category', 'done')">
    <span class="task__category__counter">{{doneTasks}}</span>
    Завершенные
  </button>
</template>

<script>
import {computed} from "vue";

export default {
  emits: ['switch-category'],
  props: ['tasks'],
  setup(props) {
    const allTasks = computed(() => props.tasks?.length)
    const activeTasks = computed(() => props.tasks?.filter(task => task.status === 'active').length)
    const doneTasks = computed(() => props.tasks?.filter(task => task.status === 'done').length)

    return {allTasks, activeTasks, doneTasks}
  },
  name: "TaskCategoriesChips"
}
</script>

<style scoped>

</style>