import TodoItem from './TodoItem'

export default function Todos({ todos }) {


  const todoList = todos.map(item => <TodoItem checked={item.checked} content={item.content} seq={item.seq} />
    // <li className={item.checked ? 'todo-item checked' : 'todo-item'} key={item.seq}>
    //   <div className="checkbox">{item.checked && '✔'}</div>
    //   <div className="content">
    //     <input className="todo" value={item.content} />
    //   </div>
    //   <button className="delBtn">x</button>
    // </li>

  );

  /**
   * 반복문은 array.map()을 이용해 item을 하나씩 꺼내 세팅하는 방법을 사용한다. 
   * 
   * react-jsx-dev-runtime.development.js:87 Warning: Each child in a list should have a unique "key" prop.
   * 반복문을 사용할땐 key가 필요 
   * 나의 문제는 <li></li>를 별도 컴포넌트로 만들고 key를 유니크한 값으로 전달했지만 계속 위 오류가 나왔음 
   * 그래서 Todos 컴포넌트에서 다 처리하는 것으로 변경했더니 위 문제는 사라짐...
   */

  return (
    <ul className="todo-list">
      {todoList}
    </ul>
  );
}


