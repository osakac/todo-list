export default {
  state: {
    tasks: [],
  },
  getters: {
    getTasks(state) {
      return state.tasks;
    },
  },
  mutations: {
    setTasks(state, tasks) {
      state.tasks = tasks;
    },
    addTask(state, task) {
      state.tasks.push(task);
    },
    removeTask(state, id) {
      const NEEDED_TASK = state.tasks.findIndex((task) => task.id === id);
      state.tasks.splice(NEEDED_TASK, 1);
    },
  },
  actions: {
    async createTask({ commit, dispatch }, task) {
      await fetch(`${url}/tasks.json`, {
        ...options.post,
        body: JSON.stringify(task),
      });
      await dispatch("loadTasks");
    },
    async loadTasks({ commit }) {
      try {
        const response = await fetch(`${url}/tasks.json`);
        const data = await response.json();
        const tasks = Object.keys(data).map((key) => ({ ...data[key], id: key }));
        commit("setTasks", tasks);
      } catch (e) {}
    },
    async updateTaskStatus({ dispatch }, task) {
      await fetch(`${url}/tasks/${task.id}.json`, {
        ...options.put,
        body: JSON.stringify(task),
      });
      await dispatch("loadTasks");
    },
    async removeTask({ commit, dispatch }, id) {
      await fetch(`${url}/tasks/${id}.json`, { ...options.delete });
      commit("removeTask", id);
      // await dispatch('loadTasks') Как вариант
    },
  },
};

const url = "https://osakac-backend-default-rtdb.firebaseio.com";
const options = {
  post: {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  },
  put: {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
  },
  delete: {
    method: "DELETE",
  },
};
