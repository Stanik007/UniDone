<template>
  <div class="app">
    <header>
      <h1>UniDone</h1>
      <p>Student Deadline Manager</p>
      <span class="status">{{ appStatus }}</span>
    </header>

    <main>
      <h2>Додати завдання</h2>
      <input
        v-model="newTask"
        placeholder="Назва завдання"
      >
      <button @click="addTask">
        Додати
      </button>

      <ul>
        <li
          v-for="task in tasks"
          :key="task.id"
        >
          {{ task.text }}
          <button @click="removeTask(task.id)">
            Видалити
          </button>
        </li>
      </ul>
    </main>
  </div>
</template>

<script setup>
import { ref } from "vue";

const appStatus = import.meta.env.VITE_APP_STATUS;

const tasks = ref(JSON.parse(localStorage.getItem("tasks") || "[]"));
const newTask = ref("");

function addTask() {
  if (!newTask.value.trim()) return;
  tasks.value.push({ id: Date.now(), text: newTask.value });
  newTask.value = "";
  localStorage.setItem("tasks", JSON.stringify(tasks.value));
}

function removeTask(id) {
  tasks.value = tasks.value.filter((t) => t.id !== id);
  localStorage.setItem("tasks", JSON.stringify(tasks.value));
}
</script>
