import { useState } from 'react';

function Delete({ seq }) {
  return (
    <button className="delBtn">x</button>
  );
}

function Content({ content }) {

  const [updatedContent, setUpdatedContent] = useState(content);
  return (
    <div className="content">
      <input className="todo" value={updatedContent} onChange={e => setUpdatedContent(e.target.value)} />
    </div>
  );
}

function Check({ checked }) {
  return (
    <div className="checkbox">{checked && '✔'}</div>
  );
}

export default function TodoItem({ checked, content, seq }) {
  return (
    <li key={seq} className={checked ? 'todo-item checked' : 'todo-item'} >
      <Check checked={checked} />
      <Content content={content} />
      <Delete seq={seq} />
    </li>
  );
}


