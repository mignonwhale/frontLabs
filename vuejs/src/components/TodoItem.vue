<script setup>
import { ref, watch } from 'vue'
defineProps(['todo'])

// const props = defineProps(['todo'])
// const todo = props.todo;
// const checked = todo.checked;
// const content = todo.content;
// const seq = todo.seq;

// 함수 내부에서 발신할 이벤트를 사용하려면 defineEmits()를 사용해 명시하여 할당 받으면 된다. 
// template 안에선s $emit을 사용하면 바로 이벤트는 보낼 수 있다. 
// const emit = defineEmits(['updateCheck', 'updateContent', 'deleteTodo'])

// const childContent = ref(todo.content)
// console.log(childContent.value);

// watch(childContent, (newOne) => {
//   console.log('여기', newOne)
// })

// const changedContent = ref(todo.content)

</script>

<template>
    <li class="todo-item" :class="todo.checked ? 'checked' : ''">
        <div class="checkbox" @click="$emit('updateCheck', todo)">{{ todo.checked ? "✔" : "" }}</div>
        <div class="content">
            <input v-model="todo.content" @keydown="$emit('updateContent', $event)" class="todo">
        </div>
        <button @click="$emit('deleteTodo', todo.seq)" class="delBtn">x</button>
    </li>
</template>

<style scoped>

</style>
