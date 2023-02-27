<template>
  <div class="create__task">
    <input type="text" class="task__field" placeholder="Введите задачу..." v-model.trim="taskContent" @keydown.enter="createTask">
    <button class="btn-primary" @click="createTask">Создать</button>
  </div>
</template>

<script>
import {ref} from "vue";
export default {
  setup(_, {emit}) {
    const taskContent = ref('')

    function createTask() {
      const task = {
        content: taskContent.value,
        status: 'active'
      }
      emit('create-task', task)
      taskContent.value = ''
    }

    return {taskContent, createTask}
  }
}
</script>

<style scoped>

</style>