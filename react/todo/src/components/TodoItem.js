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

  // const [checked, setChecked] = useState(todo.checked)

  function handleCheckedClick() {
    todo.checked = !todo.checked;
    // 부모 컴포넌트에 알리기
    customUpdate();

    // 자식 컴포넌트 변경사항 적용
    // setChecked(todo.checked);

    /**
     *  <div className="checkbox" onClick={handleCheckedClick}>{todo.checked && '✔'}</div> 일때 {todo.checked} 부분이 재 렌더링이 되지 않음 
     * 렌더링이 다시 발생되는 경우가 반응형일때만 그런건가? todo는 이미 반응형인데...
     */

  }
  return (
    <div className="checkbox" onClick={handleCheckedClick}>{todo.checked && '✔'}</div>
  );
}
function Content({ todo, customUpdate }) {
  function handleContentKeydown(e) {
    if (e.key === 'Enter') {
      todo.content = e.target.value;
      customUpdate()
    }
  }
  return (
    <div className="content">
      <input className="todo" defaultValue={todo.content} onKeyDown={handleContentKeydown} />
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



