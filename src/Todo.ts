import { Item } from "./Item";

export class Todo implements Item {
  public seq: string;
  constructor(public checked: boolean, public content: string, seq?: string) {
    if (!seq) {
      this.seq = this.getSeq();
    } else {
      this.seq = seq;
    }
  }
  private getSeq(): string {
    return `${new Date().getFullYear()}${new Date().getMonth()}${new Date().getDate()}${new Date().getHours()}${new Date().getMinutes()}${new Date().getSeconds()}${new Date().getMilliseconds()}`;
  }
}
