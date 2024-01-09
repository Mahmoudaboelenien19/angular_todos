export class Todo {
  constructor(
    public content: string,
    public userId: string,
    public isCompleted: boolean,
    public createdAt: Date | string,
    public id?: string
  ) {}
}
