export class Todo {
  constructor({ checked = false, content = null }) {
    this.checked = checked
    this.content = content
    this.seq = this.#getSeq()
  }
  #getSeq() {
    let d = new Date();
    return `${d.getFullYear()}${d.getMonth() + 1
      }${d.getDay()}${d.getHours()}${d.getMinutes()}${d.getSeconds()}${d.getMilliseconds()}`;
  }
}