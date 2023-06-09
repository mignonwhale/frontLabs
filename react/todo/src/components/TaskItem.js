export default function TaskItem({ task, onCustomUpdate, onCustomDelete }) {

  // 체크박스
  function handleClick() {
    const newTask = { ...task, checked: !task.checked }
    onCustomUpdate(newTask);
  }

  // 내용
  function handleContentKeyDown(e, task) {
    if (e.key === 'Enter') {
      const newTask = { ...task, content: e.target.value };
      onCustomUpdate(newTask);
    }
  }

  return (
    <li className={task.checked ? 'todo-item checked' : 'todo-item'} key={task.seq} >
      <div className="checkbox" onClick={handleClick}>{task.checked && '✔'}</div>
      <div className="content">
        <input className="todo" defaultValue={task.content} onKeyDown={e => handleContentKeyDown(e, task)} />
      </div>
      <button className="delBtn" onClick={onCustomDelete}>x</button>
    </li>
  )
}