import { useState } from 'react';
import './Todo.css';
import { getStore, getSeq, setStore } from './utils';
import TaskItem from './TaskItem';



export default function Tasks() {
  /*
  useState는 초기값은 최초 한 번만 사용하고 이후는 무시한다. 그럼에도 getStore()처럼 호출식을 초기값으로 넘기면 렌더링이 될때마다 호출이 된다. 최초를 제외하고 사용하지 않는데도 말이다. 
  getTodoList는 호출이 아닌 함수자체를 인수로 넘기고 있다. 이럴 경우 리액트는 초기화 할때만 해당 함수를 한 번 호출한다. 
  그러므로 아래처럼 변경하는 게 자원이 덜 소모된다. 
  */
  // const [tasks, setTasks] = useState(getStore() || []);
  const [tasks, setTasks] = useState(getTodoList);
  function getTodoList() {
    return getStore() || [];
  }

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

