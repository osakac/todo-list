<template>
  <div class="task-list">
    <div class="task-item" v-for="task in tasks">
      <p>{{task.content}}</p>
      <div class="task-item__tools">
        <task-status :status="task.status" :id="task.id" @update-status="updateStatus"/>
        <button class="btn-danger" @click="removeTask(task.id)">Удалить</button>
      </div>
    </div>
  </div>
</template>

<script>
import {useStore} from "vuex";
import TaskStatus from "@/components/UI/TaskStatus";
import {computed} from "vue";
export default {
  props: ['tasks'],
  setup(props) {
    const store = useStore()
    
    async function updateStatus(updatedStatus) {
      const oldTask = props.tasks.find(task => task.id === updatedStatus.id)
      const newTask = {...oldTask, status: updatedStatus.newStatus}
      await store.dispatch('updateTaskStatus', newTask)
    }
    
    async function removeTask(id) {
      await store.dispatch('removeTask', id)
    }
    
    return {removeTask, updateStatus}
  },
  components: {TaskStatus},
  name: "TaskList"
}
</script>

<style scoped>

</style>