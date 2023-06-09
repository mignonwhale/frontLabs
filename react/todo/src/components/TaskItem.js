export default function TaskItem({ checked, content, onCustomUpdate, onCustomDelete }) {

  // 체크박스
  function handleClick(e) {
    const newChecked = e.target.dataset.checked === 'true';
    onCustomUpdate?.({ newChecked: !newChecked });
  }


  // 내용
  function handleContentKeyDown(e) {
    if (e.key === 'Enter') {
      onCustomUpdate?.({ newContent: e.target.value });
    }
  }

  return (
    <li className={checked ? 'todo-item checked' : 'todo-item'} >
      <div className="checkbox" data-checked={checked} onClick={handleClick}>{checked && '✔'}</div>
      <div className="content">
        <input className="todo" defaultValue={content} onKeyDown={e => handleContentKeyDown(e)} />
      </div>
      <button className="delBtn" onClick={e => onCustomDelete?.()}>x</button>
    </li>
  )
}
