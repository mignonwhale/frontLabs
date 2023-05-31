<script setup>
import { ref } from 'vue'
import TodoItem from './components/TodoItem.vue';

// 조회
const todos = ref(getStore() || [])


// 등록
const content = ref(null)

function registTodo(event) {
    if (event.key === 'Enter' && content.value != null) {
        const todo = { checked: false, content: content.value, seq: getSeq() }
        todos.value = [...todos.value, todo]
        setStore(todos.value);
        clear()
    }
}

function getSeq() {
    let d = new Date();
    return `${d.getFullYear()}${d.getMonth() + 1}${d.getDay()}${d.getHours()}${d.getMinutes()}${d.getSeconds()}${d.getMilliseconds()}`
}

function clear() {
    content.value = ''
}

// 체크 수정
function updateCheck(todo) {
    todo.checked = !checkedTodo.checked
    setStore(todos.value)
}
// 내용수정
function updateContent(event, todo) {
    if (event.key === 'Enter') {
        todo.content = event.target.value
        setStore(todos.value)
    }
}
// 삭제
function deleteTodo(seq) {
    todos.value = todos.value.filter(e => e.seq !== seq)
    setStore(todos.value)
}


// 로컬 스토리지
function getStore() {
    const jsonStr = localStorage.getItem('todos');
    const todoList = JSON.parse(jsonStr)
    return todoList;
}

function setStore(todos) {
    const jsonStr = JSON.stringify(todos)
    localStorage.setItem('todos', jsonStr)
}
</script>

<template>
    <div class="todo-wrapper">
        <div class="todo-title">todo app</div>
        <div class="todo-box">
            <div class="todo-input-box">
                <input type="text" class="todo-input" v-model="content" @keydown="registTodo" placeholder="할 일을 입력 후 엔터">
            </div>
            <ul class="todo-list">
                <li v-for="todo in todos" :key="todo.seq" class="todo-item">
                    <input :value="todo.seq" type="hidden">
                    <div class="checkbox" @click="updateCheck(todo)">{{ todo.checked ? "✔" : "" }}</div>
                    <div>
                        <input :value="todo.content" @keydown="updateContent($event, todo)" class="todo">
                    </div>
                    <button @click="deleteTodo(todo.seq)" class="delBtn">x</button>
                </li>
            </ul>
        </div>
    </div>
</template>

<style scoped>

</style>
