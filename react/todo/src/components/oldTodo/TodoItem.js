import { useState } from 'react';

export default function TodoItem({ item, customUpdate, customDelete }) {
  const [todo, setTodo] = useState(item);
  return (
    <li className={todo?.checked ? 'todo-item checked' : 'todo-item'} >
      <Check todo={todo} setTodo={setTodo} customUpdate={customUpdate} />
      <Content todo={todo} setTodo={setTodo} customUpdate={customUpdate} />
      <Delete seq={todo?.seq} customDelete={customDelete} />
    </li>
  );
}

function Check({ todo, setTodo, customUpdate }) {

  function handleCheckedClick() {
    // const clone = { ...todo };
    // clone.checked = !clone.checked;
    // 부모 컴포넌트에 알리기
    const qqq = { ...todo, checked: !todo.checked };
    setTodo(qqq);
    customUpdate(qqq);

    /**
     *  <div className="checkbox" onClick={handleCheckedClick}>{todo.checked && '✔'}</div> 일때 {todo.checked} 부분이 재 렌더링이 되지 않음 
     * 렌더링이 다시 발생되는 경우가 반응형일때만 그런건가? todo는 이미 반응형인데...
     * => solution: 부모 컴포넌트의 상태를 변경하도록 추가함. 
     */
  }
  return (
    <div className="checkbox" onClick={handleCheckedClick}>{todo?.checked && '✔'}</div>
  );
}
function Content({ todo, setTodo }) {
  function handleContentKeydown(e) {
    if (e.key === 'Enter') {
      setTodo({ ...todo, content: e.target.value });
      // customUpdate();
    }
  }
  /**
   * input.value 속성 이용시, onChange() 이벤트핸들러를 추가하거나, input.defaultValue 속성을 이용한다. 
   */
  return (
    <div className="content">
      <input className="todo" defaultValue={todo?.content} onKeyDown={handleContentKeydown} />
    </div>
  );
}
function Delete({ seq, customDelete }) {
  function handleDeleteClick() {
    customDelete(seq);
  }
  return (
    <button className="delBtn" onClick={handleDeleteClick}>x</button>
  );
}



