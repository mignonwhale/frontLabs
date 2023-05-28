// 조회
interface Item {
  seq: string;
  checked: boolean;
  content: string;
}

class Todo implements Item {
  public seq: string;
  constructor(public checked: boolean, public content: string, seq?: string) {
    if (!seq) {
      this.seq = this.getSeq();
    } else {
      this.seq = seq;
    }
  }
  private getSeq(): string {
    return `${new Date().getFullYear()}${new Date().getMonth()}${new Date().getDate()}${new Date().getHours()}${new Date().getMinutes()}${new Date().getSeconds()}${new Date().getMilliseconds()}`;
  }
}

// TODO 캡슐라이제이션
class TodoList {
  private _todos: Todo[]; // private 변수는 관례로 '_'언더바를 붙인다.
  constructor(public todoList: Todo[]) {
    this._todos = todoList;
  }

  // 조회
  get todos() {
    // todos라는 프로퍼티를 getter로 만들어 사용 할 수 있다.
    // private _todos 프로퍼티는 외부에서 직접 접근이 안되므로 우회 접근 방법으로 getter를 만들어 준다.
    return [...this._todos];
  }

  // 등록
  addTodo(content: string) {
    const newTodo = new Todo(false, content);
    this._todos.push(newTodo);
  }

  // 길이
  getLength() {
    // getter, setter 대신 메소드로도 사용 가능
    return this._todos.length;
  }
}

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
  for (let i = 0; i < todoList.getLength(); i++) {
    let todo = todoList.todos[i];
    drawLi(todo, i);
  }
};
// 입력란 초기화
const clear = () => {
  let input: HTMLInputElement | null = document.querySelector("#todo-input");
  if (input !== null) {
    input.value = "";
  }
};

// 저장이벤트
const save = (event: KeyboardEvent, value: string) => {
  if (event.key === "Enter") {
    const todoList = getTodoListAdapter();
    todoList.addTodo(value);
    setStore(todoList.todos);

    drawLi(new Todo(false, value), todoList.getLength());
    clear();
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

// 화면 초기화
let todoList: TodoList;
const todosArr = getStore();

if (todosArr !== null) {
  todoList = new TodoList(todosArr);
  drawInit(todoList);
} else {
  todoList = new TodoList([]);
}

function setStoreAdapter() {
  setStore(todoList.todos);
}
function getTodoListAdapter() {
  return todoList;
}
