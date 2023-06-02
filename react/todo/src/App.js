import './App.css';
import './Todo.css';

export default function App() {
  return (
    <div class="todo-wrapper">
      <div class="todo-title">todo app</div>
      <div class="todo-box">
        <div class="todo-input-box">
          <input class="todo-input" placeholder="할 일을 입력 후 엔터" />
        </div>
        <ul class="todo-list">
          <li class="todo-item">
            <div class="checkbox"></div>
            <div class="content">
              <input class="todo" />
            </div>
            <button class="delBtn">x</button>
          </li >
        </ul >
      </div >
    </div >
  );
}

