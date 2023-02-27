<template>
  <span :class="status" @click.stop="changeStatus(id)">{{ text }}</span>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";
export default {
  emits: ['update-status'],
  props: ['status', 'id'],
  setup(props, { emit }) {
    const store = useStore()

    const classMap = {
      active: 'task-status-active',
      done: 'task-status-done'
    }

    const textMap = {
      active: 'Активно',
      done: 'Завершенно'
    }

    const switcher = computed(() => props.status === 'active' ? 'done' : 'active')

    function changeStatus(id) {
      const updatedStatus = {
        newStatus: switcher.value,
        id: id
      }
      emit('update-status', updatedStatus)
    }

    const status = computed(() => classMap[props.status])
    const text = computed(() => textMap[props.status])

    return { status, text, changeStatus }
  },
  name: "TaskStatus"
}
</script>

<style scoped></style>