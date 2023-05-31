<script setup>
// 스크립트 내부에서 props를 사용하려면 defineProps()를 사용해 명시하여 할당 받으면 된다.
// 템플릿에서 바로 props명을 사용할 수 있다. 여기선  todo를 의미한다.
const props = defineProps(["todo"]);

// 스크립트 내부에서 발신할 이벤트를 사용하려면 defineEmits()를 사용해 명시하여 할당 받으면 된다.
// template 안에선 $emit을 사용하면 바로 이벤트는 보낼 수 있다.
const emit = defineEmits(["custom:update", "custom:delete-todo"]);

function handleContentKeydown(event) {
  props.todo.content = event.target.value;
  if (event.key === "Enter") emit("custom:update");
}

function handleCheckedClick() {
  props.todo.checked = !props.todo.checked;
  emit("custom:update");
}

function handleDeleteClick() {
  emit("custom:delete-todo", props.todo.seq);
}
</script>

<template>
  <li class="todo-item" :class="todo.checked ? 'checked' : ''">
    <div class="checkbox" @click="handleCheckedClick">
      {{ todo.checked ? "✔" : "" }}
    </div>
    <div class="content">
      <input
        :value="todo.content"
        @keydown="handleContentKeydown"
        class="todo"
      />
    </div>
    <button @click="handleDeleteClick" class="delBtn">x</button>
  </li>
</template>

<style scoped>
</style>
