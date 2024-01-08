export class Todo {
  constructor(
    public content: string,
    public userId: number,
    public isCompleted: boolean,
    public createdAt: Date | string,
    public id?: number
  ) {}
}
