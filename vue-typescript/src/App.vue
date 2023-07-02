<script setup lang="ts">
import { ref } from 'vue';

const VUE_TS_TODOS = 'vueTsTodos';
const todos = ref(JSON.parse(localStorage.getItem(VUE_TS_TODOS) || '[]'));

const props = defineProps({
  id: String,
  content: String,
  checked: Boolean
});


</script>

<template>
  <div class="todo-wrapper">
    <div class="todo-title">todo app</div>
    <div class="todo-box">
      <div class="todo-input-box">
        <input type="text" class="todo-input" placeholder="할 일을 입력 후 엔터" />
      </div>
      <ul class="todo-list">
        <li v-for="todo in todos " :key="todo.id" class="todo-item" :class="todo.checked ? 'checked' : ''">
          <div class="checkbox">{{ todo.checked ? '✔' : '' }}</div>
          <div class="content">
            <input type="text" class="todo" v-model="todo.content" />
          </div>
          <button class="delBtn">x</button>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped></style>
