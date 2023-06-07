import { useState } from 'react';







export default function TodoItem({ todo, customUpdate, customDelete }) {
  return (
    <li className={todo.checked ? 'todo-item checked' : 'todo-item'} >
      <Check todo={todo} customUpdate={customUpdate} />
      <Content todo={todo} customUpdate={customUpdate} />
      <Delete seq={todo.seq} customDelete={customDelete} />
    </li>
  );
}

function Check({ todo, customUpdate }) {

  const [checked, setChecked] = useState(todo.checked)

  function handleCheckedClick() {
    todo.checked = !todo.checked;
    // 부모 컴포넌트에 알리기
    customUpdate();

    // 자식 컴포넌트 변경사항 적용
    setChecked(todo.checked);

  }
  return (
    <div className="checkbox" onClick={handleCheckedClick}>{checked && '✔'}</div>
  );
}
function Content({ todo, customUpdate }) {
  function handleContentChange(e) {
    todo.content = e.target.value;
  }
  function handleContentKeydown(e) {
    if (e.key === 'Enter') {
      customUpdate()
    }
  }
  return (
    <div className="content">
      <input className="todo" value={todo.content} onChange={handleContentChange} onKeyDown={handleContentKeydown} />
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



