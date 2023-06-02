import { useState } from 'react';
import { getStore, setStore } from './store';

export default function NewTodo() {

  const [newContent, setNewContent] = useState('');

  function handleNewTodoKeyDown(event) {
    if (event.key === 'Enter') {
      const newTodo = { checked: false, content: newContent, seq: getSeq() }
      const todos = getStore() || [];
      setStore([...todos, newTodo]);
      setNewContent('');
    }
  }
  function getSeq() {
    return crypto.randomUUID()
  }

  /**
   * input 태그 속성 value에 반응형을 세팅하기 위해서 짝궁으로 onChange가 필요하다. 
   * react-dom.development.js:86 Warning: You provided a `value` prop to a form field without an `onChange` handler. This will render a read-only field. 
   * If the field should be mutable use `defaultValue`. Otherwise, set either `onChange` or `readOnly`.
   */
  return (
    <input type="text" className="todo-input" placeholder="할 일을 입력 후 엔터" value={newContent} onChange={e => setNewContent(e.target.value)} onKeyDown={handleNewTodoKeyDown} />
  );
}


