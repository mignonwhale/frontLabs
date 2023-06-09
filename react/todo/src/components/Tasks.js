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
  function update(seq, { newChecked, newContent }) {
    const newTasks = tasks.map(task =>
      task.seq === seq ? { ...task, checked: newChecked ?? task.checked, content: newContent ?? task.content } : task
    );
    setTasks(newTasks);
    setStore(newTasks);
  }
  // 삭제
  function deleteTask(seq) {
    const newTasks = tasks.filter(t => t.seq !== seq);
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
                onCustomUpdate={update.bind(this, task.seq)}
                onCustomDelete={deleteTask.bind(this, task.seq)}
                key={task.seq} />)
          }
        </ul>
      </div>
    </div >
  );
}

