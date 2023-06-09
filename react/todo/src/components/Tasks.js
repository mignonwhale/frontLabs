import { useState } from 'react';
import './Todo.css';
import { getStore, getSeq, setStore } from './utils';
import TaskItem from './TaskItem';



export default function Tasks() {
  const [tasks, setTasks] = useState(getStore() || []);
  const [newContnet, setNewContnet] = useState('');

  // 새 항목 추가
  function handleKeyDown(e) {
    if (e.key === 'Enter') {
      const newTasks = [...tasks, { checked: false, content: newContnet, seq: getSeq() }];
      setTasks(newTasks);
      setStore(newTasks);
      setNewContnet('');
    }
  }
  // 업데이트
  function update(index, task, { checked, content }) {
    const newChecked = checked ?? task.checked;
    const newContent = content ?? task.content;
    const newTask = { checked: newChecked, content: newContent, seq: task.seq }
    const newTasks = tasks.map((t, i) =>
      i === index ? newTask : t
    );
    setTasks(newTasks);
    setStore(newTasks);
  }
  // 삭제
  function deleteTask(index) {
    const newTasks = tasks.filter((t, i) => i !== index);
    setTasks(newTasks);
    setStore(newTasks);
  }

  return (
    <div className="todo-wrapper">
      <div className="todo-title">tasks</div>
      <div className="todo-box">
        <div className="todo-input-box">
          <input type="text" className="todo-input" placeholder="할 일을 입력 후 엔터" value={newContnet} onChange={e => setNewContnet(e.target.value)} onKeyDown={handleKeyDown} />
        </div>
        <ul className="todo-list">
          {
            tasks.map((task, index) =>
              <TaskItem
                checked={task.checked}
                content={task.content}
                onCustomUpdate={update.bind(this, index, task)}
                onCustomDelete={deleteTask.bind(this, index)}
                key={task.seq} />)
          }
        </ul>
      </div>
    </div >
  );
}

