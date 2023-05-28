import { Todo } from "./Todo.js";
import { TodoList } from "./TodoList.js";

const getStore = () => {
  const jsonTodos = localStorage.getItem("Todos");
  if (jsonTodos !== null) {
    return JSON.parse(jsonTodos);
  } else {
    return null;
  }
};
const setStore = (todos: Todo[]) => {
  const jsonTodos = JSON.stringify(todos);
  localStorage.setItem("Todos", jsonTodos);
};

const drawLi = (todo: Todo, i: number) => {
  let div1 = document.createElement("div");
  div1.classList.add("checkbox");
  div1.id = `checked-${i}`;
  div1.textContent = todo.checked ? "✔" : "";

  div1.onclick = () => {
    check(todo, i);
  };

  let div2 = document.createElement("div");
  div2.classList.add("todo");
  div2.id = `content-${i}`;
  div2.textContent = todo.content;

  let inputHidden = document.createElement("input");
  inputHidden.type = "hidden";
  inputHidden.id = `seq`;
  inputHidden.value = todo.seq;

  let button = document.createElement("button");
  button.classList.add("delBtn");
  button.id = `deleted-${i}`;
  button.textContent = "x";
  button.onclick = () => {
    delTodo(todo, i);
  };

  let li = document.createElement("li");
  li.classList.add("todo-item");
  todo.checked ? li.classList.add("checked") : li.classList.remove("checked");
  li.id = `todo-item-${i}`;

  li.append(div1);
  li.append(div2);
  li.append(inputHidden);
  li.append(button);

  const ul = document.querySelector("ul");
  ul?.appendChild(li);
};

const drawInit = (todoList: TodoList) => {
  // 초기화
  const ul = document.querySelector(`ul`);
  if (ul !== null) {
    ul.innerHTML = "";
  }
  // 그리기
  for (let i = 0; i < todoList.getLength(); i++) {
    let todo = todoList.todos[i];
    drawLi(todo, i);
  }
};
// 입력란 초기화
const clearInput = () => {
  let input: HTMLInputElement | null = document.querySelector("#todo-input");
  if (input !== null) {
    input.value = "";
  }
};

// 저장이벤트
const save = (event: KeyboardEvent) => {
  const temp = <HTMLInputElement>event.target;

  if (event.key === "Enter") {
    const todoList = getTodoListAdapter();
    todoList.addTodo(temp.value);
    setStore(todoList.todos);
    drawInit(todoList);
    clearInput();
  }
};

// 체크박스이벤트
const check = (todo: Todo, i: number) => {
  // 변경사항 적용
  todo.checked = !todo.checked;

  // 체크 스타일 적용
  const checkedLi = document.querySelector(`#todo-item-${i}`);
  if (checkedLi?.classList.contains("checked")) {
    checkedLi?.classList.remove("checked");
  } else {
    checkedLi?.classList.add("checked");
  }
  const checkedDiv = document.querySelector(`#checked-${i}`);
  if (checkedDiv !== null) {
    checkedDiv.textContent = todo.checked ? "✔" : "";
  }

  setStoreAdapter();
};

// 삭제이벤트
const delTodo = (todo: Todo, i: number) => {
  // let button = document.querySelector(`#deleted-${i}`);
  // button.textContent = "x";
  // 데이터 = ele 삭제
  const todoList = getTodoListAdapter();
  todoList.deleteTodo(todo.seq);
  setStoreAdapter();

  // 화면 반영
  drawInit(todoList);
};

// 전역변수를 덜 쓰기 위한 중간자 역할
function setStoreAdapter() {
  setStore(todoList.todos);
}
// 전역변수를 덜 쓰기 위한 중간자 역할
function getTodoListAdapter() {
  return todoList;
}

function attachEventHandler() {
  // onkeypress="save(event, this.value)"
  const input = document.querySelector("#todo-input");
  input?.addEventListener("keydown", (event) => {
    save(<KeyboardEvent>event);
  });
}
// 화면 초기화
let todoList: TodoList;
const todosArr = getStore();

if (todosArr !== null) {
  todoList = new TodoList(todosArr);
  drawInit(todoList);
} else {
  todoList = new TodoList([]);
}
attachEventHandler();
