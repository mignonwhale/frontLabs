<script setup>
import { ref } from "vue";
import { Todo } from "./components/todo.js";
import TodoItem from "./components/TodoItem.vue";

// 조회
const todos = ref(getStore() || []);

// 등록
const content = ref(null);

function registTodo(event) {
  if (event.key === "Enter" && content.value != null) {
    const todo = new Todo({ content: content.value });
    todos.value = [...todos.value, todo];
    setStore(todos.value);
    clear();
  }
}

function getSeq() {
  let d = new Date();
  return `${d.getFullYear()}${
    d.getMonth() + 1
  }${d.getDay()}${d.getHours()}${d.getMinutes()}${d.getSeconds()}${d.getMilliseconds()}`;
}

function clear() {
  content.value = "";
}
// 수정
function update({newChecked, newContent, seq}) {
  const newTodos = todos.value.map(ele => 
    ele.seq === seq ? 
    {...ele, checked: newChecked ?? ele.checked, content: newContent ?? ele.content} : 
    ele
  )
  todos.value = newTodos;
  setStore(todos.value);
}

// 삭제
function deleteTodo(seq) {
  todos.value = todos.value.filter((ele) => ele.seq !== seq);
  setStore(todos.value);
}

// 로컬 스토리지
function getStore() {
  const jsonStr = localStorage.getItem("todos");
  const todoList = JSON.parse(jsonStr);
  return todoList;
}

function setStore(todos) {
  const jsonStr = JSON.stringify(todos);
  localStorage.setItem("todos", jsonStr);
}
</script>

<template>
  <div class="todo-wrapper">
    <div class="todo-title">todo app</div>
    <div class="todo-box">
      <div class="todo-input-box">
        <input
          type="text"
          class="todo-input"
          v-model="content"
          @keydown="registTodo"
          placeholder="할 일을 입력 후 엔터"
        />
      </div>
      <ul class="todo-list">
        <template v-for="todo in todos" :key="todo.seq">
          <TodoItem
            :checked="todo.checked"
            :content="todo.content"
            :seq="todo.seq"
            @custom:update="update"
            @custom:delete-todo="deleteTodo"
          />
        </template>
      </ul>
    </div>
  </div>
</template>

<style scoped>
</style>
