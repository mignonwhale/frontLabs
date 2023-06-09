import { useState } from 'react';
import TodoItem from './TodoItem';
import { setStore } from './store';


export default function Todos({ todosFromParent, handleTodosState }) {
  const [todos, setTodos] = useState(todosFromParent);

  const todoList = todos?.map?.((item, index) => {
    function handleMutateItem(obj) {
      // const clone = [...todos];
      const clone = JSON.parse(JSON.stringify(todos));
      clone[index] = obj;
      setTodos(clone);
    }
    return (
      <TodoItem item={item} customUpdate={handleMutateItem} customDelete={deleteItem} key={item.seq} /> // map() 호출 안쪽에 꼭 key 추가해야함.
    )
  });

  /**
   * props로 넘어온 todos는 이미 배열의 요소 하나하나가 반응형 상태임. 내부에서 별도로 반응형 상태로 만들 필요가 없음.
   */
  // function update() {
  //   handleTodosState();
  //   setStore(todosFromParent);

  // }
  function deleteItem(targetSeq) {
    handleTodosState();
    setStore(todosFromParent.filter(e => e.seq !== targetSeq));
  }

  /**
   * 반복문은 array.map()을 이용해 item을 하나씩 꺼내 세팅하는 방법을 사용한다. 
   * 
   * react-jsx-dev-runtime.development.js:87 Warning: Each child in a list should have a unique "key" prop.
   * 반복문을 사용할땐 key가 필요 
   * 나의 문제는 <li key={seq}></li> 부분을  별도 컴포넌트로 만들고 key를 유니크한 값으로 전달했지만 계속 위 오류가 나왔음 
   * <li>태그에 key를 넣어야 하는 것이 아닌 map() 내부의 어떠한 JSX 요소라도 거기에 key가 있어야 함. 
   * (JSX elements directly inside a map() call always need keys!)
   * 위 소스와 같이 map() 안에 key가 꼭 있어야 함 
   */

  return (
    <ul className="todo-list">
      {todoList}
    </ul>
  );
}


