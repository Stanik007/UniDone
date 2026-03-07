<template>
  <div class="app">
    <header>
      <h1>UniDone</h1>
      <p>Student Deadline Manager</p>
      <span class="status">{{ appStatus }}</span>
    </header>

    <main>
      <h2>Додати завдання</h2>
      <input v-model="newTask" placeholder="Назва завдання" />
      <button @click="addTask">Додати</button>

      <div v-if="showUrgentFilter" style="margin-top: 12px">
        <button @click="filterMode = 'all'">Всі</button>
        <button @click="filterMode = 'urgent'">Тільки термінові</button>
      </div>

      <ul>
        <li v-for="task in filteredTasks" :key="task.id">
          {{ task.text }}
          <button @click="removeTask(task.id)">Видалити</button>
        </li>
      </ul>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import posthog from 'posthog-js';

const appStatus = import.meta.env.VITE_APP_STATUS;
const tasks = ref(JSON.parse(localStorage.getItem('tasks') || '[]'));
const newTask = ref('');
const showUrgentFilter = ref(false);
const filterMode = ref('all');

onMounted(() => {
  posthog.onFeatureFlags(() => {
    showUrgentFilter.value = posthog.isFeatureEnabled('show-urgent-filter');
  });
});

const filteredTasks = computed(() => {
  if (filterMode.value === 'urgent') {
    return tasks.value.filter((t) =>
      t.text.toLowerCase().includes('терміново')
    );
  }
  return tasks.value;
});

function addTask() {
  if (!newTask.value.trim()) return;
  tasks.value.push({ id: Date.now(), text: newTask.value });
  newTask.value = '';
  localStorage.setItem('tasks', JSON.stringify(tasks.value));

  posthog.capture('task_created', {
    total_tasks: tasks.value.length,
  });
}

function removeTask(id) {
  tasks.value = tasks.value.filter((t) => t.id !== id);
  localStorage.setItem('tasks', JSON.stringify(tasks.value));

  posthog.capture('task_deleted', {
    reason: 'manual',
    total_tasks: tasks.value.length,
  });
}
</script>
