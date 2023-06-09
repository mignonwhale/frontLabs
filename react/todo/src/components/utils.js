export function getStore() {
  let tasksStr = localStorage.getItem('tasks');
  return JSON.parse(tasksStr);
}

export function setStore(tasks) {
  let tasksStr = JSON.stringify(tasks);
  localStorage.setItem('tasks', tasksStr)
}


export function getSeq() {
  return crypto.randomUUID();
}


/**
 * 테스트 데이터
 * const tasks = [
  { checked: true, content: 'test1', seq: getSeq() },
  { checked: false, content: 'test2', seq: getSeq() },
  { checked: false, content: 'test3', seq: getSeq() }
]
setStore(tasks);
 */