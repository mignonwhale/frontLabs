import { useState } from 'react'
import './Todo.css';
import NewTodo from './NewTodo'
import Todos from './Todos'
import { getStore } from './store.js'

export default function TodoApp() { // 메인 컴포넌트

  const [todos, setTodos] = useState(getStore() || []);


  /**
   * newTodo를 생성한 후 todos는 어떻게 갱신을 해야하지? 
   */
  return (
    <div className="todo-wrapper">
      <div className="todo-title">todos</div>
      <div className="todo-box">
        <div className="todo-input-box">
          <NewTodo />
        </div>
        <Todos todos={todos} />
      </div>
    </div>
  );
}


