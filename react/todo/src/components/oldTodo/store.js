export function getStore() {
    const todosStr = localStorage.getItem('todos');
    return JSON.parse(todosStr);
}
export function setStore(todos) {
    const todosStr = JSON.stringify(todos)
    localStorage.setItem('todos', todosStr);
}