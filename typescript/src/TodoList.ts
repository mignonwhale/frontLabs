import { Todo } from "./Todo.js";

// TODO 캡슐라이제이션
export class TodoList {
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
  // 단건 조회
  getTodo(seq: string) {
    const temp = [...this._todos];
    for (let i = 0; i < temp.length; i++) {
      const ele = temp[i];
      if (ele.seq === seq) {
        return ele;
      }
    }
  }

  // 등록
  addTodo(content: string) {
    const newTodo = new Todo(false, content);
    this._todos.push(newTodo);
  }

  // 수정
  updateTodo(updatedTodo: Todo) {
    for (let i = 0; i < this._todos.length; i++) {
      const ele = this._todos[i];
      if (ele.seq === updatedTodo.seq) {
        ele.content = updatedTodo.content;
      }
    }
  }
  // 삭제
  deleteTodo(seq: string) {
    for (let i = 0; i < this._todos.length; i++) {
      const ele = this._todos[i];
      if (ele.seq === seq) {
        this._todos.splice(i, 1);
      }
    }
  }

  // 길이
  getLength() {
    // getter, setter 대신 메소드로도 사용 가능
    return this._todos.length;
  }
}
